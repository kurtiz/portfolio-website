"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {expertise, getAverageExperience, getTotalSkills, type Skill, type SkillCategory} from "@/data/expertise";

/* -----------------------------
    Skill Chip Component
 ------------------------------ */
const SkillChip = ({skill, index, categoryColor}: { skill: Skill; index: number; categoryColor: string }) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: index * 0.03, type: "spring", stiffness: 200}}
            whileHover={{scale: 1.05, y: -2}}
            whileTap={{scale: 0.95}}
            className="group"
        >
            <div className={`
                relative overflow-hidden
                px-4 py-2.5 
                bg-gradient-to-br ${categoryColor}
                rounded-full
                shadow-sm hover:shadow-md
                transition-shadow duration-200
                cursor-default
            `}>
                {/* Shine effect on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{x: "-100%"}}
                    whileHover={{x: "100%"}}
                    transition={{duration: 0.6}}
                />

                {/* Content */}
                <div className="relative flex items-center gap-2">
                    <span className="font-medium text-white text-sm">
                        {skill.name}
                    </span>
                    {skill.yearsOfExperience && (
                        <span className="text-xs text-white/80 font-mono">
                            {skill.yearsOfExperience}y
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/* -----------------------------
    Category Card Component
 ------------------------------ */
const CategoryCard = ({category, index}: { category: SkillCategory; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1}}
            className="card-neumorphic overflow-hidden"
        >
            {/* Header */}
            <motion.div
                className="p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{scale: 1.01}}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <motion.div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}
                            whileHover={{rotate: 360, scale: 1.1}}
                            transition={{duration: 0.6}}
                        >
                            {category.icon}
                        </motion.div>

                        {/* Title & Description */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{category.category}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                            <p className="text-xs text-accent mt-1">
                                {category.skills.length} skills
                            </p>
                        </div>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                        animate={{rotate: isExpanded ? 180 : 0}}
                        transition={{duration: 0.3}}
                        className="text-muted-foreground"
                    >
                        <svg
                            width="20"
                            height="20"
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

            {/* Skills chips */}
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{duration: 0.3}}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 bg-secondary/20">
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                            <SkillChip
                                key={skill.name}
                                skill={skill}
                                index={i}
                                categoryColor={category.color}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* -----------------------------
    Stats Card Component
 ------------------------------ */
const StatCard = (
    {
        label,
        value,
        icon,
        imagePath,
        delay
    }: {
        label: string;
        value: string | number;
        icon?: string;
        imagePath?: string;
        color: string;
        delay: number;
    }) => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay}}
            className="card-neumorphic p-6 text-center"
            whileHover={{scale: 1.05}}
        >
            <motion.div
                className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center p-3`}
                whileHover={{rotate: 360}}
                transition={{duration: 0.6}}
            >
                {imagePath ? (
                    <img
                        src={imagePath}
                        alt={label}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <span className="text-2xl">{icon}</span>
                )}
            </motion.div>
            <motion.p
                className="text-3xl font-bold text-foreground mb-1"
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{delay: delay + 0.2, type: "spring"}}
            >
                {value}
            </motion.p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </motion.div>
    );
};

/* -----------------------------
    Main Expertise Component
 ------------------------------ */
export const ExpertiseShowcase = () => {
    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="max-w-6xl mx-auto"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1}}
            >
                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        className="text-4xl font-bold mb-2"
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                    >
                        My Expertise
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        Skills, tools, and technologies I work with
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    <StatCard
                        label="Total Skills"
                        value={getTotalSkills()}
                        imagePath="/expertise/skills.png"
                        color="from-blue-500 to-cyan-500"
                        delay={0.3}
                    />
                    <StatCard
                        label="Avg Experience"
                        value={`${getAverageExperience()}y`}
                        imagePath="/expertise/year-of-experience.png"
                        color="from-green-500 to-emerald-500"
                        delay={0.4}
                    />
                    <StatCard
                        label="Categories"
                        value={expertise.length}
                        imagePath="/expertise/categories.png"
                        color="from-purple-500 to-pink-500"
                        delay={0.5}
                    />
                </div>

                {/* Categories */}
                <div className="space-y-6">
                    {expertise.map((category, index) => (
                        <CategoryCard key={category.category} category={category} index={index}/>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                >
                    <p className="text-sm text-muted-foreground">
                        Click on any category to view detailed skill levels
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};
