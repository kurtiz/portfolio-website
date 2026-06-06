import {createFileRoute} from "@tanstack/react-router";
import {ExpertiseShowcase} from "@/components/expertise-showcase";
import {pageSEO} from "@/lib/seo";
import {generatePageMetaTags} from "@/lib/og";

export const Route = createFileRoute("/expertise")({
    component: ExpertisePage,
    head: () => generatePageMetaTags('expertise', pageSEO.expertise),
});

function ExpertisePage() {
    return <ExpertiseShowcase/>;
}
