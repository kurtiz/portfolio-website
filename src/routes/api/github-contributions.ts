import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/api/github-contributions')({
    server: {
        handlers: ({createHandlers}) =>
            createHandlers({
                GET: {
                    handler: async ({request}) => {
                        const url = new URL(request.url);
                        const username = url.searchParams.get('username')?.trim();
                        const year = parseInt(url.searchParams.get('year') || '', 10);

                        console.log("token: ", process.env.GITHUB_TOKEN);

                        if (!username) {
                            return new Response(JSON.stringify({error: 'Missing username'}), {
                                status: 400,
                                headers: {'Content-Type': 'application/json'},
                            });
                        }

                        if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
                            return new Response(JSON.stringify({error: 'Invalid GitHub username'}), {
                                status: 400,
                                headers: {'Content-Type': 'application/json'},
                            });
                        }

                        const now = new Date();
                        const targetYear = year || now.getFullYear();
                        const from = new Date(`${targetYear}-01-01T00:00:00Z`).toISOString();
                        const to = new Date(`${targetYear}-12-31T23:59:59Z`).toISOString();

                        const query = `
              query($username: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $username) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `;

                        try {
                            const token = process.env.GITHUB_TOKEN;
                            console.log('[DEBUG] Token present:', !!token);

                            const ghRes = await fetch('https://api.github.com/graphql', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                    'User-Agent': 'PersonalPortfolio/1.0',
                                },
                                body: JSON.stringify({query, variables: {username, from, to}}),
                            });

                            const status = ghRes.status;
                            console.log('[DEBUG] GitHub response status:', status);
                            const rawText = await ghRes.text();
                            console.log('[DEBUG] GitHub raw response:', rawText.substring(0, 800));

                            // Try to parse as JSON - if it fails, we know it's HTML error
                            let json;
                            try {
                                json = JSON.parse(rawText);
                            } catch (parseErr) {
                                console.log('[DEBUG] JSON parse failed - response is HTML');
                                return new Response(JSON.stringify({
                                    error: 'GitHub API returned non-JSON response',
                                    status: status,
                                    rawResponse: rawText.substring(0, 500)
                                }), {status: 502, headers: {'Content-Type': 'application/json'}});
                            }

                            console.log('[DEBUG] Parsed JSON:', JSON.stringify(json).substring(0, 200));

                            if (!status || status >= 400 || json.errors) {
                                return new Response(
                                    JSON.stringify({error: json.errors?.[0]?.message ?? 'GitHub API error', status}),
                                    {status: 500, headers: {'Content-Type': 'application/json'}}
                                );
                            }

                            if (!json.data?.user) {
                                return new Response(
                                    JSON.stringify({error: `User "${username}" not found or contributions are private.`}),
                                    {status: 404, headers: {'Content-Type': 'application/json'}}
                                );
                            }

                            const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;

                            const allDays = weeks.flatMap((w: any) => w.contributionDays);
                            const max = Math.max(...allDays.map((d: any) => d.contributionCount), 0);

                            const mappedWeeks = weeks.map((w: any) => ({
                                days: w.contributionDays.map((d: any) => {
                                    const count = d.contributionCount;
                                    let level: 0 | 1 | 2 | 3 | 4 = 0;
                                    if (count > 0) {
                                        const ratio = count / (max || 1);
                                        if (ratio > 0.75) level = 4;
                                        else if (ratio > 0.5) level = 3;
                                        else if (ratio > 0.25) level = 2;
                                        else level = 1;
                                    }
                                    return {date: d.date, count, level};
                                }),
                            }));

                            const totalContributions = allDays.reduce(
                                (sum: number, d: any) => sum + d.contributionCount,
                                0
                            );

                            return new Response(
                                JSON.stringify({weeks: mappedWeeks, totalContributions}),
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                                    },
                                }
                            );
                        } catch (err) {
                            console.log({err})
                            return new Response(JSON.stringify({error: String(err)}), {
                                status: 500,
                                headers: {'Content-Type': 'application/json'},
                            });
                        }
                    },
                },
            }),
    },
});