import {motion} from "framer-motion";
import {useRef} from "react";
import {BuildingIcon, BuildingIconHandle} from "@/components/animated-socials/building-icon.tsx";
import {useNavigate} from "@tanstack/react-router";

export const WorkExperienceCard = () => {
    const buildingIconRef = useRef<BuildingIconHandle>(null);
    const navigate = useNavigate();

    return (
        <motion.div
            className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer group"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2}}
            onClick={() => navigate({to: "/work-experience"})}
            onTap={() => {
                buildingIconRef?.current?.startAnimation();
            }}
            onHoverStart={() => {
                buildingIconRef?.current?.startAnimation();
            }}
            onHoverEnd={() => {
                buildingIconRef?.current?.stopAnimation();
            }}
        >
            <div className="flex-1 flex items-center justify-center">
                <motion.div
                    className="relative"
                    whileHover={{y: -8}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                >
                    <div
                        className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-shadow">
                        <BuildingIcon ref={buildingIconRef} className="w-7 h-7 text-foreground"/>
                    </div>
                    {/* 3D shadow effect */}
                    <div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-muted/50 rounded-full blur-sm"/>
                </motion.div>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold text-lg">Work Experiences</h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                    where or who I have worked with
                </p>
            </div>
        </motion.div>
    );
};
