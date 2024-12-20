import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import HeroVideoDialog from "../ui/hero-video-dialog";

const BackgroundPattern = () => {
  return (
    <>
      {/* Subtle Animated Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, white 70%)",
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-[2px] rounded-full"
            style={{
              background: i % 2 === 0 ? "#0A66C2" : "#000000",
              opacity: 0.07,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute size-[800px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle at center, #0A66C2 0%, transparent 70%)",
            top: '10%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute size-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle at center, #000000 0%, transparent 70%)",
            bottom: '10%',
            right: '20%',
            transform: 'translate(50%, 50%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <BackgroundPattern />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8"
          >
            <h1 className="text-[clamp(3rem,7vw,5rem)] leading-[1.1] font-bold tracking-tight">
              <span className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Create Viral{" "}
              </span>
              <span className="text-[#0A66C2] relative">
                LinkedIn{" "}
                <motion.div
                  className="absolute -inset-2 bg-[#0A66C2]/5 blur-xl rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="relative bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Content in Minutes{" "}
              </span>
              <span className="text-primary font-semibold relative">
                with AI
                <motion.div
                  className="absolute -inset-2 bg-primary/5 blur-xl rounded-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto font-medium"
          >
            Transform your LinkedIn presence with AI-powered content that{" "}
            <span className="relative inline-block group">
              <span className="relative z-10 font-bold text-gray-900">
                drives engagement
                <motion.div
                  className="absolute bottom-0 left-0 h-[6px] w-full bg-[#0A66C2]/10 -rotate-1"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </span>
            </span>
            . Save hours of work and generate content that{" "}
            <span className="relative inline-block group">
              <span className="relative z-10 font-bold text-gray-900">
                converts
                <motion.div
                  className="absolute bottom-0 left-0 h-[6px] w-full bg-primary/10 -rotate-1"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                />
              </span>
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            {/* Start Creating Button */}
            <Link
              href="/ai-writer"
              className="group inline-flex items-center justify-center relative"
            >
              <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-800 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-8 py-4 bg-gray-900 rounded-xl font-semibold text-white flex items-center gap-2 transition-all duration-200 group-hover:scale-[1.02]">
                <span>Start Creating Free</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Watch Demo Button */}
            <HeroVideoDialog
              className="inline-flex"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/4pgUovPcVBM"
              thumbnailSrc="/demo.png"
              thumbnailAlt="Watch demo"
              buttonClassName="group"
              buttonContent={
                <div className="relative">
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl opacity-75 group-hover:opacity-100 transition duration-200" />
                  <div className="relative px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50/80 transition-colors flex items-center gap-2">
                    <div className="size-5 rounded-full bg-gray-100/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-gray-900 border-b-[5px] border-b-transparent ml-0.5" />
                    </div>
                    Watch Demo
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>

      {/* Enhanced bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div 
          className="h-px"
          style={{
            background: "linear-gradient(to right, transparent, rgb(0 0 0 / 0.1), transparent)"
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scaleX: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
