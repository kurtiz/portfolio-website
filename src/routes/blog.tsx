import {createFileRoute, Link} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {generateMetaTags, pageSEO} from '@/lib/seo';
import PenIcon from '@/components/ui/pen-icon.tsx';
import {useRef} from 'react';
import {AnimatedIconHandle} from '@/components/ui/types';
import {Calendar, ArrowRight} from 'lucide-react';

export const Route = createFileRoute('/blog')({
    component: BlogPage,
    head: () => generateMetaTags(pageSEO.blog),
});

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

function BlogPage() {
    const penIconRef = useRef<AnimatedIconHandle>(null);

    let posts: Array<{
        title: string;
        date: string;
        excerpt: string;
        tags: string[];
        coverImage?: string;
        published: boolean;
        _meta: {path: string};
    }> = [];

    try {
        const {allPosts} = require('content-collections');
        posts = allPosts.filter((p: any) => p.published);
    } catch {
        // content-collections not yet generated
    }

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-5xl mx-auto p-6 sm:p-10"
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
                        <h1 className="text-2xl font-bold">Blog</h1>
                        <p className="font-mono text-sm text-muted-foreground mt-1">
                            thoughts, tutorials, and things I've learned
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <PenIcon ref={penIconRef} className="w-7 h-7 text-foreground"/>
                            </div>
                            <p className="text-muted-foreground font-mono text-sm">
                                Posts coming soon...
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {posts.map((post) => (
                                <motion.div key={post._meta.path} variants={itemVariants}>
                                    <Link
                                        to="/blog/$slug"
                                        params={{slug: post._meta.path}}
                                        className="block"
                                    >
                                        <div
                                            className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer group"
                                            onMouseEnter={() => penIconRef?.current?.startAnimation()}
                                            onMouseLeave={() => penIconRef?.current?.stopAnimation()}
                                        >
                                            {/* Cover or Icon */}
                                            {post.coverImage ? (
                                                <div className="w-full h-40 rounded-xl bg-secondary mb-4 overflow-hidden">
                                                    <img
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            const parent = e.currentTarget.parentElement;
                                                            if (parent) {
                                                                parent.style.display = 'none';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mb-4">
                                                    <div
                                                        className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow">
                                                        <PenIcon
                                                            ref={penIconRef}
                                                            className="w-6 h-6 text-foreground"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tags */}
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded-md"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Title */}
                                            <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="font-mono text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div
                                                className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                                                        <Calendar className="w-3 h-3"/>
                                                        {post.date}
                                                    </span>
                                                </div>
                                                <span className="text-accent group-hover:translate-x-1 transition-transform">
                                                    <ArrowRight className="w-4 h-4"/>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                <motion.footer
                    className="mt-10 pt-6 border-t border-border text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5}}
                >
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Aaron Will Djaba — built with care
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    );
}
