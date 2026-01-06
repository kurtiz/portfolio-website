import { motion } from "framer-motion";
import { Code2, Database, Lock, Zap } from "lucide-react";

const skills = [
  { icon: Code2, label: "Full Stack" },
  { icon: Database, label: "Databases" },
  { icon: Lock, label: "Security" },
  { icon: Zap, label: "Performance" },
];

export const SkillsCard = () => {
  return (
    <motion.div
      className="card-neumorphic p-6 h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="font-semibold mb-4">Expertise</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.label}
            className="flex items-center gap-2 bg-secondary rounded-xl p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ backgroundColor: "hsl(var(--muted))" }}
          >
            <skill.icon className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-xs">{skill.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">TypeScript</span>
          <span>95%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-foreground rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
