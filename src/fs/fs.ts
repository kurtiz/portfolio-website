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
                security: {
                    name: "security.txt",
                    type: "file",
                    content: [
                        {
                            text: "Security Operations: incident response, monitoring, and threat analysis in enterprise environments.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Application & Open Source Security: secure SDLC, dependency risk, and governance practices.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Hands-on experience with SIEM tooling, vulnerability assessments, and penetration testing support.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                backend: {
                    name: "backend.txt",
                    type: "file",
                    content: [
                        {
                            text: "Design and development of scalable backend services using Node.js, TypeScript, and modern frameworks.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "API design, data modeling, and secure integration with relational databases (PostgreSQL).",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Experience building security-conscious systems with authentication, authorization, and auditing.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                frontend: {
                    name: "frontend.txt",
                    type: "file",
                    content: [
                        {
                            text: "Modern frontend development with React, Next.js, and TypeScript.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Focus on accessibility, performance, and clean UI architecture.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Strong collaboration with designers to translate ideas into usable interfaces.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                devops: {
                    name: "devops.txt",
                    type: "file",
                    content: [
                        {
                            text: "Containerization and deployment using Docker and CI/CD pipelines.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Cloud-native development using Cloudflare Workers, edge storage, and serverless patterns.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Operational awareness around monitoring, reliability, and secure deployments.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                leadership: {
                    name: "leadership.txt",
                    type: "file",
                    content: [
                        {
                            text: "Technical leadership across engineering and security teams.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Community building and governance within open-source and security-focused organizations.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Experience coordinating contributors, defining strategy, and driving measurable impact.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
            },
        },

        projects: {
            name: "projects",
            type: "folder",
            children: {
                ossafrica: {
                    name: "ossafrica.txt",
                    type: "file",
                    content: [
                        {
                            text: "Co-founded Open Source & Security Africa (OSSAfrica).",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Built governance structures, contributor onboarding workflows, and security-focused initiatives.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Driving awareness and capacity building across Africa and EMEA.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                "security-operations": {
                    name: "security-operations.txt",
                    type: "file",
                    content: [
                        {
                            text: "Enterprise security monitoring and incident response workflows.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Log analysis, alert triage, and threat investigation using SIEM platforms.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Collaboration with engineering teams to remediate security findings.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                "platform-engineering": {
                    name: "platform-engineering.txt",
                    type: "file",
                    content: [
                        {
                            text: "Designed and implemented backend services with a focus on scalability and security.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Applied clean architecture and system design principles in production systems.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Balanced performance, maintainability, and security requirements.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
                portfolio: {
                    name: "portfolio-terminal.txt",
                    type: "file",
                    content: [
                        {
                            text: "Interactive terminal-style portfolio showcasing skills, experience, and projects.",
                            type: "output",
                            prefix: " ",
                        },
                        {
                            text: "Built with modern frontend tooling and a filesystem-inspired UI.",
                            type: "output",
                            prefix: " ",
                        },
                    ],
                },
            },
        },

        "status.txt": {
            name: "status.txt",
            type: "file",
            content: [
                {text: "☕ Fuelled by curiosity, coffee, and community.", type: "output", prefix: " "},
                {text: "Status: Building secure systems & open communities.", type: "success", prefix: "→"},
            ],
        },
    },
};
