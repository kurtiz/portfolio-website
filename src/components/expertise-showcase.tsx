"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {
    expertise,
    getAverageProficiency,
    getTotalSkills,
    type SkillCategory,
    type Skill
} from "@/data/expertise";

/* -----------------------------
    Skill Bar Component
 ------------------------------ */
const SkillBar = ({skill, index, categoryColor}: { skill: Skill; index: number; categoryColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getProficiencyLabel = (level: number): string => {
        if (level >= 90) return "Expert";
        if (level >= 70) return "Advanced";
        if (level >= 50) return "Intermediate";
        return "Beginner";
    };

    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.05}}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group"
        >
            {/* Skill name and level */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    {skill.yearsOfExperience && (
                        <span className="text-xs text-muted-foreground">
                            ({skill.yearsOfExperience}y)
                        </span>
                    )}
                </div>
                <motion.span
                    className="text-sm font-semibold text-accent"
                    animate={{scale: isHovered ? 1.1 : 1}}
                >
                    {skill.level}%
                </motion.span>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${categoryColor} rounded-full`}
                    initial={{width: 0}}
                    animate={{width: `${skill.level}%`}}
                    transition={{duration: 1, delay: index * 0.05, ease: "easeOut"}}
                />
                {/* Shine effect on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{x: "-100%"}}
                    animate={{x: isHovered ? "100%" : "-100%"}}
                    transition={{duration: 0.6}}
                />
            </div>

            {/* Proficiency label */}
            <motion.p
                className="text-xs text-muted-foreground mt-1"
                initial={{opacity: 0}}
                animate={{opacity: isHovered ? 1 : 0}}
                transition={{duration: 0.2}}
            >
                {getProficiencyLabel(skill.level)}
            </motion.p>
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

            {/* Skills list */}
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{duration: 0.3}}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 space-y-4 bg-secondary/20">
                    {category.skills.map((skill, i) => (
                        <SkillBar
                            key={skill.name}
                            skill={skill}
                            index={i}
                            categoryColor={category.color}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

/* -----------------------------
    Stats Card Component
 ------------------------------ */
const StatCard = ({
                      label,
                      value,
                      icon,
                      color,
                      delay
                  }: {
    label: string;
    value: string | number;
    icon: string;
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
                className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg`}
                whileHover={{rotate: 360}}
                transition={{duration: 0.6}}
            >
                {icon}
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
                        icon="🎯"
                        color="from-blue-500 to-cyan-500"
                        delay={0.3}
                    />
                    <StatCard
                        label="Avg Proficiency"
                        value={`${getAverageProficiency()}%`}
                        icon="📊"
                        color="from-green-500 to-emerald-500"
                        delay={0.4}
                    />
                    <StatCard
                        label="Categories"
                        value={expertise.length}
                        icon="📚"
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
                        💡 Click on any category to view detailed skill levels
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};
