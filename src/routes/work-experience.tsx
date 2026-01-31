import {createFileRoute} from "@tanstack/react-router";
import {WorkExperienceTimeline} from "@/components/work-experience-timeline";
import {generateMetaTags, pageSEO} from "@/lib/seo";

export const Route = createFileRoute("/work-experience")({
    component: WorkExperiencePage,
    head: () => generateMetaTags(pageSEO.workExperience),
});

function WorkExperiencePage() {
    return <WorkExperienceTimeline/>;
}
