import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "../magicui/Animated-Shiny-Text.comp";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/Shimmer-Button.comp";
import HeroVideoDialog from "../ui/hero-video-dialog";
import Image from "next/image"; // Added for optimized images

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Updated people array with new descriptions
const people = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "LinkedIn Strategist",
    image: "/persons/person-1.jpeg",
    alt: "Sarah Johnson - LinkedIn Growth Expert using BoostFury",
  },
  {
    id: 2,
    name: "Emma Thompson",
    designation: "Personal Branding Coach",
    image: "/persons/person-2.jpeg",
    alt: "Emma Thompson - Personal Branding Expert creating LinkedIn content",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "B2B Marketing Consultant",
    image: "/persons/person-3.jpeg",
    alt: "Michael Chen - B2B Marketing Specialist using AI for LinkedIn growth",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "Thought Leadership Advisor",
    image: "/persons/person-4.jpeg",
    alt: "David Rodriguez - Thought Leadership and LinkedIn Content Strategist",
  },
  {
    id: 5,
    name: "Olivia Parker",
    designation: "LinkedIn Content Creator",
    image: "/persons/person-5.jpeg",
    alt: "Olivia Parker - Professional LinkedIn Content Creator",
  },
  {
    id: 6,
    name: "Sophia Lee",
    designation: "LinkedIn Growth Hacker",
    image: "/persons/person-6.jpeg",
    alt: "Sophia Lee - LinkedIn Growth and Engagement Specialist",
  },
];

// Enhanced with more relevant professional titles based on target audience
const platforms = [
  {
    name: "LinkedIn",
    gradient: "from-[#0077B5] to-[#0A66C2]",
    description: "Professional networking carousels",
  },
  {
    name: "TikTok",
    gradient: "from-[#00F2EA] to-[#FF0050]",
    description: "Viral slide decks",
  },
  {
    name: "Instagram",
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    description: "Engaging carousel posts",
  },
];

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const heroTextChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Hero = () => {
  const [currentPlatform, setCurrentPlatform] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="py-10 sm:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // Added semantic HTML attributes
      role="banner"
      aria-label="Main hero section"
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="space-y-6 sm:space-y-8 w-full"
          variants={textContainerVariants}
        >
          {/* Updated announcement banner */}
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-borderColor bg-cardBackground text-sm sm:text-base !text-textColor transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              role="button"
              aria-label="Feature announcement"
            >
              <AnimatedShinyText className="inline-flex text-textColor items-center justify-center px-3 sm:px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="hidden sm:inline">
                  Spend 10 Minutes to prepare weeks of content
                </span>
                <ArrowRightIcon
                  className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </AnimatedShinyText>
            </div>
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center text-textColor"
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-block mb-2 sm:mb-4"
              variants={heroTextChildVariants}
            >
              <span className="inline-block">
                Grow{" "}
                <span className="inline-block text-transparent bg-clip-text bg-[#0077B5]">
                  LinkedIn
                </span>{" "}
              </span>
            </motion.div>
            <br />
            <motion.div
              className="inline-block"
              variants={heroTextChildVariants}
            >
              <span className="inline-block">Audience</span>{" "}
              <span className="inline-block">Faster With</span>{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500  to-primary">
                AI
              </span>
            </motion.div>
          </motion.h1>

          {/* Updated subheading */}
          <motion.p
            className="text-xl sm:text-2xl font-medium text-textColor/70 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Supercharge your LinkedIn growth with AI , Spend minutes to prepare
            weeks of content
          </motion.p>

          {/* Updated CTA section */}
          <div className="z-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/ai-writer"
              aria-label="Start creating your LinkedIn carousel"
              className="w-full sm:w-auto"
            >
              <ShimmerButton
                className="shadow-2xl w-full sm:w-auto"
                background="#3369E7"
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Get Started - 7 Days Free Trial
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="https://www.linkedin.com/in/anirban00537/"
              className="bg-background/50 backdrop-blur-sm h-[59px] w-[290px] rounded-full border-4 border-borderColor flex items-center justify-center px-4 py-2 text-textColor transition-all duration-300 hover:scale-105"
              aria-label="Connect for LinkedIn growth strategies"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-textColor">Contact for SaaS Development</div>
            </a>
          </div>
        </motion.div>

        {/* Updated social proof section */}
        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
          <h2 className="text-textColor/70 mb-4 text-lg">
            Empowering 10,000+ LinkedIn Professionals to Amplify Their Influence
          </h2>
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
            role="list"
            aria-label="Featured LinkedIn influencers"
          >
            <AnimatedTooltip items={people} />
          </div>
        </div>

        {/* Updated video section */}
        <div
          className="relative w-full max-w-7xl mx-auto mt-8 sm:mt-12"
          role="complementary"
          aria-label="LinkedIn growth strategy demonstration"
        >
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Watch how to boost your LinkedIn presence with AI-powered carousels"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Discover LinkedIn growth strategies with AI carousels - Dark Mode"
          />
        </div>

        {/* Updated structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BoostFury LinkedIn Growth Tool",
            applicationCategory: "BusinessApplication, SocialMedia",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "10000",
            },
          })}
        </script>
      </div>
    </motion.section>
  );
};

export default Hero;
