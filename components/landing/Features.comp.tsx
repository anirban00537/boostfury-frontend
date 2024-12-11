import React from "react";
import {
  Cpu,
  Palette,
  Layers,
  Type,
  FileText,
  DownloadCloud,
  BookTemplate,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Enhanced features with more SEO-friendly descriptions and keywords
const features = [
  {
    name: "AI Viral Post Writer",
    description:
      "Create viral-worthy posts instantly with our AI that understands trending topics and engagement patterns across LinkedIn, Instagram, and TikTok.",
    icon: <Cpu className="w-8 h-8" />,
    benefits: [
      "Viral content optimization",
      "Trend analysis",
      "Engagement-focused",
    ],
    ariaLabel: "AI viral post writer feature",
  },
  {
    name: "Post Idea Generator",
    description:
      "Never run out of content ideas. Our AI generates relevant, trending topics tailored to your industry and audience preferences.",
    icon: <BookTemplate className="w-8 h-8" />,
    benefits: [
      "Endless content ideas",
      "Industry-specific topics",
      "Audience-targeted",
    ],
    ariaLabel: "Post idea generator feature",
  },
  {
    name: "Personalized Tone Matching",
    description:
      "Maintain your unique voice with AI that learns and mimics your writing style for authentic, consistent content creation.",
    icon: <Type className="w-8 h-8" />,
    benefits: ["Voice consistency", "Personal branding", "Authentic content"],
    ariaLabel: "Personalized tone matching feature",
  },
  {
    name: "Smart Post Queue",
    description:
      "Schedule and manage your content pipeline with intelligent posting times for maximum engagement and reach.",
    icon: <Layers className="w-8 h-8" />,
    benefits: ["Optimal timing", "Content calendar", "Automated posting"],
    ariaLabel: "Post queue feature",
  },
  {
    name: "Advanced AI Composer",
    description:
      "Leverage cutting-edge AI features for content refinement, including tone adjustment, length optimization, and engagement hooks.",
    icon: <Palette className="w-8 h-8" />,
    benefits: ["Smart editing", "Content optimization", "Enhanced engagement"],
    ariaLabel: "Advanced AI composer feature",
  },
  {
    name: "High-Resolution Downloads",
    description:
      "Download platform-optimized carousel images in high resolution for LinkedIn, Instagram, and TikTok.",
    icon: <DownloadCloud className="w-8 h-8" />,
    benefits: ["Platform-optimized sizes", "High quality", "Instant download"],
    ariaLabel: "Image download feature",
  },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative py-32 overflow-hidden"
      role="region"
      aria-label="Product features"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-tight font-bold">
                <span className="bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Features supported
                </span>
                <br />
                <span className="bg-gradient-to-b from-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                  In our platform
                </span>
              </h2>
              <div className="mt-8 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-12 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
                  Powerful features to help you create engaging LinkedIn content
                </p>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-stretch">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.15 }}
                className="group relative w-full h-full"
                role="listitem"
                aria-label={feature.ariaLabel}
              >
                {/* Enhanced Glowing Effects */}
                <div className="absolute -inset-[1px] bg-gradient-to-t from-neutral-200/0 via-neutral-200/10 to-neutral-200/0 rounded-2xl group-hover:via-neutral-200/20 transition-all duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                
                {/* Enhanced Feature Card */}
                <div className="relative h-full p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 transition-all duration-300 flex flex-col group-hover:translate-y-[-2px]">
                  {/* Enhanced Icon Container */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent rounded-xl"></div>
                      <div className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-xl"></div>
                      <div className="relative w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-neutral-200/40 shadow-sm">
                        {React.cloneElement(feature.icon, {
                          className: "w-6 h-6 text-neutral-900 group-hover:scale-110 transition-transform duration-300",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-black transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-neutral-600 text-base leading-relaxed group-hover:text-neutral-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  {/* Enhanced Bottom Glowing Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/20 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
