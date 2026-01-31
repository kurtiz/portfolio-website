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
/**
 * Work Experience Data
 */
export const workExperiences: WorkExperience[] = [
    {
        company: "OpenSSF",
        position: "Special Interest Group Lead",
        startDate: "Dec 2025",
        location: "Remote",
        type: "Part-time",
        description: "Leading a Special Interest Group focused on open-source security initiatives, collaboration, and community-driven standards within the OpenSSF ecosystem.",
        technologies: ["Open Source Security", "Governance", "Community Leadership"],
    },
    {
        company: "Open Source & Security Africa (OSSAfrica)",
        position: "Co-Founder & Security Lead",
        startDate: "Oct 2025",
        location: "Hybrid · Ghana",
        type: "Full-time",
        roles: [
            {
                position: "Security Lead",
                startDate: "Nov 2025",
                description: "Leading security operations, governance, and security-focused initiatives across the OSSAfrica community.",
                technologies: [
                    "Security Operations",
                    "Security Operations Management",
                    "Open Source Security",
                ],
            },
            {
                position: "Co-Founder",
                startDate: "Oct 2025",
                description:
                    "Co-founded a community focused on open-source and security awareness and capacity building in Africa. Lead strategic partnerships, community growth, governance, documentation, and contributor onboarding across Africa and EMEA.",
                technologies: [
                    "Open-Source Development",
                    "Community Building",
                    "Governance",
                    "Start-up Leadership",
                ],
            },
        ],
    },
    {
        company: "AmaliTech",
        position: "Cyber Security Analyst",
        startDate: "Oct 2024",
        location: "Accra, Greater Accra Region, Ghana",
        type: "Full-time",
        roles: [
            {
                position: "Cyber Security Analyst",
                startDate: "Sep 2025",
                description:
                    "Performing security monitoring, incident response, and operational security analysis to support enterprise systems.",
                technologies: [
                    "Penetration Testing",
                    "SIEM",
                    "Incident Response",
                    "Security Monitoring",
                    "Threat Analysis",
                ],
            },
            {
                position: "Junior Cyber Security Analyst",
                startDate: "Dec 2024",
                endDate: "Sep 2025",
                description:
                    "Supported security operations, vulnerability analysis, and monitoring activities under senior analysts.",
                technologies: [
                    "Security Operations",
                    "Vulnerability Assessment",
                    "Log Analysis",
                ],
            },
            {
                position: "Junior DevOps Engineer",
                startDate: "Oct 2024",
                endDate: "Dec 2024",
                description:
                    "Supported security operations, vulnerability analysis, and monitoring activities under senior analysts.",
                technologies: [
                    "Security Operations",
                    "Vulnerability Assessment",
                    "Log Analysis",
                ],
            },
        ],
    },
    {
        company: "The Digicoast",
        position: "Senior Software Engineer",
        startDate: "Mar 2025",
        endDate: "Jan 2026",
        location: "Oyarifa, Greater Accra, Ghana · Hybrid",
        type: "Part-time",
        description:
            "Designing and maintaining secure, scalable software systems with a strong focus on infrastructure and application security.",
        technologies: [
            "Software Architecture",
            "System Design",
            "Security Engineering",
            "Backend Development",
        ],
    },
    {
        company: "Empire DHV",
        position: "Chief Technology Officer",
        startDate: "Jun 2024",
        endDate: "Dec 2024",
        location: "Accra, Greater Accra Region, Ghana",
        type: "Part-time",
        description:
            "Led technical strategy, system architecture, and engineering decisions for business technology solutions.",
        technologies: [
            "Technical Leadership",
            "System Architecture",
            "Product Engineering",
        ],
    },
    {
        company: "247 Technologies Consortium",
        position: "Lead Software Engineer",
        startDate: "Jan 2018",
        endDate: "Feb 2024",
        location: "Greater Accra Region, Ghana",
        type: "Part-time",
        description:
            "Led development teams in building and maintaining web and mobile applications, while mentoring engineers and managing technical delivery.",
        technologies: [
            "PHP",
            "Flutter",
            "Backend Development",
            "Team Leadership",
        ],
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
