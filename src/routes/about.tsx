import {createFileRoute} from '@tanstack/react-router';
import {Header} from '@/components/header';
import {motion} from 'framer-motion';
import {MapPin, Mail, Github, Linkedin, Twitter, Award, Shield, Code, Cloud} from 'lucide-react';
import {siteConfig} from '@/lib/seo';

export const Route = createFileRoute('/about')({
    component: AboutPage,
    head: () => {
        return {
            title: `About | ${siteConfig.author.name}`,
            meta: [
                {name: 'description', content: `Learn more about ${siteConfig.author.name} - Full-Stack Engineer and Cyber Security Analyst from Accra, Ghana.`},
            ],
        };
    },
});

const twitterHandle = siteConfig.author.twitter?.replace('@', '') || 'aaronwilldjaba';

const socialLinks = [
    {icon: Github, href: `https://github.com/${siteConfig.author.github}`, label: 'GitHub'},
    {icon: Linkedin, href: siteConfig.author.linkedin, label: 'LinkedIn'},
    {icon: Twitter, href: `https://twitter.com/${twitterHandle}`, label: 'Twitter'},
    {icon: Mail, href: `mailto:${siteConfig.author.email}`, label: 'Email'},
];

const certifications = [
    {
        issuer: 'AWS',
        icon: Cloud,
        items: [
            {name: 'AWS Certified Cloud Practitioner', year: '2025'},
        ],
    },
    {
        issuer: 'CyberTalents',
        icon: Shield,
        items: [
            {name: 'Security Blue Team Scholarship', year: '2023'},
            {name: 'Intro to CyberSecurity Bootcamp', year: '2022'},
        ],
    },
    {
        issuer: 'Security Blue Team',
        icon: Shield,
        items: [
            {name: 'Introduction to Digital Forensics', year: '2023'},
        ],
    },
    {
        issuer: 'IBM',
        icon: Code,
        items: [
            {name: 'API', year: '2022'},
            {name: 'Cyber Security', year: '2022'},
            {name: 'Python', year: '2022'},
            {name: 'Web Development', year: '2022'},
            {name: 'Web Security', year: '2022'},
        ],
    },
];

function AboutPage() {
    return (
        <div className="min-h-screen bg-canvas py-8 px-4 sm:py-12">
            <motion.div
                className="floating-container max-w-5xl mx-auto p-6 sm:p-10"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <Header/>

                <motion.div
                    className="mt-8"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.5}}
                >
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                        <div className="w-32 h-32 rounded-full bg-muted overflow-hidden shrink-0">
                            <img
                                src="/images/profile.jpg"
                                alt={siteConfig.author.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="w-full h-full hidden flex items-center justify-center bg-muted">
                                <span className="text-4xl font-bold text-muted-foreground">
                                    {siteConfig.author.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        </div>

                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl font-bold">{siteConfig.author.name}</h1>
                            <p className="font-mono text-sm text-muted-foreground mt-2">
                                Full-Stack Engineer & Cyber Security Analyst
                            </p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 font-mono text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3"/>
                                    Accra, Ghana
                                </span>
                                <span>•</span>
                                <span>GCTU Graduate 2024</span>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-6 mb-10">
                        <div>
                            <h2 className="text-lg font-semibold mb-3">About Me</h2>
                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    I bridge the gap between robust software engineering and proactive security.
                                    I build high-performance, secure-by-design applications and am passionate about
                                    fostering the next generation of technical talent in Africa.
                                </p>
                                <p>
                                    As a Security Software Engineer at AmaliTech Cyber Security, I specialize in
                                    vulnerability assessment and penetration testing (VAPT), applying a
                                    &quot;Red Team&quot; mindset to ensure production code is hardened against modern exploits.
                                </p>
                                <p>
                                    My expertise spans full-stack development with React, TypeScript, and Node.js,
                                    secure authentication systems, mobile app development, and building scalable
                                    cloud-native applications on platforms like Cloudflare Workers.
                                </p>
                            </div>
                        </div>

                        {/* What I'm Building */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">What I&apos;m Building</h2>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-accent">→</span>
                                    <span>
                                        <strong className="text-foreground">VedaTrace</strong> — A simplified,
                                        developer-first observability tool for log management and error tracking.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent">→</span>
                                    <span>
                                        <strong className="text-foreground">bVault.js</strong> — A lightweight,
                                        secure JavaScript utility for handling sensitive data storage.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-accent">→</span>
                                    <span>
                                        <strong className="text-foreground">OSSAfrica</strong> — Co-Founder and
                                        SIG Lead of a growing global community focused on Open Source and
                                        Security in Africa.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Skills & Expertise */}
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Core Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'React & TypeScript',
                                    'Node.js',
                                    'Cyber Security',
                                    'Penetration Testing',
                                    'Cloudflare Workers',
                                    'AWS',
                                    'DevOps',
                                    'Mobile Development',
                                    'Open Source',
                                    'Secure Architecture',
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="font-mono text-xs bg-secondary px-3 py-1.5 rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Licenses & Certifications */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-accent"/>
                                Licenses & Certifications
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {certifications.map((cert) => (
                                    <div
                                        key={cert.issuer}
                                        className="card-inset p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-3">
                                            <cert.icon className="w-4 h-4 text-accent"/>
                                            <span className="font-semibold text-sm">{cert.issuer}</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {cert.items.map((item) => (
                                                <li
                                                    key={item.name}
                                                    className="flex items-center justify-between text-sm"
                                                >
                                                    <span className="text-muted-foreground">{item.name}</span>
                                                    <span className="font-mono text-xs text-muted-foreground/60">
                                                        {item.year}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                        <div className="card-inset p-4 text-center">
                            <p className="text-2xl font-bold">87</p>
                            <p className="font-mono text-xs text-muted-foreground">Repositories</p>
                        </div>
                        <div className="card-inset p-4 text-center">
                            <p className="text-2xl font-bold">206</p>
                            <p className="font-mono text-xs text-muted-foreground">Stars</p>
                        </div>
                        <div className="card-inset p-4 text-center">
                            <p className="text-2xl font-bold">1.2K+</p>
                            <p className="font-mono text-xs text-muted-foreground">LinkedIn</p>
                        </div>
                        <div className="card-inset p-4 text-center">
                            <p className="text-2xl font-bold">80</p>
                            <p className="font-mono text-xs text-muted-foreground">Followers</p>
                        </div>
                    </div>

                    {/* Connect */}
                    <div className="border-t border-border pt-6">
                        <h2 className="text-lg font-semibold mb-4">Let&apos;s Connect</h2>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(({icon: Icon, href, label}) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-sm bg-secondary hover:bg-secondary/80 px-4 py-2.5 rounded-lg transition-colors"
                                >
                                    <Icon className="w-4 h-4"/>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.footer
                    className="mt-10 pt-6 border-t border-border text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5}}
                >
                    <p className="font-mono text-xs text-muted-foreground">
                        © {new Date().getFullYear()} {siteConfig.author.name} — built with care
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    );
}
