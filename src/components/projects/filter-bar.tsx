import { motion } from 'framer-motion';
import type { ProjectType } from '@/data/projects';

interface FilterBarProps {
    selectedType: ProjectType | 'all';
    selectedTech: string | 'all';
    onTypeChange: (type: ProjectType | 'all') => void;
    onTechChange: (tech: string | 'all') => void;
    types: { value: ProjectType | 'all'; label: string }[];
    techStack: string[];
}

export const FilterBar = ({
    selectedType,
    selectedTech,
    onTypeChange,
    onTechChange,
    types,
    techStack,
}: FilterBarProps) => {
    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs text-muted-foreground self-center mr-1">
                    Type:
                </span>
                {types.map((type) => (
                    <motion.button
                        key={type.value}
                        onClick={() => onTypeChange(type.value)}
                        className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all ${
                            selectedType === type.value
                                ? 'bg-accent text-accent-foreground shadow-sm'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {type.label}
                    </motion.button>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs text-muted-foreground self-center mr-1">
                    Stack:
                </span>
                <motion.button
                    onClick={() => onTechChange('all')}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all ${
                        selectedTech === 'all'
                            ? 'bg-accent text-accent-foreground shadow-sm'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    All
                </motion.button>
                {techStack.map((tech) => (
                    <motion.button
                        key={tech}
                        onClick={() => onTechChange(tech)}
                        className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all ${
                            selectedTech === tech
                                ? 'bg-accent text-accent-foreground shadow-sm'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tech}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
