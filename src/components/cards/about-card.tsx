import {motion} from "framer-motion";
import {useRef} from "react";
import {AnimatedIconHandle} from "@/components/ui/types";
import {Link} from "@tanstack/react-router";
import {UserIcon} from "lucide-react";

export const AboutCard = () => {
    const cardRef = useRef<AnimatedIconHandle>(null);
    return (
        <Link to="/about">
            <motion.div
                className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer group"
                whileHover={{scale: 1.02}}
                transition={{duration: 0.2}}
                onTap={() => {
                    cardRef?.current?.startAnimation();
                }}
                onHoverStart={() => {
                    cardRef?.current?.startAnimation();
                }}
                onHoverEnd={() => {
                    cardRef?.current?.stopAnimation();
                }}
            >
                {/* Icon */}
                <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img
                            src="/images/profile.jpg"
                            alt="Aaron Will Djaba"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <UserIcon className="w-6 h-6 text-muted-foreground hidden" />
                    </div>
                </div>

                {/* Text */}
                <div className="mt-4">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                        About Me
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                        Full-Stack Engineer & Security Analyst
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};
