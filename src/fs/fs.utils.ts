import {FSNode, FolderNode} from "./fs";

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
