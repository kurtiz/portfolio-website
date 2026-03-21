import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
    onClearFilters: () => void;
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
    return (
        <motion.div
            className="col-span-full py-16 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SearchX className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No projects found</h3>
            <p className="font-mono text-sm text-muted-foreground mb-4 max-w-sm">
                Try adjusting your filters or search query to find what you&apos;re looking for.
            </p>
            <button
                onClick={onClearFilters}
                className="font-mono text-sm bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
                Clear all filters
            </button>
        </motion.div>
    );
};
