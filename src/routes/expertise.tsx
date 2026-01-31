import {createFileRoute} from "@tanstack/react-router";
import {ExpertiseShowcase} from "@/components/expertise-showcase";

export const Route = createFileRoute("/expertise")({
    component: ExpertisePage,
});

function ExpertisePage() {
    return <ExpertiseShowcase/>;
}
