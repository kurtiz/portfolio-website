import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/header';
import { ProjectsGrid } from '@/components/projects/projects-grid';
import { generateMetaTags, pageSEO } from '@/lib/seo';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/projects')({
    component: ProjectsPage,
    head: () => generateMetaTags(pageSEO.projects),
});

function ProjectsPage() {
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
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Projects</h1>
                        <p className="font-mono text-sm text-muted-foreground mt-1">
                            A collection of my work - personal projects, open source, and client projects.
                        </p>
                    </div>

                    <ProjectsGrid />
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
