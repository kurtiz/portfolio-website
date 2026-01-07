"use client";

import {motion} from "framer-motion";
import {Terminal} from "lucide-react";

/* -----------------------------
   Types
------------------------------ */
type LogLine = {
    text: string;
    type: "command" | "success" | "info" | "error";
};

/* -----------------------------
   Terminal session data
------------------------------ */
const logLines: LogLine[] = [
    {text: "$ git status", type: "command"},
    {text: "On branch main ✔ working tree clean", type: "success"},

    {text: "$ npm run build", type: "command"},
    {text: "✔ build completed in 3.2s", type: "success"},

    {text: "$ sudo make me a sandwich", type: "command"},
    {text: "sudo: Really 😏 ? Try something else.", type: "info"},

    {text: "$ npm test", type: "command"},
    {text: "✓ 42 tests passed (0 skipped)", type: "success"},

    {text: "$ deploy --prod", type: "command"},
    {text: "🚀 deployed to production", type: "success"},
];

/* -----------------------------
   Typewriter line component
------------------------------ */
const TypingLine = ({
                        text,
                        delay = 0,
                        speed = 0.035,
                    }: {
    text: string;
    delay?: number;
    speed?: number;
}) => {
    const chars = text.split("");
    const typingDuration = chars.length * speed;

    return (
        <motion.span
            className="inline-flex whitespace-pre"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        delay,
                        staggerChildren: speed,
                    },
                },
            }}
        >
            {/* Typed characters */}
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1},
                    }}
                >
                    {char}
                </motion.span>
            ))}

            {/* Cursor — only during typing */}
            <motion.span
                className="ml-0.5"
                initial={{opacity: 0}}
                animate={{opacity: [0, 1, 0]}}
                transition={{
                    delay,
                    duration: 0.8,
                    repeat: Math.ceil(typingDuration / 0.8),
                    ease: "easeInOut",
                }}
            >
                ▍
            </motion.span>
        </motion.span>
    );
};

/* -----------------------------
   Terminal Card
------------------------------ */
export const TerminalCard = () => {
    let cumulativeDelay = 0;

    const COMMAND_SPEED = 0.035;
    const COMMAND_PAUSE = 0.4;
    const RESPONSE_DELAY = 0.25;

    return (
        <motion.div
            className="card-neumorphic p-6 h-full flex flex-col cursor-pointer font-mono"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2}}
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <Terminal className="w-4 h-4"/>
                <span className="text-xs font-semibold uppercase tracking-wider">
          System Log
        </span>
                <span className="ml-auto text-xs text-success flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"/>
          online
        </span>
            </div>

            {/* Logs */}
            <div className="flex-1 space-y-2 text-xs">
                {logLines.map((log, index) => {
                    const isCommand = log.type === "command";
                    const lineDelay = cumulativeDelay;

                    if (isCommand) {
                        cumulativeDelay += log.text.length * COMMAND_SPEED + COMMAND_PAUSE;
                    } else {
                        cumulativeDelay += RESPONSE_DELAY;
                    }

                    return (
                        <div
                            key={index}
                            className={
                                log.type === "success"
                                    ? "text-success"
                                    : log.type === "info"
                                        ? "text-muted-foreground"
                                        : "text-foreground"
                            }
                        >
                            {isCommand ? (
                                <TypingLine
                                    text={log.text}
                                    delay={lineDelay}
                                    speed={COMMAND_SPEED}
                                />
                            ) : (
                                <motion.span
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: lineDelay}}
                                >
                                    {log.text}
                                </motion.span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-dashed border-border text-center">
        <span className="text-xs text-muted-foreground">
          ─── all systems operational ───
        </span>
            </div>
        </motion.div>
    );
};
