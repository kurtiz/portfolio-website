"use client";

import {cn} from "@/lib/utils";
import type {HTMLMotionProps, Variants} from "motion/react";
import {motion, useAnimation, useReducedMotion} from "motion/react";
import * as React from "react";
import {forwardRef, useCallback, useImperativeHandle, useRef} from "react";

export interface QuoraIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface QuoraIconProps extends HTMLMotionProps<"div"> {
    size?: number;
    duration?: number;
    isAnimated?: boolean;
}

const QuoraIcon = forwardRef<QuoraIconHandle, QuoraIconProps>(
    (
        {
            onMouseEnter,
            onMouseLeave,
            className,
            size = 24,
            duration = 1,
            isAnimated = true,
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
            normal: {
                scale: 1,
            },
            animate: {
                scale: [1, 1.05, 1],
                transition: {
                    duration: 0.4 * duration,
                    ease: "easeOut",
                },
            },
        };

        const primaryPath: Variants = {
            normal: {
                pathLength: 1,
                opacity: 1,
            },
            animate: {
                pathLength: [0.2, 1],
                opacity: [0.6, 1],
                transition: {
                    duration: 0.6 * duration,
                    ease: "easeInOut",
                },
            },
        };

        const secondaryPath: Variants = {
            normal: {
                pathLength: 1,
                opacity: 1,
            },
            animate: {
                pathLength: [0, 1],
                opacity: [0, 1],
                transition: {
                    duration: 0.5 * duration,
                    delay: 0.12 * duration,
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
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    animate={controls}
                    initial="normal"
                    variants={iconVariants}
                >
                    {/* Main organic shape */}
                    <motion.path
                        d="M17.1481 22.0001C20.037 22.0001 21 19.6776 21 16.8126C20.037 17.8497 17.3671 20.0195 16.1852 15.775C14.7407 10.5876 10.5 11.5 8 14C11.8519 14 12.3827 14.8974 13.2963 17.8501C14.2593 20.9625 15.7037 22.0001 17.1481 22.0001Z"
                        variants={primaryPath}
                    />

                    {/* Inner motion path */}
                    <motion.path
                        d="M6.5154 11C6.5052 10.8351 6.5 10.6684 6.5 10.5C6.5 7.18629 8.51472 4.5 11 4.5C13.4853 4.5 15.5 7.18629 15.5 10.5C15.5 11.3922 15.262 12.2389 15 13"
                        variants={secondaryPath}
                    />

                    {/* Outer orbit */}
                    <motion.path
                        d="M13.2413 18.6619C12.5301 18.882 11.778 19 11 19C6.58172 19 3 15.1944 3 10.5C3 5.80558 6.58172 2 11 2C15.4183 2 19 5.80558 19 10.5C19 11.7477 18.747 12.9326 18.2925 14"
                        variants={secondaryPath}
                    />
                </motion.svg>
            </motion.div>
        );
    },
);

QuoraIcon.displayName = "QuoraIcon";
export {QuoraIcon};
