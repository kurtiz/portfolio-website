import {createFileRoute} from '@tanstack/react-router';

interface ActivityItem {
    id: string;
    type: 'commit' | 'pullRequest';
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
                                Accept: 'application/vnd.github.v3+json',
                                'User-Agent': 'PersonalPortfolio/1.0',
                            };

                            const now = new Date();
                            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            const since = thirtyDaysAgo.toISOString().split('T')[0];

                            const activity: ActivityItem[] = [];

                            const userRes = await fetch(`https://api.github.com/users/${username}`, {headers});
                            if (!userRes.ok) {
                                return Response.json({error: 'User not found'}, {status: 404});
                            }

                            const reposRes = await fetch(
                                `https://api.github.com/users/${username}/repos?per_page=50&sort=updated`,
                                {headers}
                            );
                            const repos = await reposRes.json();

                            if (!Array.isArray(repos)) {
                                return Response.json({error: 'Failed to fetch repositories'}, {status: 500});
                            }

                            for (const repo of repos.slice(0, 20)) {
                                try {
                                    const commitsRes = await fetch(
                                        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?since=${since}&per_page=10`,
                                        {headers}
                                    );
                                    if (commitsRes.ok) {
                                        const commits = await commitsRes.json();
                                        if (Array.isArray(commits)) {
                                            commits.forEach((commit: any) => {
                                                activity.push({
                                                    id: commit.sha,
                                                    type: 'commit',
                                                    title: commit.commit.message.split('\n')[0],
                                                    repo: `${repo.owner.login}/${repo.name}`,
                                                    repoOwner: repo.owner.login,
                                                    url: commit.html_url,
                                                    date: commit.commit.author.date,
                                                });
                                            });
                                        }
                                    }
                                } catch {

                                }
                            }

                            const eventsRes = await fetch(
                                `https://api.github.com/users/${username}/events?per_page=50`,
                                {headers}
                            );
                            if (eventsRes.ok) {
                                const events = await eventsRes.json();
                                if (Array.isArray(events)) {
                                    events.forEach((event: any) => {
                                        if (event.type === 'PullRequestEvent') {
                                            activity.push({
                                                id: String(event.payload.pull_request.id),
                                                type: 'pullRequest',
                                                title: event.payload.pull_request.title,
                                                repo: event.repo.name,
                                                repoOwner: event.repo.name.split('/')[0],
                                                url: event.payload.pull_request.html_url,
                                                date: event.created_at,
                                                state: event.payload.pull_request.merged_at ? 'MERGED' : 
                                                       event.payload.pull_request.state === 'open' ? 'OPEN' : 'CLOSED',
                                            });
                                        }
                                    });
                                }
                            }

                            activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                            return Response.json(
                                {activity: activity.slice(0, 50)},
                                {
                                    headers: {
                                        'Cache-Control': 'public, s-maxage=1600, stale-while-revalidate=3600',
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