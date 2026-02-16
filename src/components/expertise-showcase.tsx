"use client";

import {motion} from "framer-motion";
import {expertise, getAverageExperience, getTotalSkills, type Skill, type SkillCategory} from "@/data/expertise";

const SkillChip = ({skill, index}: { skill: Skill; index: number }) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.02}}
        >
            <div className="skill-chip">
                <span className="skill-name">{skill.name}</span>
                {skill.yearsOfExperience && (
                    <span className="skill-exp">{skill.yearsOfExperience}y</span>
                )}
            </div>
        </motion.div>
    );
};

const CategorySection = ({category, index}: { category: SkillCategory; index: number }) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1, duration: 0.4}}
            className="expertise-category"
        >
            <div className="category-header">
                <div className="category-icon">
                    {category.icon}
                </div>
                <div className="category-info">
                    <h2 className="category-title">{category.category}</h2>
                    <p className="category-desc">{category.description}</p>
                </div>
                <div className="category-count">
                    {category.skills.length} skills
                </div>
            </div>
            
            <div className="skills-grid">
                {category.skills.map((skill, i) => (
                    <SkillChip key={skill.name} skill={skill} index={i} />
                ))}
            </div>
        </motion.section>
    );
};

export const ExpertiseShowcase = () => {
    return (
        <div className="expertise-page">
            <motion.div
                className="expertise-container"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <header className="expertise-header">
                    <motion.h1
                        className="expertise-title"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                    >
                        Expertise
                    </motion.h1>
                    <motion.p
                        className="expertise-subtitle"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        Skills, tools, and technologies I work with
                    </motion.p>
                </header>

                <div className="stats-row">
                    <motion.div
                        className="stat-item"
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.3}}
                    >
                        <span className="stat-value">{getTotalSkills()}</span>
                        <span className="stat-label">Skills</span>
                    </motion.div>
                    <motion.div
                        className="stat-divider"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4}}
                    />
                    <motion.div
                        className="stat-item"
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.4}}
                    >
                        <span className="stat-value">{getAverageExperience()}y</span>
                        <span className="stat-label">Avg Experience</span>
                    </motion.div>
                    <motion.div
                        className="stat-divider"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5}}
                    />
                    <motion.div
                        className="stat-item"
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.5}}
                    >
                        <span className="stat-value">{expertise.length}</span>
                        <span className="stat-label">Categories</span>
                    </motion.div>
                </div>

                <div className="categories-list">
                    {expertise.map((category, index) => (
                        <CategorySection key={category.category} category={category} index={index} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
