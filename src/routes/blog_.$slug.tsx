import {createFileRoute, Link, notFound} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {generateMetaTags, pageSEO} from '@/lib/seo';
import {estimateReadingTime, renderMarkdown} from '@/lib/markdown';
import {ArrowLeft, Calendar, Clock, Tag} from 'lucide-react';
import {useEffect, useState} from 'react';
import {allPosts} from 'content-collections';

type Post = typeof allPosts[0];

export const Route = createFileRoute('/blog_/$slug')({
    component: BlogPostPage,
    head: ({loaderData}) => {
        if (!loaderData?.post) return generateMetaTags(pageSEO.blog);
        const post = loaderData.post;
        return generateMetaTags({
            title: post.title,
            description: post.excerpt,
            keywords: post.tags,
            url: `/blog/${post._meta.path}`,
            type: 'article',
        });
    },
    loader: ({params}) => {
        const post = allPosts.find(
            (p) => p._meta.path === params.slug && p.published
        );
        if (!post) throw notFound();
        return {post};
    },
});

function BlogPostPage() {
    const data = Route.useLoaderData();
    const post = data.post as Post;
    const [htmlContent, setHtmlContent] = useState<string>('');
    const readingTime = estimateReadingTime(post.content);

    useEffect(() => {
        setHtmlContent('');
        renderMarkdown(post.content).then(setHtmlContent);
    }, [post.content, post._meta.path]);

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-3xl mx-auto p-6 sm:p-10"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                {/* Back Link */}
                <motion.div
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.2, duration: 0.4}}
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        Back to Blog
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.article
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3, duration: 0.5}}
                >
                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="w-full h-56 rounded-xl bg-secondary mb-6 overflow-hidden">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) parent.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3"/>
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3"/>
                            {readingTime} min read
                        </span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 font-mono text-xs text-accent bg-accent/10 px-2.5 py-1 rounded-md"
                                >
                                    <Tag className="w-3 h-3"/>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-border my-8"/>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">
                        {post.excerpt}
                    </p>

                    {/* Content */}
                    <div
                        className="prose prose-neutral dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                            prose-p:text-muted-foreground prose-p:leading-relaxed
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground
                            prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                            prose-blockquote:border-accent prose-blockquote:text-muted-foreground prose-blockquote:italic
                            prose-li:text-muted-foreground
                            prose-img:rounded-xl prose-img:shadow-soft
                            prose-hr:border-border
                            "
                        dangerouslySetInnerHTML={{__html: htmlContent}}
                    />

                    {/* Back Link (bottom) */}
                    <div className="border-t border-border mt-10 pt-6">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4"/>
                            Back to all posts
                        </Link>
                    </div>
                </motion.article>

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
