import {FolderNode, fs} from "./fs";
import {resolvePath} from "./fs.utils";
import {TerminalLine} from "@/types/terminal.types.ts";
import React from "react";

export interface TerminalContext {
    cwd: FolderNode;
    setCwd: (cwd: FolderNode) => void;
    path: string[];
    setPath: React.Dispatch<React.SetStateAction<string[]>>;
}

type CommandHandler = (
    args: string[],
    ctx: TerminalContext
) => Promise<TerminalLine[]>;

export const commands: Record<string, CommandHandler> = {
    help: async () => [
        {text: "Available commands:", type: "accent", prefix: "→"},
        {text: "", type: "output", prefix: " "},
        {text: "Navigation:", type: "accent", prefix: "→"},
        {text: "  ls [dir]       - List files and folders", type: "output", prefix: " "},
        {text: "  cd <dir>       - Change directory", type: "output", prefix: " "},
        {text: "  cd ..          - Go to parent directory", type: "output", prefix: " "},
        {text: "  pwd            - Print working directory", type: "output", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "File Operations:", type: "accent", prefix: "→"},
        {text: "  cat <file>     - Read file contents", type: "output", prefix: " "},
        {text: "  tree           - Show directory tree", type: "output", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "Information:", type: "accent", prefix: "→"},
        {text: "  whoami         - About me", type: "output", prefix: " "},
        {text: "  echo <text>    - Print text to terminal", type: "output", prefix: " "},
        {text: "  date           - Show current date/time", type: "output", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "Utility:", type: "accent", prefix: "→"},
        {text: "  clear          - Clear terminal", type: "output", prefix: " "},
        {text: "  history        - Show command history", type: "output", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "Tips:", type: "accent", prefix: "→"},
        {text: "  Press TAB      - Autocomplete commands and paths", type: "success", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "Color coding:", type: "accent", prefix: "→"},
        {text: "  📁 folder/     - Folders (blue)", type: "folder", prefix: " "},
        {text: "  📄 file.txt    - Files (black/white)", type: "file", prefix: " "},
    ],

    ls: async (args, ctx) => {
        const target = args.length
            ? resolvePath(ctx.cwd, args)
            : ctx.cwd;

        if (!target || target.type !== "folder") {
            return [{text: "Not a directory", type: "error", prefix: "✗"}];
        }

        const entries = Object.entries(target.children).map(([name, node]) => {
            if (node.type === "folder") {
                return `📁 ${name}/`;
            } else {
                return `📄 ${name}`;
            }
        });

        return entries.length > 0
            ? entries.map(entry => ({
                text: entry,
                type: entry.startsWith("📁") ? "folder" : "file",
                prefix: " ",
            }))
            : [{text: "Empty directory", type: "output", prefix: " "}];
    },

    cat: async (args, ctx) => {
        const target = resolvePath(ctx.cwd, args);

        if (!target) {
            return [{text: "File not found", type: "error", prefix: "✗"}];
        }

        if (target.type !== "file") {
            return [{text: "Is a directory", type: "error", prefix: "✗"}];
        }

        return typeof target.content === "function"
            ? await target.content()
            : target.content;
    },

    cd: async (args, ctx) => {
        if (!args.length) return [];

        if (args[0] === "..") {
            if (ctx.path.length > 1) {
                ctx.setPath(p => p.slice(0, -1));
                ctx.setCwd(resolvePath(fs, ctx.path.slice(1, -1)) as FolderNode);
            }
            return [];
        }

        const target = resolvePath(ctx.cwd, args);
        if (!target || target.type !== "folder") {
            return [{text: "No such directory", type: "error", prefix: "✗"}];
        }

        ctx.setCwd(target);
        ctx.setPath(p => [...p, args[0]]);
        return [];
    },

    whoami: async () => [
        {text: "Full-Stack Developer", type: "accent", prefix: "→"},
        {text: "Building digital experiences with code", type: "output", prefix: " "},
    ],

    pwd: async (_args, ctx) => [
        {text: ctx.path.join("/"), type: "path", prefix: " "},
    ],

    echo: async (args) => {
        if (args.length === 0) {
            return [{text: "", type: "output", prefix: " "}];
        }
        return [{text: args.join(" "), type: "output", prefix: " "}];
    },

    date: async () => {
        const now = new Date();
        const formatted = now.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });
        return [{text: formatted, type: "output", prefix: " "}];
    },

    tree: async (args, ctx) => {
        const target = args.length
            ? resolvePath(ctx.cwd, args)
            : ctx.cwd;

        if (!target || target.type !== "folder") {
            return [{text: "Not a directory", type: "error", prefix: "✗"}];
        }

        const lines: TerminalLine[] = [];

        const buildTree = (node: FolderNode, prefix: string = "", _isLast: boolean = true) => {
            const entries = Object.entries(node.children);

            entries.forEach(([name, child], index) => {
                const isLastEntry = index === entries.length - 1;
                const connector = isLastEntry ? "└── " : "├── ";
                const icon = child.type === "folder" ? "📁 " : "📄 ";
                const displayName = child.type === "folder" ? `${name}/` : name;

                lines.push({
                    text: `${prefix}${connector}${icon}${displayName}`,
                    type: child.type,
                    prefix: " ",
                });

                if (child.type === "folder") {
                    const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
                    buildTree(child, newPrefix, isLastEntry);
                }
            });
        };

        lines.push({
            text: `📁 ${target.name}/`,
            type: "folder",
            prefix: " ",
        });

        buildTree(target);

        return lines;
    },

    history: async (_args, _ctx) => {
        // This will be populated by the terminal component
        return [
            {text: "Command history is shown above", type: "output", prefix: " "},
            {text: "Tip: Use ↑/↓ arrow keys to navigate history", type: "output", prefix: " "},
        ];
    },
};
