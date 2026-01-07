"use client";

import {cn} from "@/lib/utils";
import type {HTMLMotionProps, Variants} from "motion/react";
import {motion, useAnimation, useReducedMotion} from "motion/react";
import {forwardRef, useCallback, useImperativeHandle, useRef} from "react";

export interface BuildingIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface BuildingIconProps extends HTMLMotionProps<"div"> {
    size?: number;
    duration?: number;
    isAnimated?: boolean;
}

const BuildingIcon = forwardRef<BuildingIconHandle, BuildingIconProps>(
    (
        {
            className,
            size = 24,
            duration = 1,
            isAnimated = true,
            onMouseEnter,
            onMouseLeave,
            ...props
        },
        ref,
    ) => {
        const controls = useAnimation();
        const reduced = useReducedMotion();
        const isControlled = useRef(false);

        useImperativeHandle(ref, () => {
            isControlled.current = true;
            return {
                startAnimation: () =>
                    reduced ? controls.start("normal") : controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleEnter = useCallback(
            (e?: React.MouseEvent<HTMLDivElement>) => {
                if (!isAnimated || reduced) return;
                if (!isControlled.current) controls.start("animate");
                else onMouseEnter?.(e as any);
            },
            [controls, reduced, isAnimated, onMouseEnter],
        );

        const handleLeave = useCallback(
            (e?: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlled.current) controls.start("normal");
                else onMouseLeave?.(e as any);
            },
            [controls, onMouseLeave],
        );

        /* ---------------- Variants ---------------- */

        const iconVariants: Variants = {
            normal: {scale: 1},
            animate: {
                scale: [1, 1.04, 1],
                transition: {
                    duration: 0.4 * duration,
                    ease: "easeOut",
                },
            },
        };

        /** Main building outline */
        const structure: Variants = {
            normal: {pathLength: 1, opacity: 1},
            animate: {
                pathLength: [0, 1],
                opacity: [0.4, 1],
                transition: {
                    duration: 0.6 * duration,
                    ease: "easeInOut",
                },
            },
        };

        /** Windows appearing */
        const windows: Variants = {
            normal: {opacity: 1, y: 0},
            animate: {
                opacity: [0, 1],
                y: [2, 0],
                transition: {
                    duration: 0.3 * duration,
                    delay: 0.35 * duration,
                    ease: "easeOut",
                },
            },
        };

        /** Door / base */
        const door: Variants = {
            normal: {pathLength: 1},
            animate: {
                pathLength: [0, 1],
                transition: {
                    duration: 0.4 * duration,
                    delay: 0.5 * duration,
                    ease: "easeInOut",
                },
            },
        };

        return (
            <motion.div
                className={cn("inline-flex items-center justify-center", className)}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                {...props}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={controls}
                    initial="normal"
                    variants={iconVariants}
                >
                    {/* Windows */}
                    <motion.path d="M10 8h4" variants={windows}/>
                    <motion.path d="M10 12h4" variants={windows}/>

                    {/* Door */}
                    <motion.path
                        d="M14 21v-3a2 2 0 0 0-4 0v3"
                        variants={door}
                    />

                    {/* Ground building */}
                    <motion.path
                        d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"
                        variants={structure}
                    />

                    {/* Main tower */}
                    <motion.path
                        d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
                        variants={structure}
                    />
                </motion.svg>
            </motion.div>
        );
    },
);

BuildingIcon.displayName = "BuildingIcon";
export {BuildingIcon};
