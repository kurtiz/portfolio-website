"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {Commands, TerminalLine} from "@/types/terminal.types.ts";


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
            transition={{
                duration: 0.15,
                ease: "easeOut",
            }}
            className="flex items-start gap-2"
        >
            {line.prefix && (
                <span className={`${getPrefixColor()} select-none font-semibold`}>
          {line.prefix}
        </span>
            )}
            <span className={`${getTextColor()} whitespace-pre-wrap break-words`}>{line.text}</span>
        </motion.div>
    );
};

/* -----------------------------
    Blinking Cursor
 ------------------------------ */
const BlinkingCursor = () => (
    <motion.span
        className="inline-block w-2 h-4 bg-accent ml-1"
        animate={{opacity: [1, 1, 0, 0]}}
        transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 0.5, 1],
        }}
    />
);

/* -----------------------------
    Full Terminal Component
 ------------------------------ */
export const FullTerminal = () => {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [currentInput, setCurrentInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Welcome message on mount
    useEffect(() => {
        setHistory([
            {text: "Welcome to my portfolio terminal!", type: "accent", prefix: "→"},
            {text: "Type 'help' to see available commands", type: "output", prefix: " "},
        ]);
        // Auto-focus input
        inputRef.current?.focus();
    }, []);

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add command to history
        const newHistory: TerminalLine[] = [
            ...history,
            {text: cmd, type: "command", prefix: "$"},
        ];

        // Handle special commands
        if (trimmedCmd === "clear") {
            setHistory([]);
            return;
        }

        // Find and execute command
        const response = Commands[trimmedCmd];
        if (response) {
            setHistory([...newHistory, ...response]);
        } else if (trimmedCmd === "") {
            setHistory(newHistory);
        } else {
            setHistory([
                ...newHistory,
                {
                    text: `Command not found: ${cmd}`,
                    type: "error",
                    prefix: "✗",
                },
                {
                    text: "Type 'help' to see available commands",
                    type: "output",
                    prefix: " ",
                },
            ]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentInput.trim()) {
            handleCommand(currentInput);
            setCurrentInput("");
        }
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
            {/* Terminal Window */}
            <div
                className="h-full flex flex-col bg-card/80 dark:bg-card/90 backdrop-blur-xl border-x-0 border-t-0 border-b-0">
                {/* Window Chrome - macOS style */}
                <div
                    className="flex items-center gap-2 px-4 py-3 bg-secondary/50 dark:bg-secondary/30 border-b border-border/50">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => window.close()}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)] hover:brightness-110 transition-all"
                            aria-label="Close"
                        />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]"/>
                        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]"/>
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-center">
                        <span className="text-xs text-muted-foreground font-medium">
                            terminal — zsh
                        </span>
                    </div>

                    {/* Spacer for symmetry */}
                    <div className="w-[52px]"/>
                </div>

                {/* Terminal Content */}
                <div
                    ref={terminalRef}
                    className="flex-1 p-6 font-mono text-sm relative overflow-y-auto overflow-x-hidden"
                    onClick={handleTerminalClick}
                >
                    {/* Scanline overlay - dark mode only */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                        }}
                    />

                    {/* History */}
                    <div className="space-y-2 relative z-10 max-w-4xl mx-auto">
                        {history.map((line, index) => (
                            <AnimatedLine key={index} line={line}/>
                        ))}

                        {/* Input Line */}
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <span className="text-success font-semibold select-none">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-foreground caret-accent"
                                spellCheck={false}
                                autoComplete="off"
                                placeholder="Type 'help' for commands..."
                            />
                            <BlinkingCursor/>
                        </form>
                    </div>
                </div>

                {/* Status Bar */}
                <div
                    className="px-4 py-2 bg-secondary/30 dark:bg-secondary/20 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"/>
                        <span className="text-xs text-muted-foreground">active</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                        ~/portfolio
                    </span>
                </div>
            </div>
        </div>
    );
};
