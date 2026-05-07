import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {GitCommit} from 'lucide-react';
import {Link} from '@tanstack/react-router';

interface ActivityStats {
    commits: number;
    prs: number;
    external: number;
}

export const ActivityCard = () => {
    const [stats, setStats] = useState<ActivityStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/github-activity?username=kurtiz&limit=50');
                if (res.ok) {
                    const data = await res.json();
                    const activity = data.activity || [];
                    const now = new Date();
                    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

                    const recentActivity = activity.filter((a: any) => new Date(a.date) > thirtyDaysAgo);

                    setStats({
                        commits: recentActivity.filter((a: any) => a.type === 'commit').length,
                        prs: recentActivity.filter((a: any) => a.type === 'pullRequest').length,
                        external: recentActivity.filter((a: any) => a.repoOwner !== 'kurtiz').length,
                    });
                }
            } catch (err) {
                console.error('Failed to fetch activity stats:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <Link to="/activity">
            <motion.div
                className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer group"
                whileHover={{scale: 1.02}}
                transition={{duration: 0.2}}
            >
                <div className="flex-1 flex items-center justify-center">
                    <motion.div
                        className="relative"
                        whileHover={{y: -8}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                    >
                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow">
                            <GitCommit className="w-7 h-7 text-foreground" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-muted/50 rounded-full blur-sm" />
                    </motion.div>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                        Activity
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                        {loading ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : stats ? (
                            <>
                                {stats.commits} commits · {stats.prs} PRs
                                {stats.external > 0 && ` · ${stats.external} external`}
                            </>
                        ) : (
                            'Recent activity'
                        )}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};