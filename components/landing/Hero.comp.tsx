import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import HeroVideoDialog from "../ui/hero-video-dialog";

const BackgroundPattern = () => {
  return (
    <>
      {/* Modern Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[10%] -top-[10%] w-[40%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #0A66C2 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.15,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[10%] -bottom-[10%] w-[40%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, #2C8EFF 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.15,
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <BackgroundPattern />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0A66C2]/10 to-[#2C8EFF]/10 border border-[#0A66C2]/20">
              <Sparkles className="w-4 h-4 text-[#0A66C2]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                AI-Powered Content Creation
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-8"
          >
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-bold tracking-tight">
              <span className="relative inline-block">
                Create Viral{" "}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-slate-100 to-slate-200 blur-xl opacity-50 -z-10"
                  animate={{ opacity: [0.5, 0.3, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>{" "}
              <span className="text-[#0A66C2] relative">
                LinkedIn{" "}
                <motion.div
                  className="absolute -inset-1 bg-[#0A66C2]/10 blur-xl -z-10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>{" "}
              <span className="relative inline-block">
                Content in Minutes{" "}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-slate-100 to-slate-200 blur-xl opacity-50 -z-10"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto"
          >
            Transform your LinkedIn presence with AI-powered content that{" "}
            <span className="font-semibold text-slate-800">
              drives engagement
            </span>
            . Save hours of work and generate content that{" "}
            <span className="font-semibold text-slate-800">converts</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Start Creating Button */}
            <Link href="/ai-writer" className="group inline-flex">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-primary to-primary rounded-xl group-hover:opacity-100 transition duration-200" />
                <div className="relative px-8 py-3 bg-primary rounded-lg font-medium text-white flex items-center gap-2 transition-all duration-200 group-hover:scale-[1.02]">
                  <span>Start Creating Free</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Watch Demo Button */}
            <HeroVideoDialog
              className="inline-flex"
              videoSrc="https://www.youtube.com/embed/4pgUovPcVBM"
              thumbnailSrc="/demo.png"
              thumbnailAlt="Watch demo"
              buttonClassName="group"
              buttonContent={
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl opacity-70 blur-sm group-hover:opacity-100 transition duration-200" />
                  <div className="relative px-8 py-3 bg-white rounded-lg border border-slate-200 text-slate-800 font-medium hover:bg-slate-50/80 transition-colors flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-slate-600 border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                    Watch Demo
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
