"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {
    workExperiences,
    getTotalYearsOfExperience,
    getCurrentPositions,
    type WorkExperience,
    type Role
} from "@/data/work-experience";

/* -----------------------------
    Role Sub-Timeline Component
 ------------------------------ */
const RoleItem = ({role, index, isLast}: { role: Role; index: number; isLast: boolean }) => {
    const isCurrent = !role.endDate;

    return (
        <motion.div
            initial={{opacity: 0, x: -10}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.1}}
            className="relative pl-6 pb-6 last:pb-0"
        >
            {/* Sub-timeline line */}
            {!isLast && (
                <div className="absolute left-[7px] top-4 bottom-0 w-[1px] bg-gradient-to-b from-accent/50 to-transparent"/>
            )}

            {/* Sub-timeline dot */}
            <div className="absolute left-0 top-1 flex items-center justify-center">
                {isCurrent ? (
                    <motion.div
                        className="w-4 h-4 bg-success rounded-full border-2 border-background"
                        animate={{scale: [1, 1.2, 1]}}
                        transition={{duration: 2, repeat: Infinity}}
                    />
                ) : (
                    <div className="w-4 h-4 bg-accent/30 rounded-full border-2 border-background"/>
                )}
            </div>

            {/* Role content */}
            <div className="ml-2">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-foreground">{role.position}</h4>
                            {isCurrent && (
                                <span
                                    className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full border border-success/20">
                                    Current
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-xs text-muted-foreground">
                            {role.startDate}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                            {role.endDate || "Present"}
                        </p>
                    </div>
                </div>

                {role.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {role.description}
                    </p>
                )}

                {role.technologies && role.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {role.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-secondary/50 text-foreground text-xs rounded border border-border/50"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

/* -----------------------------
    Timeline Item Component
 ------------------------------ */
const TimelineItem = ({
                          experience,
                          index,
                      }: {
    experience: WorkExperience;
    index: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasRoles = experience.roles && experience.roles.length > 0;
    const isCurrent = hasRoles 
        ? !experience.roles[0].endDate 
        : !experience.endDate;

    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.1}}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div
                className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-border to-transparent last:hidden"/>

            {/* Timeline dot */}
            <div className="absolute left-0 top-2 flex items-center justify-center">
                {isCurrent ? (
                    <motion.div
                        className="relative w-6 h-6"
                        animate={{scale: [1, 1.1, 1]}}
                        transition={{duration: 2, repeat: Infinity}}
                    >
                        <div className="absolute inset-0 bg-success rounded-full"/>
                        <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75"/>
                    </motion.div>
                ) : (
                    <div className="w-6 h-6 bg-muted border-2 border-border rounded-full"/>
                )}
            </div>

            {/* Content */}
            <motion.div
                className="card-neumorphic p-6 cursor-pointer hover:shadow-elevated transition-shadow"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{scale: 1.01}}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-lg">{experience.company}</h3>
                            {isCurrent && (
                                <span
                                    className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full border border-success/20">
                  Current
                </span>
                            )}
                            {experience.type && (
                                <span
                                    className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                  {experience.type}
                </span>
                            )}
                            {hasRoles && experience.roles!.length > 1 && (
                                <span
                                    className="px-2 py-0.5 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full border border-purple-500/20">
                  {experience.roles!.length} Roles
                </span>
                            )}
                        </div>
                        <p className="text-accent font-medium">
                            {hasRoles ? experience.roles![0].position : experience.position}
                        </p>
                        {experience.location && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                {experience.location}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div className="text-right">
                        <p className="font-mono text-sm text-muted-foreground">
                            {experience.startDate}
                        </p>
                        <p className="font-mono text-sm text-muted-foreground">
                            {hasRoles 
                                ? (experience.roles![0].endDate || "Present")
                                : (experience.endDate || "Present")
                            }
                        </p>
                    </div>
                </div>

                {/* Expandable content */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{duration: 0.3}}
                    className="overflow-hidden"
                >
                    {hasRoles ? (
                        // Show roles sub-timeline
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"/>
                                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                                    Career Progression
                                </p>
                                <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent"/>
                            </div>
                            <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                                {experience.roles.map((role, i) => (
                                    <RoleItem
                                        key={i}
                                        role={role}
                                        index={i}
                                        isLast={i === experience.roles!.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Show single position details
                        <>
                            {experience.description && (
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    {experience.description}
                                </p>
                            )}

                            {experience.technologies && experience.technologies.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                                        Technologies:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>

                {/* Expand indicator */}
                <div className="mt-3 flex items-center justify-center">
                    <motion.div
                        animate={{rotate: isExpanded ? 180 : 0}}
                        transition={{duration: 0.3}}
                        className="text-muted-foreground"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="4 6 8 10 12 6"/>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* -----------------------------
    Main Timeline Component
 ------------------------------ */
export const WorkExperienceTimeline = () => {
    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        className="text-4xl font-bold mb-2"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                    >
                        Work Experience
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        My professional journey and the places I've contributed to
                    </motion.p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {workExperiences.map((experience, index) => (
                        <TimelineItem
                            key={index}
                            experience={experience}
                            index={index}
                        />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5}}
                >
                    <div className="card-neumorphic p-6 text-center">
                        <p className="text-3xl font-bold text-accent">
                            {workExperiences.length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Total Positions
                        </p>
                    </div>
                    <div className="card-neumorphic p-6 text-center">
                        <p className="text-3xl font-bold text-success">
                            {getCurrentPositions().length}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Current Roles
                        </p>
                    </div>
                    <div className="card-neumorphic p-6 text-center">
                        <p className="text-3xl font-bold text-foreground">
                            {getTotalYearsOfExperience()}+
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Years Experience
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
