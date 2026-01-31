"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {TerminalLine} from "@/types/terminal.types.ts";
import {FolderNode, fs} from "@/fs/fs";
import {commands} from "@/fs/command.ts";
import {useNavigate} from "@tanstack/react-router";
import {applyAutocomplete, getAutocompleteSuggestions} from "@/fs/fs.utils";


/* -----------------------------
    Animated Line Component
------------------------------ */
const AnimatedLine = ({line}: { line: TerminalLine }) => {
    const colorMap: Record<string, string> = {
        command: "text-foreground",
        output: "text-muted-foreground",
        path: "text-accent",
        success: "text-success",
        accent: "text-accent",
        error: "text-destructive",
        folder: "text-blue-400 dark:text-blue-500 font-semibold",
        file: "text-foreground",
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 2}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.15, ease: "easeOut"}}
            className="flex items-start gap-2"
        >
            {line.prefix && (
                <span className="text-accent font-semibold select-none">
          {line.prefix}
        </span>
            )}
            <span
                className={`${colorMap[line.type]} whitespace-pre-wrap break-words`}
            >
        {line.text}
      </span>
        </motion.div>
    );
};

/* -----------------------------
    Terminal Card
------------------------------ */
export const TerminalCard = () => {
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
    }, []);

    /* Auto-scroll */
    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [history]);

    /* Command runner */
    const runCommand = async (raw: string) => {
        const [cmd, ...args] = raw.trim().toLowerCase().split(" ");

        // echo command
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

    const navigate = useNavigate();

    /* Handle tab autocomplete */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const suggestions = getAutocompleteSuggestions(
                input,
                cwd,
                Object.keys(commands)
            );

            if (suggestions.length === 1) {
                // Single match - autocomplete it
                setInput(applyAutocomplete(input, suggestions[0]));
            } else if (suggestions.length > 1) {
                // Multiple matches - show them
                setHistory((h) => [
                    ...h,
                    {text: input, type: "command", prefix: "$"},
                    {
                        text: suggestions.join("  "),
                        type: "output",
                        prefix: " ",
                    },
                ]);
            }
        }
    };

    return (
        <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden card-neumorphic border border-border font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
            whileHover={{scale: 1.01}}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/40 border-b border-border cursor-default">
                <div className="flex gap-1.5 ">
                    <span className="w-3 h-3 rounded-full bg-red-400 cursor-pointer"/>
                    <span className=" w-3 h-3 rounded-full bg-yellow-400 cursor-pointer"/>
                    <span className="w-3 h-3 rounded-full bg-green-400 cursor-pointer"
                          onClick={() => navigate({to: "/terminal"})}/>
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground">
                    terminal — zsh
                </div>
            </div>

            {/* Terminal body */}
            <div
                ref={terminalRef}
                className="flex-1 h-full p-4 overflow-y-auto overflow-x-hidden"
            >
                <div className="space-y-2">
                    {history.map((line, i) => (
                        <AnimatedLine key={i} line={line}/>
                    ))}

                    {/* Input line */}
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
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none caret-accent"
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>
        </motion.div>
    );
};
