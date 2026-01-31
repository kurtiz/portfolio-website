import {createFileRoute} from "@tanstack/react-router";
import {WorkExperienceTimeline} from "@/components/work-experience-timeline";

export const Route = createFileRoute("/work-experience")({
    component: WorkExperiencePage,
});

function WorkExperiencePage() {
    return <WorkExperienceTimeline/>;
}
