import {TerminalLine} from "@/types/terminal.types.ts";

export type NodeType = "folder" | "file";

interface BaseNode {
    name: string;
    type: NodeType;
}

export interface FileNode extends BaseNode {
    type: "file";
    content: TerminalLine[] | (() => Promise<TerminalLine[]>);
}

export interface FolderNode extends BaseNode {
    type: "folder";
    children: Record<string, FSNode>;
}

export type FSNode = FileNode | FolderNode;

export const fs: FolderNode = {
    name: "~",
    type: "folder",
    children: {
        skills: {
            name: "skills",
            type: "folder",
            children: {
                frontend: {
                    name: "frontend.txt",
                    type: "file",
                    content: [
                        {text: "React, Next.js, TypeScript", type: "output", prefix: " "}
                    ],
                },
                backend: {
                    name: "backend.txt",
                    type: "file",
                    content: [
                        {text: "Node.js, Hono, PostgreSQL", type: "output", prefix: " "}
                    ],
                },
                devops: {
                    name: "devops.txt",
                    type: "file",
                    content: [
                        {text: "Docker, Cloudflare, CI/CD", type: "output", prefix: " "}
                    ],
                },
            },
        },

        projects: {
            name: "projects",
            type: "folder",
            children: {
                portfolio: {
                    name: "portfolio.txt",
                    type: "file",
                    content: [
                        {text: "Personal portfolio terminal UI", type: "output", prefix: " "}
                    ],
                },
                ecommerce: {
                    name: "ecommerce.txt",
                    type: "file",
                    content: [
                        {text: "E-commerce platform (Next.js + Stripe)", type: "output", prefix: " "}
                    ],
                },
            },
        },

        "status.txt": {
            name: "status.txt",
            type: "file",
            content: [
                {text: "☕ Fueled by coffee, shipping code", type: "output", prefix: " "},
                {text: "Status: Available for opportunities", type: "success", prefix: "→"},
            ],
        },
    },
};
