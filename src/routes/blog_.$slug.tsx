import {createFileRoute, Link, notFound} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {generateMetaTags, generateStructuredData, pageSEO} from '@/lib/seo';
import {estimateReadingTime, renderMarkdown} from '@/lib/markdown';
import {ArrowLeft, Calendar, Clock, Maximize2, Tag} from 'lucide-react';
import {useEffect, useState} from 'react';
import {allPosts} from 'content-collections';
import {Lightbox} from '@/components/projects/lightbox';
import {GiscusComments} from '@/components/giscus-comments';

type Post = typeof allPosts[0];

export const Route = createFileRoute('/blog_/$slug')({
    component: BlogPostPage,
    head: ({loaderData}) => {
        // @ts-ignore
        if (!loaderData?.post) return generateMetaTags(pageSEO.blog);
        // @ts-ignore
        const post = loaderData.post;
        const meta = generateMetaTags({
            title: post.title,
            description: post.excerpt,
            keywords: post.tags,
            url: `/blog/${post._meta.path}`,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
            image: post.coverImage || undefined,
        });
        const structuredData = generateStructuredData('article', {
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            publishedTime: post.date,
            modifiedTime: post.date,
            keywords: post.tags,
            url: `/blog/${post._meta.path}`,
        });
        return {
            ...meta,
            scripts: [
                {
                    type: 'application/ld+json' as const,
                    children: JSON.stringify(structuredData),
                },
            ],
        } as any;
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
    // @ts-ignore
    const post = data.post as Post;
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const readingTime = estimateReadingTime(post.content);

    useEffect(() => {
        setHtmlContent('');
        renderMarkdown(post.content).then(setHtmlContent);
    }, [post.content, post._meta.path]);

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-5xl sm:max-w-3xl md:max-w-5xl mx-auto p-6 sm:p-10"
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
                        <div
                            className="w-full h-56 rounded-xl bg-secondary mb-6 overflow-hidden cursor-pointer group/cover relative"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) parent.style.display = 'none';
                                }}
                            />
                            <div className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-200">
                                <Maximize2 className="w-4 h-4 text-white"/>
                            </div>
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
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                            prose-p:text-muted-foreground prose-p:leading-7 prose-p:mb-4
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                            prose-pre:rounded-xl prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:overflow-hidden
                            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                            prose-li:text-muted-foreground prose-li:my-1
                            prose-img:rounded-xl prose-img:shadow-soft
                            prose-hr:border-border prose-hr:my-8
                            prose-table:text-sm prose-th:bg-secondary prose-th:p-3 prose-td:p-3
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

                {/* Lightbox */}
                {post.coverImage && (
                    <Lightbox
                        src={post.coverImage}
                        alt={post.title}
                        isOpen={lightboxOpen}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}

                {/* Comments */}
                <GiscusComments
                    repo="kurtiz/portfolio-website"
                    repoId="R_kgDOQ00e1A"
                    categoryId="DIC_kwDOQ00e1M4C4-EU"
                    category="Announcements"
                    mapping="pathname"
                    reactionsEnabled
                    emitMetadata={false}
                    inputPosition="bottom"
                    lang="en"
                />

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
