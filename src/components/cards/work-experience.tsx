import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";

const experiences = [
  {
    company: "TechCorp Inc.",
    role: "Senior Full Stack Developer",
    period: "2022 - Present",
    current: true,
  },
  {
    company: "CyberSecure Labs",
    role: "Security Analyst",
    period: "2020 - 2022",
    current: false,
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "2018 - 2020",
    current: false,
  },
];

export const WorkExperience = () => {
  return (
    <motion.div
      className="card-neumorphic p-6 h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-5 h-5 text-foreground" />
        <h3 className="font-semibold">Experience</h3>
      </div>

      <div className="flex-1 space-y-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="relative pl-4 border-l-2 border-border"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Timeline dot */}
            <div 
              className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${
                exp.current ? "bg-success" : "bg-muted-foreground"
              }`}
            />
            
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{exp.company}</p>
                <p className="font-mono text-xs text-muted-foreground truncate">
                  {exp.role}
                </p>
                <p className="font-mono text-xs text-muted-foreground/70 flex items-center gap-1">
                  {exp.period}
                  {exp.current && (
                    <span className="bg-success/20 text-success px-1.5 py-0.5 rounded text-[10px] font-medium">
                      current
                    </span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="font-mono text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
        5+ years building & securing
      </p>
    </motion.div>
  );
};
