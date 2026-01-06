import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export const LocationCard = () => {
  return (
    <motion.div
      className="card-neumorphic p-6 h-full flex flex-col justify-between cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent" />
        <span className="font-mono text-xs text-muted-foreground">location</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-4xl">🌍</div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-muted/50 rounded-full blur-sm" />
        </motion.div>
      </div>

      <div className="text-center">
        <p className="font-semibold">Remote</p>
        <p className="font-mono text-xs text-muted-foreground">UTC+0 / Flexible</p>
      </div>
    </motion.div>
  );
};
