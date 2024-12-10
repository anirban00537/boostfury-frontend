import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import HeroVideoDialog from "../ui/hero-video-dialog";

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

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const stats = [
  { number: "10k+", label: "Active Users" },
  { number: "93%", label: "Engagement Rate" },
  { number: "2.5M", label: "Posts Generated" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-white">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] bg-primary/20 opacity-20 blur-[100px]" />
      <div className="absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] bg-primary/20 opacity-20 blur-[100px]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <motion.div 
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-[0_2px_8px_rgba(var(--primary-rgb),0.1)]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                New: AI Post Generator v2.0
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <motion.h1
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Create{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
                Viral
              </span>{" "}
              LinkedIn Content in Minutes
            </motion.h1>

            <motion.p
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto text-xl text-gray-600 mb-8"
            >
              Transform your LinkedIn presence with AI-generated content that drives engagement. Save hours of work and{" "}
              <span className="font-semibold text-primary">10x your reach</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link 
                href="/ai-writer" 
                className="group inline-flex items-center justify-center relative"
              >
                <div className="absolute -inset-[2px] bg-gradient-to-r from-primary to-primary/80 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-200" />
                <div className="relative px-8 py-4 bg-primary rounded-lg font-medium text-white flex items-center gap-2 transition-transform duration-200 group-hover:scale-[1.02]">
                  Start Creating Free
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <HeroVideoDialog
                className="inline-flex"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/4pgUovPcVBM"
                thumbnailSrc="/demo.png"
                thumbnailAlt="Watch demo"
                buttonClassName="group"
                buttonContent={
                  <div className="px-8 py-4 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center gap-2 transition-transform duration-200 group-hover:scale-[1.02] hover:border-primary/20">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-primary border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                    <span className="text-gray-700">Watch Demo</span>
                  </div>
                }
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Product Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden bg-white p-2 border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <Image
                  src="/demo.png"
                  alt="BoostFury LinkedIn Content Creator"
                  width={1200}
                  height={800}
                  className="rounded-lg shadow-sm"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
