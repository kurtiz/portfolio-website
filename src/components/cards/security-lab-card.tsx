import {motion} from "framer-motion";
import {useState} from "react";
import {Shield, Terminal} from "lucide-react";

export const SecurityLabCard = () => {
    const [isActive, setIsActive] = useState(true);

    return (
        <motion.div
            className="card-neumorphic p-6 h-full flex flex-col cursor-pointer"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2}}
        >
            <div className="flex flex-col sm:flew-row sm:items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-foreground"/>
                    <h3 className="font-semibold">Security Lab</h3>
                </div>

                {/* Toggle Switch */}
                <motion.button
                    onClick={() => setIsActive(!isActive)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-success" : "bg-muted"
                    }`}
                    whileTap={{scale: 0.95}}
                >
                    <motion.div
                        className="absolute top-1 left-1 w-4 h-4 bg-background rounded-full shadow-sm"
                        animate={{x: isActive ? 24 : 0}}
                        transition={{type: "spring", stiffness: 500, damping: 30}}
                    />
                </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-3">
                <div className="flex items-center gap-2">
                    <motion.div
                        className={`w-2 h-2 rounded-full ${isActive ? "bg-success" : "bg-muted-foreground"}`}
                        animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                            opacity: isActive ? 1 : 0.5
                        }}
                        transition={{repeat: isActive ? Infinity : 0, duration: 2}}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
            {isActive ? "monitoring active" : "monitoring paused"}
          </span>
                </div>

                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-mono text-xs text-muted-foreground">
            CTF writeups & research
          </span>
                </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground mt-4">
                click toggle to {isActive ? "pause" : "activate"}
            </p>
        </motion.div>
    );
};
