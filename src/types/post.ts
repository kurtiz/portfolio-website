export type Post = {
    post: {
        title: string
        date: string
        excerpt: string
        tags: string[]
        published: boolean
        coverImage?: string | undefined
        content: string
        _meta: {
            filePath: string
            fileName: string
            directory: string
            path: string
            extension: string
        }
    }
}