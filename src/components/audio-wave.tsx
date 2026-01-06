"use client"

import {useEffect, useRef, useState} from "react"
import {motion, useAnimation} from "framer-motion"

const BARS = [1, 2, 3, 4, 5]

export default function AudioWaveform() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const controls = useAnimation();
    const [playing, setPlaying] = useState(false);

    // Initialize audio (client only)
    useEffect(() => {
        const audio = new Audio("/lofi.mp3")
        audio.loop = true
        audio.volume = 0.5
        audioRef.current = audio

        return () => {
            audio.pause()
            audioRef.current = null
        }
    }, [controls])

    const toggle = () => {
        const audio = audioRef.current
        if (!audio) return

        if (audio.paused) {
            audio.play()
            setPlaying(true)
            controls.start("playing")
        } else {
            audio.pause()
            setPlaying(false)
            controls.start("idle")
        }
    }

    return (
        <button
            onLoad={() => {
                setTimeout(() => {
                    console.log("Auto play")
                    toggle()
                }, 1500);
            }}
            onClick={toggle}
            aria-label={playing ? "Pause audio" : "Play audio"}
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
                    animate={controls}
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
