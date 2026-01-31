import {createFileRoute} from "@tanstack/react-router";
import {FullTerminal} from "@/components/full-terminal";

export const Route = createFileRoute("/terminal")({
    component: TerminalPage,
});

function TerminalPage() {
    return <FullTerminal/>;
}
