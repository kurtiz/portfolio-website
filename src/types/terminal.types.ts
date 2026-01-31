/* -----------------------------
    Types
 ------------------------------ */
export type TerminalLineType =
    | "command"
    | "output"
    | "path"
    | "success"
    | "accent"
    | "error";

export type TerminalLine = {
    text: string;
    type: TerminalLineType;
    prefix?: string;
};