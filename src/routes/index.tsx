import {createFileRoute} from '@tanstack/react-router'
import {motion, type Variants} from "framer-motion";
import {Header} from "@/components/header.tsx";
import {BlogCard} from "@/components/cards/blog-card.tsx";
import {SecurityLabCard} from "@/components/cards/security-lab-card.tsx";
import {FeaturedProjectCard} from "@/components/cards/featured-project-card.tsx";
import {ReceiptLogCard} from "@/components/cards/receipt-log-card.tsx";
import {SocialCard} from "@/components/cards/social-card.tsx";
import {SkillsCard} from "@/components/cards/skills-card.tsx";
import {LocationCard} from "@/components/cards/location-card.tsx";
import {AvailabilityCard} from "@/components/cards/availability-card.tsx";
import {WorkExperienceCard} from "@/components/cards/work-experience-card.tsx";

export const Route = createFileRoute('/')({component: App});

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

function App() {
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
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Blog Card - 1x1 */}
                    <motion.div variants={itemVariants} className="col-span-2 sm:col-span-2 md:col-span-1 row-span-1">
                        <BlogCard/>
                    </motion.div>

                    {/* Featured Project - 2x2 */}
                    <motion.div variants={itemVariants} className="col-span-2 row-span-2">
                        <FeaturedProjectCard/>
                    </motion.div>

                    {/* Location Card - 1x1 */}
                    <motion.div variants={itemVariants} className="col-span-1 row-span-1">
                        <LocationCard/>
                    </motion.div>

                    {/* Security Lab - 1x2 tall */}
                    <motion.div variants={itemVariants} className="col-span-1 row-span-2">
                        <SecurityLabCard/>
                    </motion.div>

                    {/* Social Card - 1x1 */}
                    <motion.div variants={itemVariants} className="col-span-1 row-span-1">
                        <SocialCard/>
                    </motion.div>

                    {/* Skills Card - 2x1 wide */}
                    <motion.div variants={itemVariants} className="col-span-2 row-span-1">
                        <SkillsCard/>
                    </motion.div>

                    {/* Work Experience - 1x2 tall */}
                    <motion.div variants={itemVariants} className="col-span-1 row-span-2">
                        <WorkExperienceCard/>
                    </motion.div>

                    {/* Availability Card - 1x1 */}
                    <motion.div variants={itemVariants} className="col-span-1 row-span-1">
                        <AvailabilityCard/>
                    </motion.div>

                    {/* Receipt Log - 2x1 wide */}
                    <motion.div variants={itemVariants} className="col-span-2 sm:col-span-2 row-span-1">
                        <ReceiptLogCard/>
                    </motion.div>

                    {/* Empty decorative card */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 row-span-1 card-inset flex items-center justify-center"
                    >
                        <span className="font-mono text-xs text-muted-foreground">
                          more coming soon...
                        </span>
                    </motion.div>
                </motion.div>

                <motion.footer
                    className="mt-10 pt-6 border-t border-border text-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1}}
                >
                    <p className="font-mono text-xs text-muted-foreground">
                        © 2024 Aaron Will Djaba — built with care
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    )
}
