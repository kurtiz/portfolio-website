import {motion} from "framer-motion";
import {Mail} from "lucide-react";
import {GithubIcon} from "@/components/animated-socials/github-icon.tsx";
import {LinkedinIcon} from "@/components/animated-socials/linkedin-icon.tsx";
import {TwitterIcon} from "@/components/animated-socials/twitter-icon.tsx";

const socials = [
    {icon: GithubIcon, label: "GitHub", href: "#"},
    {icon: LinkedinIcon, label: "LinkedIn", href: "#"},
    {icon: TwitterIcon, label: "Twitter", href: "#"},
    {icon: Mail, label: "Email", href: "#"},
];

export const SocialCard = () => {
    return (
        <motion.div
            className="card-neumorphic p-6 h-full flex flex-col"
            whileHover={{scale: 1.02}}
            transition={{duration: 0.2}}
        >
            <h3 className="font-semibold mb-4">Connect</h3>

            <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3">
                    {socials.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center hover:bg-muted transition-colors"
                            whileHover={{y: -4}}
                            whileTap={{scale: 0.95}}
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: index * 0.05}}
                        >
                            <social.icon className="w-5 h-5"/>
                        </motion.a>
                    ))}
                </div>
            </div>

            <p className="font-mono text-xs text-muted-foreground mt-4">
                let's build together
            </p>
        </motion.div>
    );
};
