"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {TerminalLine} from "@/types/terminal.types.ts";
import {FolderNode, fs} from "@/fs/fs.ts";
import {commands} from "@/fs/command.ts";


/* -----------------------------
    Animated Line Component
------------------------------ */
const AnimatedLine = ({line}: { line: TerminalLine }) => {
    const getTextColor = () => {
        switch (line.type) {
            case "command":
                return "text-foreground";
            case "output":
                return "text-muted-foreground";
            case "path":
                return "text-accent";
            case "success":
                return "text-success";
            case "accent":
                return "text-accent";
            case "error":
                return "text-destructive";
            default:
                return "text-foreground";
        }
    };

    const getPrefixColor = () => {
        if (line.type === "command") return "text-success";
        if (line.prefix === "→") return "text-accent";
        return "text-muted-foreground";
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 2}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.15, ease: "easeOut"}}
            className="flex items-start gap-2"
        >
            {line.prefix && (
                <span className={`${getPrefixColor()} select-none font-semibold`}>
          {line.prefix}
        </span>
            )}
            <span className={`${getTextColor()} whitespace-pre-wrap break-words`}>
        {line.text}
      </span>
        </motion.div>
    );
};


/* -----------------------------
    Full Terminal Component
------------------------------ */
export const FullTerminal = () => {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState("");

    // filesystem state
    const [cwd, setCwd] = useState<FolderNode>(fs);
    const [path, setPath] = useState<string[]>(["~"]);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    /* Welcome message */
    useEffect(() => {
        setHistory([
            {text: "Welcome to my portfolio terminal!", type: "accent", prefix: "→"},
            {text: "Type 'help' to see available commands", type: "output", prefix: " "},
        ]);
        inputRef.current?.focus();
    }, []);

    /* Auto-scroll */
    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    /* Run command */
    const runCommand = async (raw: string) => {
        const [cmd, ...args] = raw.trim().toLowerCase().split(" ");

        setHistory((h) => [
            ...h,
            {text: raw, type: "command", prefix: "$"},
        ]);

        if (cmd === "clear") {
            setHistory([]);
            return;
        }

        const handler = commands[cmd];
        if (!handler) {
            setHistory((h) => [
                ...h,
                {text: `Command not found: ${cmd}`, type: "error", prefix: "✗"},
            ]);
            return;
        }

        const output = await handler(args, {
            cwd,
            setCwd,
            path,
            setPath,
        });

        setHistory((h) => [...h, ...output]);
    };

    return (
        <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
            {/* Terminal Window */}
            <div className="h-full flex flex-col bg-card/80 dark:bg-card/90 backdrop-blur-xl">
                {/* Window Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => window.close()}
                            className="w-3 h-3 rounded-full bg-[#ff5f57]"
                        />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]"/>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
                    </div>

                    <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground font-medium">
              terminal — zsh
            </span>
                    </div>

                    <div className="w-[52px]"/>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="flex-1 p-6 font-mono text-sm relative overflow-y-auto"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div
                        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                        }}
                    />

                    <div className="space-y-2 relative z-10 max-w-4xl mx-auto">
                        {history.map((line, i) => (
                            <AnimatedLine key={i} line={line}/>
                        ))}

                        {/* Input */}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (!input.trim()) return;
                                await runCommand(input);
                                setInput("");
                            }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-accent select-none">
                                {path.join("/")}
                            </span>
                            <span className="text-success font-semibold select-none">$</span>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent outline-none caret-accent"
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </form>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-secondary/30 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"/>
                        <span className="text-xs text-muted-foreground">active</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
            {path.join("/")}
          </span>
                </div>
            </div>
        </div>
    );
};
