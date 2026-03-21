import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Github, ExternalLink, BookOpen, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { Project } from '@/data/projects';
import { projectTypes } from '@/data/projects';
import { Lightbox } from './lightbox';

interface ProjectDetailsProps {
    project: Project;
    prevProject: Project | null;
    nextProject: Project | null;
}

export const ProjectDetails = ({ project, prevProject, nextProject }: ProjectDetailsProps) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [imageAlt, setImageAlt] = useState('');

    const projectTypeLabel = projectTypes.find(t => t.value === project.type)?.label || project.type;

    const openLightbox = (src: string, alt: string) => {
        setImageSrc(src);
        setImageAlt(alt);
        setLightboxOpen(true);
    };

    const formatDescription = (text: string) => {
        return text.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
                return (
                    <h3 key={index} className="font-semibold text-lg mt-6 mb-3 first:mt-0">
                        {paragraph.replace('## ', '')}
                    </h3>
                );
            }
            if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                    <ul key={index} className="list-disc list-inside space-y-1 my-3">
                        {items.map((item, i) => (
                            <li key={i} className="text-muted-foreground">
                                {item.replace('- ', '')}
                            </li>
                        ))}
                    </ul>
                );
            }
            if (paragraph.startsWith('|')) {
                return (
                    <div key={index} className="my-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <tbody>
                                {paragraph.split('\n').map((row, rowIndex) => {
                                    if (row.includes('---')) return null;
                                    const cells = row.split('|').filter(cell => cell.trim());
                                    return (
                                        <tr key={rowIndex}>
                                            {cells.map((cell, cellIndex) => (
                                                <td key={cellIndex} className="px-4 py-2 border-b border-border">
                                                    {cell.trim()}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
            return (
                <p key={index} className="text-muted-foreground my-3">
                    {paragraph}
                </p>
            );
        });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                {project.image && (
                    <div className="relative mb-8 -mx-5 sm:-mx-10 lg:-mx-20">
                        <div
                            className="relative overflow-hidden rounded-xl cursor-pointer group"
                            onClick={() => openLightbox(project.image!, project.title)}
                        >
                            {project.image.endsWith('.gif') ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm rounded-full p-3">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-mono text-xs bg-secondary px-3 py-1 rounded-full">
                        {projectTypeLabel}
                    </span>
                    {project.featured && (
                        <span className="font-mono text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">
                            Featured
                        </span>
                    )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    {project.title}
                </h1>

                <div className="prose prose-sm max-w-none mb-8">
                    {formatDescription(project.longDescription || project.description)}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="font-mono text-xs text-muted-foreground mr-2">Stack:</span>
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="font-mono text-xs bg-secondary px-3 py-1.5 rounded-lg"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    <span className="font-mono text-xs text-muted-foreground mr-2">Tags:</span>
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm bg-secondary hover:bg-secondary/80 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                    )}
                    {project.links.live && (
                        <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </a>
                    )}
                    {project.links.docs && (
                        <a
                            href={project.links.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm bg-secondary hover:bg-secondary/80 px-4 py-2.5 rounded-lg transition-colors"
                        >
                            <BookOpen className="w-4 h-4" />
                            Documentation
                        </a>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-6">
                    {prevProject ? (
                        <Link
                            to="/project/$id"
                            params={{ id: prevProject.id }}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <div className="text-left">
                                <p className="font-mono text-xs text-muted-foreground">Previous</p>
                                <p className="font-semibold">{prevProject.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextProject && (
                        <Link
                            to="/project/$id"
                            params={{ id: nextProject.id }}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <div className="text-right">
                                <p className="font-mono text-xs text-muted-foreground">Next</p>
                                <p className="font-semibold">{nextProject.title}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </motion.div>

            <Lightbox
                src={imageSrc}
                alt={imageAlt}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
};
