import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdown(content: string): Promise<string> {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypeRaw)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            behavior: "append",
            properties: {
                className: ["heading-anchor"],
                ariaLabel: "Link to this section",
                style: "color: var(--accent); text-decoration: none; margin-left: 0.4em; font-weight: normal; opacity: 0; transition: opacity 0.2s;",
            },
            content: {
                type: "element",
                tagName: "span",
                properties: {ariaHidden: "true"},
                children: [{type: "text", value: " #"}],
            },
        })
        .use(rehypePrettyCode, {
            theme: "github-dark-dimmed",
            keepBackground: false,
            defaultLang: "plaintext",
        })
        .use(rehypeStringify)
        .process(content);

    return String(result);
}

export function estimateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
