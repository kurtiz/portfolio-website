"use client";

import {useEffect, useRef} from "react";
import {useTheme} from "@/components/theme-provider";
import {MessageSquare} from "lucide-react";

interface GiscusCommentsProps {
    repo: string;
    repoId: string;
    categoryId: string;
    category: string;
    mapping?: string;
    reactionsEnabled?: boolean;
    emitMetadata?: boolean;
    inputPosition?: "top" | "bottom";
    lang?: string;
}

export function GiscusComments({
    repo,
    repoId,
    categoryId,
    category,
    mapping = "pathname",
    reactionsEnabled = true,
    emitMetadata = false,
    inputPosition = "bottom",
    lang = "en",
}: GiscusCommentsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    // Resolve the actual theme (handle "system" by checking document class)
    const resolvedTheme =
        theme === "system"
            ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
            : theme;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear previous giscus iframe if theme changed
        container.innerHTML = "";

        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const themeUrl = `${origin}/giscus-${resolvedTheme}.css`;

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", repo);
        script.setAttribute("data-repo-id", repoId);
        script.setAttribute("data-category", category);
        script.setAttribute("data-category-id", categoryId);
        script.setAttribute("data-mapping", mapping);
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", reactionsEnabled ? "1" : "0");
        script.setAttribute("data-emit-metadata", emitMetadata ? "1" : "0");
        script.setAttribute("data-input-position", inputPosition);
        script.setAttribute("data-theme", themeUrl);
        script.setAttribute("data-lang", lang);
        script.crossOrigin = "anonymous";
        script.async = true;

        container.appendChild(script);

        return () => {
            container.innerHTML = "";
        };
    }, [repo, repoId, category, categoryId, mapping, reactionsEnabled, emitMetadata, inputPosition, lang, resolvedTheme]);

    return (
        <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-foreground"/>
                <h2 className="text-lg font-semibold">Comments</h2>
            </div>
            <div ref={containerRef} className="giscus"/>
        </div>
    );
}
