import {createFileRoute, notFound} from '@tanstack/react-router';
import {ProjectDetails} from '@/components/projects/project-details';
import {motion} from 'framer-motion';
import {getAdjacentProjects, getProjectById} from '@/data/projects';
import {generateMetaTags} from '@/lib/seo';
import {missingPageMetaTags, projectOgImage} from '@/lib/og';

export const Route = createFileRoute('/project/$id')({
    component: ProjectDetailPage,
    head: ({params}) => {
        const project = getProjectById(params.id);
        if (!project) {
            return missingPageMetaTags('Project Not Found');
        }
        return generateMetaTags({
            title: project.title,
            description: project.description,
            url: `/project/${project.id}`,
            image: projectOgImage(project.id),
            keywords: [...project.techStack, ...project.tags],
            type: 'article',
        });
    },
});

function ProjectDetailPage() {
    const {id} = Route.useParams();
    const project = getProjectById(id);

    if (!project) {
        throw notFound();
    }

    const {prev, next} = getAdjacentProjects(id);

    return (
        <div className="min-h-screen bg-canvas py-5 px-4 sm:py-6">
            <motion.div
                className="floating-container max-w-5xl sm:max-w-3xl md:max-w-5xl mx-auto p-6 sm:p-10"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.5}}
                >
                    <ProjectDetails
                        project={project}
                        prevProject={prev}
                        nextProject={next}
                    />
                </motion.div>

                <motion.footer
                    className="mt-10 pt-6 border-t border-border text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5}}
                >
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Aaron Will Djaba - built with care
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    );
}
