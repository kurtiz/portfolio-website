import {motion} from "framer-motion";
import {ThemeToggle} from "./theme-toggle.tsx";

const AudioWaveform = () => {
    return (
        <div className="flex items-center gap-1 h-5">
            {[1, 2, 3, 4, 5].map((bar) => (
                <motion.div
                    key={bar}
                    className={`w-1 bg-primary-foreground rounded-full animate-waveform-${bar}`}
                    initial={{height: 4}}
                />
            ))}
        </div>
    );
};

export const Header = () => {
    return (
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
            <div className="space-y-3">
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold tracking-tight normal-case"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    I am Aaron Will Djaba
                </motion.h1>
                <motion.p
                    className="font-mono text-sm text-muted-foreground max-w-md leading-relaxed"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.1}}
                >
                    I'm a Full Stack Web Developer and Cybersecurity Analyst crafting
                    secure, beautiful digital experiences.
                </motion.p>
            </div>

            <motion.div
                className="flex items-center gap-3 self-start"
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.4, delay: 0.2}}
            >
                <ThemeToggle/>

                <motion.div
                    className="pill-island flex items-center gap-3"
                    whileHover={{scale: 1.02}}
                >
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow"/>
                    <span className="font-mono text-xs">system active</span>
                    <AudioWaveform/>
                </motion.div>
            </motion.div>
        </header>
    );
};
