import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/header';
import { ProjectDetails } from '@/components/projects/project-details';
import { motion } from 'framer-motion';
import { getProjectById, getAdjacentProjects } from '@/data/projects';
import { notFound } from '@tanstack/react-router';
import { generateMetaTags } from '@/lib/seo';

export const Route = createFileRoute('/project/$id')({
    component: ProjectDetailPage,
    head: ({ params }) => {
        const project = getProjectById(params.id);
        if (!project) {
            return {
                meta: [
                    {
                        title: 'Project Not Found | Aaron Will Djaba',
                    },
                ],
            };
        }
        return generateMetaTags({
            title: project.title,
            description: project.description,
            url: `/project/${project.id}`,
            image: project.image,
            keywords: [...project.techStack, ...project.tags],
            type: 'article',
        });
    },
});

function ProjectDetailPage() {
    const { id } = Route.useParams();
    const project = getProjectById(id);

    if (!project) {
        throw notFound();
    }

    const { prev, next } = getAdjacentProjects(id);

    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-5xl mx-auto p-6 sm:p-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Header />

                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <ProjectDetails
                        project={project}
                        prevProject={prev}
                        nextProject={next}
                    />
                </motion.div>

                <motion.footer
                    className="mt-10 pt-6 border-t border-border text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Aaron Will Djaba - built with care
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    );
}
