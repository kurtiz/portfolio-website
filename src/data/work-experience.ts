export interface Role {
    position: string;
    startDate: string;
    endDate?: string; // undefined means current position
    description?: string;
    technologies?: string[];
}

export interface WorkExperience {
    company: string;
    position: string; // Used if no roles array (single position)
    startDate: string;
    endDate?: string; // undefined means current position
    description?: string;
    technologies?: string[];
    logo?: string; // Optional: path to company logo
    location?: string; // Optional: work location
    type?: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
    roles?: Role[]; // Multiple roles within same company (promotions/transfers)
}

/**
 * Work Experience Data
 * 
 * Instructions:
 * - Add your work experiences in reverse chronological order (newest first)
 * - Leave `endDate` undefined for current positions (will show green "Current" badge)
 * - Use consistent date format (e.g., "Jan 2024", "January 2024", etc.)
 * - Add technologies you used in each role
 * - Keep descriptions concise but informative
 */
export const workExperiences: WorkExperience[] = [
    {
        company: "Tech Corp",
        position: "Senior Full-Stack Developer", // Overall position (used if no roles)
        startDate: "Jun 2022", // Company start date
        // endDate: undefined, // Current position - green dot will show
        location: "San Francisco, CA",
        type: "Full-time",
        // Multiple roles within the same company (promotions/transfers)
        roles: [
            {
                position: "Senior Full-Stack Developer",
                startDate: "Jan 2024",
                // endDate: undefined, // Current role
                description: "Leading development of cloud-native applications. Mentoring junior developers and architecting scalable solutions.",
                technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
            },
            {
                position: "Full-Stack Developer",
                startDate: "Jun 2022",
                endDate: "Dec 2023",
                description: "Built and maintained multiple web applications. Implemented CI/CD pipelines and improved deployment processes.",
                technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"],
            },
        ],
    },
    {
        company: "StartupXYZ",
        position: "Full-Stack Developer",
        startDate: "Jun 2022",
        endDate: "Dec 2023",
        description: "Built and maintained multiple web applications. Implemented CI/CD pipelines and improved deployment processes by 40%.",
        technologies: ["Next.js", "Express", "MongoDB", "Docker", "GitHub Actions"],
        location: "Remote",
        type: "Full-time",
    },
    {
        company: "Digital Agency",
        position: "Frontend Developer",
        startDate: "Mar 2021",
        endDate: "May 2022",
        description: "Developed responsive web applications for various clients. Collaborated with designers to implement pixel-perfect UIs and improve user experience.",
        technologies: ["React", "Tailwind CSS", "JavaScript", "Figma", "Git"],
        location: "New York, NY",
        type: "Full-time",
    },
    {
        company: "Freelance",
        position: "Web Developer",
        startDate: "Jan 2020",
        endDate: "Feb 2021",
        description: "Worked with multiple clients to build custom websites and web applications. Managed projects from conception to deployment.",
        technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
        location: "Remote",
        type: "Freelance",
    },
];

/**
 * Calculate total years of experience
 */
export const getTotalYearsOfExperience = (): number => {
    if (workExperiences.length === 0) return 0;
    
    const oldestExperience = workExperiences[workExperiences.length - 1];
    const startYear = new Date(oldestExperience.startDate).getFullYear();
    const currentYear = new Date().getFullYear();
    
    return currentYear - startYear;
};

/**
 * Get current positions
 */
export const getCurrentPositions = (): WorkExperience[] => {
    return workExperiences.filter(exp => !exp.endDate);
};

/**
 * Get all unique technologies used across all positions
 */
export const getAllTechnologies = (): string[] => {
    const techSet = new Set<string>();
    workExperiences.forEach(exp => {
        exp.technologies?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
};
