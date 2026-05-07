import {createFileRoute} from '@tanstack/react-router';

interface ActivityItem {
    id: string;
    type: 'commit' | 'pullRequest' | 'issue';
    title: string;
    repo: string;
    repoOwner: string;
    url: string;
    date: string;
    state?: 'OPEN' | 'MERGED' | 'CLOSED';
    additions?: number;
    deletions?: number;
}

export const Route = createFileRoute('/api/github-activity')({
    server: {
        handlers: ({createHandlers}) =>
            createHandlers({
                GET: {
                    handler: async ({request}) => {
                        const url = new URL(request.url);
                        const username = url.searchParams.get('username')?.trim();
                        const limit = parseInt(url.searchParams.get('limit') || '30', 10);

                        if (!username) {
                            return Response.json({error: 'Missing username'}, {status: 400});
                        }

                        const token = process.env.GITHUB_TOKEN;
                        if (!token) {
                            return Response.json({error: 'GitHub token not configured'}, {status: 500});
                        }

                        try {
                            const headers = {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                                'User-Agent': 'PersonalPortfolio/1.0',
                            };

                            const query = `
                                query($username: String!) {
                                    user(login: $username) {
                                        repositories(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: OWNER) {
                                            nodes {
                                                name
                                                owner.login
                                                defaultBranchRef {
                                                    target {
                                                        ... on Commit {
                                                            history(first: 20) {
                                                                nodes {
                                                                    oid
                                                                    message
                                                                    committedDate
                                                                    additions
                                                                    deletions
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        contributedRepositories(first: 30, orderBy: {field: UPDATED_AT, direction: DESC}) {
                                            nodes {
                                                name
                                                owner.login
                                                defaultBranchRef {
                                                    target {
                                                        ... on Commit {
                                                            history(first: 10) {
                                                                nodes {
                                                                    oid
                                                                    message
                                                                    committedDate
                                                                    additions
                                                                    deletions
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        pullRequests(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                                            nodes {
                                                id
                                                title
                                                url
                                                state
                                                createdAt
                                                repository {
                                                    name
                                                    owner.login
                                                }
                                            }
                                        }
                                    }
                                }
                            `;

                            const response = await fetch('https://api.github.com/graphql', {
                                method: 'POST',
                                headers,
                                body: JSON.stringify({query, variables: {username}}),
                            });

                            if (!response.ok) {
                                return Response.json(
                                    {error: `GitHub API error: ${response.status}`},
                                    {status: 502}
                                );
                            }

                            const data = await response.json();

                            if (data.errors) {
                                return Response.json(
                                    {error: data.errors[0]?.message || 'GraphQL error'},
                                    {status: 500}
                                );
                            }

                            const user = data.data?.user;
                            if (!user) {
                                return Response.json({error: 'User not found'}, {status: 404});
                            }

                            const activity: ActivityItem[] = [];

                            const now = new Date();
                            const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

                            user.repositories.nodes.forEach((repo: any) => {
                                const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
                                commits.forEach((commit: any) => {
                                    const commitDate = new Date(commit.committedDate);
                                    if (commitDate > sixtyDaysAgo) {
                                        activity.push({
                                            id: commit.oid,
                                            type: 'commit',
                                            title: commit.message.split('\n')[0],
                                            repo: `${repo.owner.login}/${repo.name}`,
                                            repoOwner: repo.owner.login,
                                            url: `https://github.com/${repo.owner.login}/${repo.name}/commit/${commit.oid}`,
                                            date: commit.committedDate,
                                            additions: commit.additions,
                                            deletions: commit.deletions,
                                        });
                                    }
                                });
                            });

                            user.contributedRepositories.nodes.forEach((repo: any) => {
                                const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
                                commits.forEach((commit: any) => {
                                    const commitDate = new Date(commit.committedDate);
                                    if (commitDate > sixtyDaysAgo) {
                                        activity.push({
                                            id: commit.oid,
                                            type: 'commit',
                                            title: commit.message.split('\n')[0],
                                            repo: `${repo.owner.login}/${repo.name}`,
                                            repoOwner: repo.owner.login,
                                            url: `https://github.com/${repo.owner.login}/${repo.name}/commit/${commit.oid}`,
                                            date: commit.committedDate,
                                            additions: commit.additions,
                                            deletions: commit.deletions,
                                        });
                                    }
                                });
                            });

                            user.pullRequests.nodes.forEach((pr: any) => {
                                activity.push({
                                    id: pr.id,
                                    type: 'pullRequest',
                                    title: pr.title,
                                    repo: `${pr.repository.owner.login}/${pr.repository.name}`,
                                    repoOwner: pr.repository.owner.login,
                                    url: pr.url,
                                    date: pr.createdAt,
                                    state: pr.state,
                                });
                            });

                            activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                            const limitedActivity = activity.slice(0, limit);

                            return Response.json(
                                {activity: limitedActivity},
                                {
                                    headers: {
                                        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
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