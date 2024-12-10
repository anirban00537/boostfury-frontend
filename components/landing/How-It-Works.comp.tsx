import React from "react";
import { Paintbrush, Sliders, Sparkles, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Paintbrush className="w-8 h-8" />,
    number: "01",
    title: "Choose Template",
    description:
      "Start with professional templates optimized for LinkedIn, Instagram, and TikTok engagement.",
  },
  {
    icon: <Sliders className="w-8 h-8" />,
    number: "02",
    title: "Customize Design",
    description:
      "Personalize your carousel with brand colors, fonts, and AI-suggested layouts.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    number: "03",
    title: "Generate Content",
    description:
      "Transform your ideas into engaging carousel content with our AI copywriting.",
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    number: "04",
    title: "Export & Share",
    description:
      "Download in platform-optimized formats and share directly to your favorite platforms.",
  },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const HowItWorksSection = () => {
  return (
    <section
      className="relative py-32 overflow-hidden bg-white"
      id="how-it-works"
      aria-label="How to create carousels"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-8">
            <div className="size-6 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Simple 4-Step Process
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Create engaging LinkedIn content in minutes with our intuitive workflow
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative",
                  "bg-white rounded-2xl",
                  "transition-all duration-500"
                )}
                role="listitem"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-500/40 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 pt-10 border border-gray-100 rounded-2xl group-hover:border-primary/20 transition-colors duration-300">
                  {/* Icon */}
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative size-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {React.cloneElement(step.icon, {
                        className: "w-6 h-6 text-primary",
                      })}
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Line Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Schema markup remains the same */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Create Professional Social Media Carousels",
            description:
              "Create engaging carousels for social media in four simple steps",
            step: steps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.title,
              text: step.description,
            })),
            totalTime: "PT5M",
          })}
        </script>
      </div>
    </section>
  );
};

export default HowItWorksSection;
