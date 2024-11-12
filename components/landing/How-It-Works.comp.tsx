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

const HowItWorksSection = () => {
  return (
    <section
      className="py-16 bg-background"
      id="how-it-works"
      aria-label="How to create carousels"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-textColor sm:text-4xl">
            One Stop Solution for LinkedIn Growth
          </h2>
          <p className="mt-4 text-xl text-textColor/70 max-w-3xl mx-auto">
            Grow your LinkedIn profile with AI-powered tools. Create professional
            LinkedIn posts, carousels, and more with our easy-to-use tools.
          </p>
        </motion.div>

        <div className="mt-16" role="list" aria-label="Carousel creation steps">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center",
                  "p-6 rounded-xl bg-cardBackground/40",
                  "backdrop-blur-lg border border-borderColor/50"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                role="listitem"
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4"
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  Step {step.number}
                </div>
                <h3 className="text-xl font-semibold text-textColor mb-2">
                  {step.title}
                </h3>
                <p className="text-textColor/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Essential structured data */}
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
