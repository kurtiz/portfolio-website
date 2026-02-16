"use client"

import {motion} from "framer-motion"
import {useAudio} from "@/contexts/audio-context"

const BARS = [1, 2, 3, 4, 5]

export default function AudioWaveform() {
    const {isPlaying, toggle} = useAudio()

    return (
        <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="flex items-center gap-1 h-5 cursor-pointer"
        >
            {BARS.map((bar, i) => (
                <motion.div
                    key={bar}
                    className="w-1 rounded-full bg-primary-foreground"
                    variants={{
                        idle: {height: 4},
                        playing: {
                            height: [4, 16, 6, 20, 8],
                        },
                    }}
                    initial="idle"
                    animate={isPlaying ? "playing" : "idle"}
                    transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: i * 0.1,
                    }}
                />
            ))}
        </button>
    )
}
