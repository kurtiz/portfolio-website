/* -----------------------------
    Types
 ------------------------------ */
export type TerminalLineType =
    | "command"
    | "output"
    | "path"
    | "success"
    | "accent"
    | "error"
    | "folder"
    | "file";

export type TerminalLine = {
    text: string;
    type: TerminalLineType;
    prefix?: string;
};