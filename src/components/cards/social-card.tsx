import {motion} from "framer-motion";
import {GithubIcon} from "@/components/animated-socials/github-icon.tsx";
import {LinkedinIcon} from "@/components/animated-socials/linkedin-icon.tsx";
import {TwitterIcon} from "@/components/animated-socials/twitter-icon.tsx";
import type {QuoraIconHandle} from "@/components/animated-socials/quora-icon.tsx";
import {QuoraIcon} from "@/components/animated-socials/quora-icon.tsx";
import {useRef} from "react";
import type {GithubIconHandle} from "@/components/animated-socials/github-icon";
import type {LinkedInIconHandle} from "@/components/animated-socials/linkedin-icon";
import type {TwitterIconHandle} from "@/components/animated-socials/twitter-icon";


const socials = [
    {icon: GithubIcon, label: "GitHub", href: "https://github.com/kurtiz"},
    {icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/aaron-will-djaba-424b7a184"},
    {icon: TwitterIcon, label: "Twitter", href: "https://x.com/aaronwilldjaba"},
    {icon: QuoraIcon, label: "Quora", href: "https://www.quora.com/profile/Aaron-Will-Djaba"},
];

export const SocialCard = () => {

    const iconRefs = {
        GitHub: useRef<GithubIconHandle>(null),
        LinkedIn: useRef<LinkedInIconHandle>(null),
        Twitter: useRef<TwitterIconHandle>(null),
        Quora: useRef<QuoraIconHandle>(null),
    };

    return (
        <motion.div
            className="card-neumorphic p-6 h-full flex flex-col"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2}}
        >
            <h3 className="font-semibold mb-4">Connect With Me</h3>

            <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3">
                    {socials.map((social, index) => {
                        const Icon = social.icon;
                        const ref =
                            social.label === "GitHub"
                                ? iconRefs.GitHub
                                : social.label === "LinkedIn"
                                    ? iconRefs.LinkedIn
                                    : social.label === "Twitter"
                                        ? iconRefs.Twitter
                                        : social.label === "Quora"
                                            ? iconRefs.Quora
                                            : undefined;

                        return (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                className="group w-12 h-12 bg-secondary rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
                                whileHover={{y: -4}}
                                whileTap={{scale: 0.95}}
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: index * 0.05}}
                                onHoverStart={() => ref?.current?.startAnimation()}
                                onHoverEnd={() => ref?.current?.stopAnimation()}
                            >
                                <Icon ref={ref as any} className="w-5 h-5"/>
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground mt-4">
                let's build together
            </p>
        </motion.div>
    );
};
