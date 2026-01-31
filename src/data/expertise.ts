export interface Skill {
    name: string;
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
 * Organize your skills by category
 * Add years of experience to show your expertise level
 */
export const expertise: SkillCategory[] = [
    {
        category: "Frontend Development",
        description: "Building beautiful, responsive user interfaces",
        icon: "🎨",
        color: "from-blue-500 to-cyan-500",
        skills: [
            { name: "React", yearsOfExperience: 5 },
            { name: "Next.js", yearsOfExperience: 3 },
            { name: "TypeScript", yearsOfExperience: 4 },
            { name: "Tailwind CSS", yearsOfExperience: 3 },
            { name: "JavaScript", yearsOfExperience: 6 },
            { name: "HTML/CSS", yearsOfExperience: 6 },
            { name: "Framer Motion", yearsOfExperience: 2 },
            { name: "Vue.js", yearsOfExperience: 2 },
        ],
    },
    {
        category: "Backend Development",
        description: "Scalable server-side applications and APIs",
        icon: "⚙️",
        color: "from-green-500 to-emerald-500",
        skills: [
            { name: "Node.js", yearsOfExperience: 5 },
            { name: "Express.js", yearsOfExperience: 4 },
            { name: "Hono", yearsOfExperience: 1 },
            { name: "PostgreSQL", yearsOfExperience: 4 },
            { name: "MongoDB", yearsOfExperience: 3 },
            { name: "REST APIs", yearsOfExperience: 5 },
            { name: "GraphQL", yearsOfExperience: 2 },
            { name: "Python", yearsOfExperience: 3 },
        ],
    },
    {
        category: "DevOps & Cloud",
        description: "Infrastructure, deployment, and automation",
        icon: "☁️",
        color: "from-purple-500 to-pink-500",
        skills: [
            { name: "Docker", yearsOfExperience: 3 },
            { name: "AWS", yearsOfExperience: 3 },
            { name: "Cloudflare", yearsOfExperience: 2 },
            { name: "CI/CD", yearsOfExperience: 3 },
            { name: "GitHub Actions", yearsOfExperience: 2 },
            { name: "Vercel", yearsOfExperience: 3 },
            { name: "Linux", yearsOfExperience: 4 },
        ],
    },
    {
        category: "Mobile Development",
        description: "Cross-platform mobile applications",
        icon: "📱",
        color: "from-orange-500 to-red-500",
        skills: [
            { name: "React Native", yearsOfExperience: 3 },
            { name: "Expo", yearsOfExperience: 2 },
            { name: "iOS Development", yearsOfExperience: 2 },
            { name: "Android Development", yearsOfExperience: 2 },
        ],
    },
    {
        category: "Tools & Workflow",
        description: "Development tools and productivity",
        icon: "🛠️",
        color: "from-yellow-500 to-amber-500",
        skills: [
            { name: "Git", yearsOfExperience: 6 },
            { name: "VS Code", yearsOfExperience: 6 },
            { name: "Figma", yearsOfExperience: 3 },
            { name: "Postman", yearsOfExperience: 4 },
            { name: "Jira", yearsOfExperience: 3 },
            { name: "Notion", yearsOfExperience: 2 },
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
 * Get skills with most experience
 */
export const getTopSkills = (count: number = 10): Skill[] => {
    return getAllSkills()
        .filter(skill => skill.yearsOfExperience)
        .sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0))
        .slice(0, count);
};

/**
 * Get skills by minimum years of experience
 */
export const getSkillsByExperience = (minYears: number): Skill[] => {
    return getAllSkills().filter(skill => (skill.yearsOfExperience || 0) >= minYears);
};

/**
 * Calculate average years of experience
 */
export const getAverageExperience = (): number => {
    const skillsWithExp = getAllSkills().filter(s => s.yearsOfExperience);
    if (skillsWithExp.length === 0) return 0;
    const total = skillsWithExp.reduce((sum, skill) => sum + (skill.yearsOfExperience || 0), 0);
    return Math.round(total / skillsWithExp.length);
};

/**
 * Get total number of skills
 */
export const getTotalSkills = (): number => {
    return getAllSkills().length;
};
