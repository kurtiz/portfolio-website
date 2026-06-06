import {createFileRoute} from "@tanstack/react-router";
import {FullTerminal} from "@/components/full-terminal";
import {pageSEO} from "@/lib/seo";
import {generatePageMetaTags} from "@/lib/og";

export const Route = createFileRoute("/terminal")({
    component: TerminalPage,
    head: () => generatePageMetaTags('terminal', pageSEO.terminal),
});

function TerminalPage() {
    return <FullTerminal/>;
}
