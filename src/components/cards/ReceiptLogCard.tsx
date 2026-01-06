import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const logLines = [
  { time: "12:45:02", message: "git commit -m 'feat: add auth'", type: "success" },
  { time: "12:44:58", message: "npm run build → passed", type: "success" },
  { time: "12:44:32", message: "security scan: 0 vulnerabilities", type: "info" },
  { time: "12:44:01", message: "deployed to production ✓", type: "success" },
];

export const ReceiptLogCard = () => {
  return (
    <motion.div
      className="card-neumorphic p-6 h-full flex flex-col cursor-pointer font-mono"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <Terminal className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">
          System Log
        </span>
        <span className="ml-auto text-xs text-success flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
          online
        </span>
      </div>

      <div className="flex-1 space-y-2 text-xs">
        {logLines.map((log, index) => (
          <motion.div
            key={index}
            className="flex gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-muted-foreground shrink-0">{log.time}</span>
            <span className={
              log.type === "success" 
                ? "text-success" 
                : "text-muted-foreground"
            }>
              {log.message}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-border text-center">
        <span className="text-xs text-muted-foreground">
          ─── all systems operational ───
        </span>
      </div>
    </motion.div>
  );
};
