import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const FeaturedProjectCard = () => {
  return (
    <motion.div
      className="bg-accent text-accent-foreground rounded-2xl p-6 h-full flex flex-col cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: "0 8px 32px -4px hsl(0 86% 71% / 0.3)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border border-current rounded-full" />
        <div className="absolute top-8 right-8 w-24 h-24 border border-current rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-current rounded-full" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider opacity-80">
            Featured Project
          </span>
          <h3 className="text-2xl font-bold mt-2">SecureVault</h3>
          <p className="font-mono text-sm opacity-80 mt-2 max-w-xs">
            End-to-end encrypted password manager with zero-knowledge architecture
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-accent-foreground/20 px-2 py-1 rounded-full">
              React
            </span>
            <span className="font-mono text-xs bg-accent-foreground/20 px-2 py-1 rounded-full">
              Rust
            </span>
          </div>
          
          <motion.div
            className="w-10 h-10 bg-accent-foreground/20 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
