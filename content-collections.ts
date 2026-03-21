import {defineCollection, defineConfig} from "@content-collections/core";
import {z} from "zod";

const posts = defineCollection({
    name: "posts",
    directory: "content/blog",
    include: "**/*.md",
    schema: z.object({
        title: z.string(),
        date: z.string(),
        excerpt: z.string(),
        tags: z.array(z.string()).optional().default([]),
        coverImage: z.string().optional(),
        published: z.boolean().optional().default(false),
    }),
});

export default defineConfig({
    content: [posts],
});
