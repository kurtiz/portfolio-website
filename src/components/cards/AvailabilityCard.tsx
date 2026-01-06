import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const AvailabilityCard = () => {
  return (
    <motion.div
      className="bg-primary text-primary-foreground rounded-2xl p-6 h-full flex flex-col justify-between cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: "0 8px 32px -4px hsl(240 10% 10% / 0.3)",
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="font-mono text-xs uppercase tracking-wider opacity-80">
          Status
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-3 h-3 bg-success rounded-full mx-auto mb-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-2xl font-bold">Available</p>
          <p className="font-mono text-xs opacity-70 mt-1">for new projects</p>
        </div>
      </div>

      <div className="font-mono text-xs opacity-70 text-center">
        freelance · consulting · full-time
      </div>
    </motion.div>
  );
};
