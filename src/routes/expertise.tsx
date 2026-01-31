import {createFileRoute} from "@tanstack/react-router";
import {ExpertiseShowcase} from "@/components/expertise-showcase";
import {generateMetaTags, pageSEO} from "@/lib/seo";

export const Route = createFileRoute("/expertise")({
    component: ExpertisePage,
    head: () => generateMetaTags(pageSEO.expertise),
});

function ExpertisePage() {
    return <ExpertiseShowcase/>;
}
