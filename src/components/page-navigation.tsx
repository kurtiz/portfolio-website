"use client";

import {motion} from "framer-motion";
import {useNavigate, useRouterState} from "@tanstack/react-router";
import {ThemeToggle} from "@/components/theme-toggle";

export const PageNavigation = () => {
    const navigate = useNavigate();
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;

    // Don't show navigation on homepage
    if (currentPath === "/") {
        return null;
    }

    return (
        <motion.nav
            className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.3}}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Back button & Breadcrumb */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => navigate({to: "/"})}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                            whileHover={{x: -4}}
                            whileTap={{scale: 0.95}}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:stroke-accent transition-colors"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            <span className="font-medium hidden sm:inline">Home</span>
                        </motion.button>

                        {/* Breadcrumb */}
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">/</span>
                            <motion.span
                                className="text-foreground font-medium"
                                initial={{opacity: 0, x: -10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.2}}
                            >
                                {getPageTitle(currentPath)}
                            </motion.span>
                        </div>
                    </div>

                    {/* Center: Logo/Name (optional) */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                        <motion.div
                            className="flex items-center gap-2"
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.1}}
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-success flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AD</span>
                            </div>
                            <span className="font-mono text-sm text-muted-foreground">
                                Aaron Will Djaba
                            </span>
                        </motion.div>
                    </div>

                    {/* Right: Theme toggle */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

// Helper function to get page title from path
function getPageTitle(path: string): string {
    const titles: Record<string, string> = {
        "/terminal": "terminal",
        "/work-experience": "work experience",
        "/projects": "projects",
        "/blog": "blog",
    };

    return titles[path] || path.slice(1).replace(/-/g, " ");
}
