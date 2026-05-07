import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/api/github-stats')({
    server: {
        handlers: ({createHandlers}) =>
            createHandlers({
                GET: {
                    handler: async ({request}) => {
                        const url = new URL(request.url);
                        const username = url.searchParams.get('username')?.trim();

                        if (!username) {
                            return Response.json({error: 'Missing username'}, {status: 400});
                        }

                        if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
                            return Response.json({error: 'Invalid GitHub username'}, {status: 400});
                        }

                        const token = process.env.GITHUB_TOKEN;

                        if (!token) {
                            return Response.json({error: 'GitHub token not configured'}, {status: 500});
                        }

                        try {
                            const headers = {
                                Authorization: `Bearer ${token}`,
                                Accept: 'application/vnd.github.v3+json',
                                'User-Agent': 'PersonalPortfolio/1.0',
                            };

                            const [userRes, reposRes] = await Promise.all([
                                fetch(`https://api.github.com/users/${username}`, {headers}),
                                fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {headers}),
                            ]);

                            if (!userRes.ok) {
                                return Response.json(
                                    {error: `GitHub API error: ${userRes.status}`},
                                    {status: 502}
                                );
                            }

                            const user = await userRes.json();
                            const repos = await reposRes.json();

                            const totalStars = Array.isArray(repos)
                                ? repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)
                                : 0;

                            const currentYear = new Date().getFullYear();
                            const from = `${currentYear}-01-01T00:00:00Z`;
                            const to = `${currentYear}-12-31T23:59:59Z`;

                            const contribQuery = `
                                query($username: String!, $from: DateTime!, $to: DateTime!) {
                                    user(login: $username) {
                                        contributionsCollection(from: $from, to: $to) {
                                            totalCommitContributions
                                            totalPullRequestContributions
                                            totalIssueContributions
                                            totalRepositoryContributions
                                        }
                                    }
                                }
                            `;

                            const contribRes = await fetch('https://api.github.com/graphql', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    'User-Agent': 'PersonalPortfolio/1.0',
                                },
                                body: JSON.stringify({
                                    query: contribQuery,
                                    variables: {username, from, to},
                                }),
                            });

                            let totalContributions = 0;
                            if (contribRes.ok) {
                                const contribData = await contribRes.json();
                                const collection = contribData.data?.user?.contributionsCollection;
                                if (collection) {
                                    totalContributions =
                                        (collection.totalCommitContributions || 0) +
                                        (collection.totalPullRequestContributions || 0) +
                                        (collection.totalIssueContributions || 0) +
                                        (collection.totalRepositoryContributions || 0);
                                }
                            }

                            return Response.json(
                                {
                                    repos: user.public_repos || 0,
                                    stars: totalStars,
                                    followers: user.followers || 0,
                                    contributions: totalContributions,
                                },
                                {
                                    headers: {
                                        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                                    },
                                }
                            );
                        } catch (err) {
                            return Response.json({error: String(err)}, {status: 500});
                        }
                    },
                },
            }),
    },
});