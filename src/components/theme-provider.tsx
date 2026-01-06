"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export function ThemeProvider(
    {
        children,
        defaultTheme = "system",
        storageKey = "ui-theme",
    }: ThemeProviderProps) {
    const [theme, setTheme] = React.useState<Theme>(() => defaultTheme)
    const [mounted, setMounted] = React.useState(false)

    // Mark client mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Read from localStorage ONLY on client
    React.useEffect(() => {
        if (!mounted) return

        const stored = localStorage.getItem(storageKey) as Theme | null
        if (stored) {
            setTheme(stored)
        }
    }, [mounted, storageKey])

    // Apply theme class
    React.useEffect(() => {
        if (!mounted) return

        const root = document.documentElement
        root.classList.remove("light", "dark")

        const resolved =
            theme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : theme

        root.classList.add(resolved)
        localStorage.setItem(storageKey, theme)
    }, [theme, mounted, storageKey])

    // Prevent hydration mismatch
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
    undefined
)

export function useTheme() {
    const ctx = React.useContext(ThemeContext)
    if (!ctx) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return ctx
}
