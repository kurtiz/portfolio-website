export interface Skill {
    name: string;
    level: number; // 1-100 proficiency
    yearsOfExperience?: number;
    icon?: string; // Optional emoji or icon
}

export interface SkillCategory {
    category: string;
    description: string;
    icon: string;
    color: string; // Tailwind color class
    skills: Skill[];
}

/**
 * Expertise & Skills Data
 * 
 * Organize your skills by category with proficiency levels
 * Level: 1-100 (Beginner: 1-30, Intermediate: 31-70, Expert: 71-100)
 */
export const expertise: SkillCategory[] = [
    {
        category: "Frontend Development",
        description: "Building beautiful, responsive user interfaces",
        icon: "🎨",
        color: "from-blue-500 to-cyan-500",
        skills: [
            { name: "React", level: 95, yearsOfExperience: 5 },
            { name: "Next.js", level: 90, yearsOfExperience: 3 },
            { name: "TypeScript", level: 90, yearsOfExperience: 4 },
            { name: "Tailwind CSS", level: 95, yearsOfExperience: 3 },
            { name: "JavaScript", level: 95, yearsOfExperience: 6 },
            { name: "HTML/CSS", level: 98, yearsOfExperience: 6 },
            { name: "Framer Motion", level: 85, yearsOfExperience: 2 },
            { name: "Vue.js", level: 75, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Backend Development",
        description: "Scalable server-side applications and APIs",
        icon: "⚙️",
        color: "from-green-500 to-emerald-500",
        skills: [
            { name: "Node.js", level: 90, yearsOfExperience: 5 },
            { name: "Express.js", level: 88, yearsOfExperience: 4 },
            { name: "Hono", level: 85, yearsOfExperience: 1 },
            { name: "PostgreSQL", level: 85, yearsOfExperience: 4 },
            { name: "MongoDB", level: 80, yearsOfExperience: 3 },
            { name: "REST APIs", level: 92, yearsOfExperience: 5 },
            { name: "GraphQL", level: 75, yearsOfExperience: 2 },
            { name: "Python", level: 70, yearsOfExperience: 3 },
        ],
    },
    {
        category: "DevOps & Cloud",
        description: "Infrastructure, deployment, and automation",
        icon: "☁️",
        color: "from-purple-500 to-pink-500",
        skills: [
            { name: "Docker", level: 85, yearsOfExperience: 3 },
            { name: "AWS", level: 80, yearsOfExperience: 3 },
            { name: "Cloudflare", level: 85, yearsOfExperience: 2 },
            { name: "CI/CD", level: 82, yearsOfExperience: 3 },
            { name: "GitHub Actions", level: 85, yearsOfExperience: 2 },
            { name: "Vercel", level: 90, yearsOfExperience: 3 },
            { name: "Linux", level: 75, yearsOfExperience: 4 },
        ],
    },
    {
        category: "Mobile Development",
        description: "Cross-platform mobile applications",
        icon: "📱",
        color: "from-orange-500 to-red-500",
        skills: [
            { name: "React Native", level: 85, yearsOfExperience: 3 },
            { name: "Expo", level: 80, yearsOfExperience: 2 },
            { name: "iOS Development", level: 70, yearsOfExperience: 2 },
            { name: "Android Development", level: 70, yearsOfExperience: 2 },
        ],
    },
    {
        category: "Tools & Workflow",
        description: "Development tools and productivity",
        icon: "🛠️",
        color: "from-yellow-500 to-amber-500",
        skills: [
            { name: "Git", level: 95, yearsOfExperience: 6 },
            { name: "VS Code", level: 98, yearsOfExperience: 6 },
            { name: "Figma", level: 85, yearsOfExperience: 3 },
            { name: "Postman", level: 90, yearsOfExperience: 4 },
            { name: "Jira", level: 80, yearsOfExperience: 3 },
            { name: "Notion", level: 85, yearsOfExperience: 2 },
        ],
    },
];

/**
 * Get all skills across all categories
 */
export const getAllSkills = (): Skill[] => {
    return expertise.flatMap(category => category.skills);
};

/**
 * Get top skills by proficiency level
 */
export const getTopSkills = (count: number = 10): Skill[] => {
    return getAllSkills()
        .sort((a, b) => b.level - a.level)
        .slice(0, count);
};

/**
 * Get skills by proficiency level
 */
export const getSkillsByLevel = (minLevel: number): Skill[] => {
    return getAllSkills().filter(skill => skill.level >= minLevel);
};

/**
 * Calculate average proficiency across all skills
 */
export const getAverageProficiency = (): number => {
    const skills = getAllSkills();
    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / skills.length);
};

/**
 * Get total number of skills
 */
export const getTotalSkills = (): number => {
    return getAllSkills().length;
};
