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
        {text: "  ls [dir]       - List files and folders", type: "output", prefix: " "},
        {text: "  cat <file>     - Read file contents", type: "output", prefix: " "},
        {text: "  cd <dir>       - Change directory", type: "output", prefix: " "},
        {text: "  cd ..          - Go to parent directory", type: "output", prefix: " "},
        {text: "  whoami         - About me", type: "output", prefix: " "},
        {text: "  clear          - Clear terminal", type: "output", prefix: " "},
        {text: "", type: "output", prefix: " "},
        {text: "Color coding:", type: "accent", prefix: "→"},
        {text: "  📁 folder/     - Folders (blue)", type: "folder", prefix: " "},
        {text: "  📄 file.txt    - Files (green)", type: "file", prefix: " "},
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
};
