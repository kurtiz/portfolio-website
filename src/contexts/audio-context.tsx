"use client";

import {createContext, useContext, useEffect, useRef, useState, useCallback} from "react";

interface AudioContextType {
    isPlaying: boolean;
    toggle: () => void;
    play: () => void;
    pause: () => void;
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function AudioProvider({children}: {children: React.ReactNode}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasInteracted = useRef(false);

    useEffect(() => {
        const audio = new Audio("/lofi.mp3");
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        const onInteraction = () => {
            if (!hasInteracted.current) {
                hasInteracted.current = true;
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(() => {});
                document.removeEventListener("click", onInteraction);
                document.removeEventListener("keydown", onInteraction);
            }
        };

        document.addEventListener("click", onInteraction);
        document.addEventListener("keydown", onInteraction);

        return () => {
            audio.pause();
            audioRef.current = null;
            document.removeEventListener("click", onInteraction);
            document.removeEventListener("keydown", onInteraction);
        };
    }, []);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    }, []);

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }, []);

    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();
        setIsPlaying(false);
    }, []);

    return (
        <AudioCtx.Provider value={{isPlaying, toggle, play, pause}}>
            {children}
        </AudioCtx.Provider>
    );
}

export function useAudio() {
    const ctx = useContext(AudioCtx);
    if (!ctx) {
        throw new Error("useAudio must be used within AudioProvider");
    }
    return ctx;
}
