import { motion } from 'framer-motion';
import { Github, ExternalLink, BookOpen } from 'lucide-react';

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        techStack: string[];
        tags: string[];
        links: {
            github?: string;
            live?: string;
            docs?: string;
        };
        featured?: boolean;
    };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            className="card-neumorphic p-5 flex flex-col h-full group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
        >
            {project.featured && (
                <span className="absolute top-3 right-3 font-mono text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    Featured
                </span>
            )}

            <div className="flex-1">
                <h3 className="font-semibold text-lg group-hover:text-accent transition-colors pr-16">
                    {project.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-2 line-clamp-3">
                    {project.description}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                    <span
                        key={tech}
                        className="font-mono text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground"
                    >
                        {tech}
                    </span>
                ))}
                {project.techStack.length > 4 && (
                    <span className="font-mono text-xs text-muted-foreground">
                        +{project.techStack.length - 4}
                    </span>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="View on GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {project.links.live && (
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="View live site"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                    {project.links.docs && (
                        <a
                            href={project.links.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="View documentation"
                        >
                            <BookOpen className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
