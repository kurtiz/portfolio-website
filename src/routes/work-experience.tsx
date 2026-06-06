import {createFileRoute} from "@tanstack/react-router";
import {WorkExperienceTimeline} from "@/components/work-experience-timeline";
import {pageSEO} from "@/lib/seo";
import {generatePageMetaTags} from "@/lib/og";

export const Route = createFileRoute("/work-experience")({
    component: WorkExperiencePage,
    head: () => generatePageMetaTags('work-experience', pageSEO.workExperience),
});

function WorkExperiencePage() {
    return <WorkExperienceTimeline/>;
}
