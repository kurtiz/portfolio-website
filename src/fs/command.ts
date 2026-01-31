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
        {text: "  ls [dir]", type: "output", prefix: " "},
        {text: "  cat <file>", type: "output", prefix: " "},
        {text: "  cd <dir>", type: "output", prefix: " "},
        {text: "  clear", type: "output", prefix: " "},
    ],

    ls: async (args, ctx) => {
        const target = args.length
            ? resolvePath(ctx.cwd, args)
            : ctx.cwd;

        if (!target || target.type !== "folder") {
            return [{text: "Not a directory", type: "error", prefix: "✗"}];
        }

        return [
            {
                text: Object.keys(target.children).join("  "),
                type: "path",
                prefix: " ",
            },
        ];
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
