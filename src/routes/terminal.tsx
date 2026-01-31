import {createFileRoute} from "@tanstack/react-router";
import {FullTerminal} from "@/components/full-terminal";
import {generateMetaTags, pageSEO} from "@/lib/seo";

export const Route = createFileRoute("/terminal")({
    component: TerminalPage,
    head: () => generateMetaTags(pageSEO.terminal),
});

function TerminalPage() {
    return <FullTerminal/>;
}
