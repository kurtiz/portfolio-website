import {motion} from "framer-motion";
import {useRef} from "react";
import {AnimatedIconHandle} from "@/components/ui/types";
import {Link} from "@tanstack/react-router";
import {UserRoundIcon} from "@/components/animated-socials/user-icon";

export const AboutCard = () => {
    const iconRef = useRef<AnimatedIconHandle>(null);
    return (
        <Link to="/about">
            <motion.div
                className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer group"
                whileHover={{scale: 1.02}}
                transition={{duration: 0.2}}
                onTap={() => {
                    iconRef?.current?.startAnimation();
                }}
                onHoverStart={() => {
                    iconRef?.current?.startAnimation();
                }}
                onHoverEnd={() => {
                    iconRef?.current?.stopAnimation();
                }}
            >
                {/* Icon / Visual */}
                <div className="flex-1 flex items-center justify-center">
                    <motion.div
                        className="relative"
                        whileHover={{y: -8}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    >
                        <div
                            className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow">
                            <UserRoundIcon
                                ref={iconRef}
                                className="w-7 h-7 text-foreground"
                            />
                        </div>
                        {/* 3D shadow effect */}
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-muted/50 rounded-full blur-sm"/>
                    </motion.div>
                </div>

                {/* Text */}
                <div className="mt-4">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                        About Me
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                        Full-Stack Software Engineer & Security Analyst
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};
