import {createFileRoute} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {
    ExternalLink,
    GitCommit,
    GitPullRequest,
    GitPullRequestArrow,
    GitPullRequestCreateArrow,
    Loader2
} from 'lucide-react';
import {generateMetaTags, pageSEO} from '@/lib/seo';

export const Route = createFileRoute('/activity')({
    component: ActivityPage,
    head: () => generateMetaTags(pageSEO.activity),
});

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

type FilterType = 'all' | 'commit' | 'pullRequest' | 'external';

const GITHUB_USERNAME = 'kurtiz';

function ActivityPage() {
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>('all');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch(`/api/github-activity?username=${GITHUB_USERNAME}&limit=50`);
                if (!res.ok) {
                    throw new Error('Failed to fetch activity');
                }
                const data = await res.json() as { activity: ActivityItem[] };
                setActivity(data.activity || []);
            } catch (err) {
                setError('Failed to load activity');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchActivity();
    }, []);

    const filteredActivity = activity.filter((item) => {
        if (filter === 'all') return true;
        if (filter === 'commit') return item.type === 'commit';
        if (filter === 'pullRequest') return item.type === 'pullRequest';
        if (filter === 'external') return item.repoOwner !== GITHUB_USERNAME;
        return true;
    });

    const groupByDate = (items: ActivityItem[]) => {
        const groups: Record<string, ActivityItem[]> = {};
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const thisWeekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        items.forEach((item) => {
            const itemDate = new Date(item.date);
            let key: string;

            if (itemDate >= today) {
                key = 'Today';
            } else if (itemDate >= yesterday) {
                key = 'Yesterday';
            } else if (itemDate >= thisWeekStart) {
                key = 'This Week';
            } else {
                key = 'Earlier';
            }

            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
        });

        return groups;
    };

    const groupedActivity = groupByDate(filteredActivity);

    const formatTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'just now';
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const filters: { value: FilterType; label: string; count: number }[] = [
        {value: 'all', label: 'All', count: activity.length},
        {
            value: 'commit',
            label: 'Commits',
            count: activity.filter((a) => a.type === 'commit').length,
        },
        {
            value: 'pullRequest',
            label: 'Pull Requests',
            count: activity.filter((a) => a.type === 'pullRequest').length,
        },
        {
            value: 'external',
            label: 'External',
            count: activity.filter((a) => a.repoOwner !== GITHUB_USERNAME).length,
        },
    ];

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-4xl mx-auto p-6 sm:p-10"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.5}}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">GitHub Activity</h1>
                        <p className="text-muted-foreground mt-2">
                            Recent commits and pull requests across all repositories
                        </p>
                    </div>

                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                                    filter === f.value
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-secondary hover:bg-secondary/80'
                                }`}
                            >
                                {f.label}
                                <span className="ml-2 opacity-60">({f.count})</span>
                            </button>
                        ))}
                    </div>

                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-accent"/>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && filteredActivity.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>No activity found</p>
                        </div>
                    )}

                    {!loading && !error && Object.keys(groupedActivity).map((group) => (
                        <div key={group} className="mb-8">
                            <h2 className="font-semibold text-sm text-muted-foreground mb-4 font-mono">
                                {group}
                            </h2>
                            <div className="space-y-3">
                                {groupedActivity[group].map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block card-inset p-4 hover:bg-secondary/50 transition-colors group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="shrink-0 mt-1">
                                                {item.type === 'commit' && (
                                                    <GitCommit className="w-5 h-5 text-accent"/>
                                                )}
                                                {item.type === 'pullRequest' && (
                                                    item.state === 'MERGED' ? (
                                                        <GitPullRequestArrow className="w-5 h-5 text-purple-500"/>
                                                    ) : item.state === 'OPEN' ? (
                                                        <GitPullRequestCreateArrow className="w-5 h-5 text-green-500"/>
                                                    ) : (
                                                        <GitPullRequest className="w-5 h-5 text-muted-foreground"/>
                                                    )
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span
                                                        className={`text-xs font-mono px-2 py-0.5 rounded ${
                                                            item.type === 'commit'
                                                                ? 'bg-blue-500/20 text-blue-400'
                                                                : 'bg-purple-500/20 text-purple-400'
                                                        }`}
                                                    >
                                                        {item.type === 'commit' ? 'Commit' : 'PR'}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.repo}
                                                    </span>
                                                    {item.repoOwner !== GITHUB_USERNAME && (
                                                        <span
                                                            className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                                                            External
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-1 text-sm truncate group-hover:text-accent transition-colors">
                                                    {item.title}
                                                </p>
                                                <div
                                                    className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
                                                    <span>{formatTimeAgo(item.date)}</span>
                                                    {item.additions !== undefined && (
                                                        <>
                                                            <span className="text-green-400">+{item.additions}</span>
                                                            <span className="text-red-400">-{item.deletions}</span>
                                                        </>
                                                    )}
                                                    {item.state && item.type === 'pullRequest' && (
                                                        <span
                                                            className={`uppercase text-xs ${
                                                                item.state === 'MERGED'
                                                                    ? 'text-purple-400'
                                                                    : item.state === 'OPEN'
                                                                        ? 'text-green-400'
                                                                        : 'text-muted-foreground'
                                                            }`}
                                                        >
                                                            {item.state.toLowerCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ExternalLink
                                                className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}