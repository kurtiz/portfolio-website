import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { projects, type ProjectType, allTechStack } from '@/data/projects';
import { FilterBar } from './filter-bar';
import { SearchInput } from './search-input';
import { ProjectCard } from './project-card';
import { EmptyState } from './empty-state';

const filterTypes: { value: ProjectType | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'web-app', label: 'Web Apps' },
    { value: 'cli-tool', label: 'CLI Tools' },
    { value: 'library', label: 'Libraries' },
    { value: 'client', label: 'Client Projects' },
    { value: 'docs', label: 'Documentation' },
];

export const ProjectsGrid = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
    const [selectedTech, setSelectedTech] = useState<string | 'all'>('all');

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                searchQuery === '' ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesType =
                selectedType === 'all' || project.type === selectedType;

            const matchesTech =
                selectedTech === 'all' || project.techStack.includes(selectedTech);

            return matchesSearch && matchesType && matchesTech;
        });
    }, [searchQuery, selectedType, selectedTech]);

    const featuredProjects = useMemo(
        () => filteredProjects.filter((p) => p.featured),
        [filteredProjects]
    );

    const otherProjects = useMemo(
        () => filteredProjects.filter((p) => !p.featured),
        [filteredProjects]
    );

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedTech('all');
    };

    return (
        <div className="space-y-6">
            <div className="card-inset p-4">
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <div className="mt-4">
                    <FilterBar
                        selectedType={selectedType}
                        selectedTech={selectedTech}
                        onTypeChange={setSelectedType}
                        onTechChange={setSelectedTech}
                        types={filterTypes}
                        techStack={allTechStack}
                    />
                </div>
            </div>

            <div>
                <p className="font-mono text-xs text-muted-foreground mb-4">
                    {filteredProjects.length} project
                    {filteredProjects.length !== 1 ? 's' : ''} found
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {featuredProjects.map((project) => (
                        <Link
                            key={project.id}
                            to="/projects/$projectId"
                            params={{ projectId: project.id }}
                            className="block"
                        >
                            <ProjectCard project={project} />
                        </Link>
                    ))}
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                    {otherProjects.map((project) => (
                        <Link
                            key={project.id}
                            to="/projects/$projectId"
                            params={{ projectId: project.id }}
                            className="block"
                        >
                            <ProjectCard project={project} />
                        </Link>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <EmptyState onClearFilters={handleClearFilters} />
                )}
            </div>
        </div>
    );
};
