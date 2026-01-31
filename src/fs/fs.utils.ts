import {FolderNode, FSNode} from "./fs";

export function resolvePath(
    root: FolderNode,
    path: string[]
): FSNode | null {
    let current: FSNode = root;

    for (const segment of path) {
        if (current.type !== "folder") return null;
        current = current.children[segment];
        if (!current) return null;
    }

    return current;
}

/**
 * Get autocomplete suggestions for the current input
 */
export function getAutocompleteSuggestions(
    input: string,
    cwd: FolderNode,
    availableCommands: string[]
): string[] {
    const parts = input.trim().split(" ");

    // If no input or just typing command
    if (parts.length === 0 || input.trim() === "") {
        return availableCommands;
    }

    const [cmd, ...args] = parts;

    // Autocomplete command names
    if (parts.length === 1 && !input.endsWith(" ")) {
        return availableCommands.filter(c => c.startsWith(cmd.toLowerCase()));
    }

    // Autocomplete file/folder names for commands that take paths
    const pathCommands = ["ls", "cat", "cd"];
    if (pathCommands.includes(cmd.toLowerCase())) {
        const partial = args.join(" ").toLowerCase();
        const entries = Object.keys(cwd.children);

        if (partial === "") {
            return entries;
        }

        return entries.filter(e => e.toLowerCase().startsWith(partial));
    }

    return [];
}

/**
 * Apply autocomplete to input string
 */
export function applyAutocomplete(
    input: string,
    suggestion: string
): string {
    const parts = input.trim().split(" ");

    if (parts.length === 0 || input.trim() === "") {
        return suggestion + " ";
    }

    // @ts-ignore
    const [cmd, ...args] = parts;

    // If completing command
    if (parts.length === 1 && !input.endsWith(" ")) {
        return suggestion + " ";
    }

    // If completing path argument
    return `${cmd} ${suggestion}`;
}
