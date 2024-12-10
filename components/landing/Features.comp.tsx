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
    <motion.section
      id="features"
      className="relative py-32 overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      role="region"
      aria-label="Product features"
    >
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <motion.div
            variants={fadeInUpVariant}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
              <div className="size-6 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Powered by Advanced AI
              </span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center mb-20">
            <motion.h2
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                AI-Powered LinkedIn Growth Tools
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto text-lg text-gray-600"
            >
              Grow your LinkedIn profile with AI-powered tools. Create
              professional LinkedIn posts, carousels, and more with our
              easy-to-use tools.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden backdrop-blur-sm",
                  "bg-white hover:bg-gradient-to-b hover:from-gray-50 hover:to-white",
                  "border border-gray-100",
                  "transition-all duration-500",
                  "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                  "hover:border-gray-200"
                )}
                role="listitem"
                aria-label={feature.ariaLabel}
              >
                <div className="p-8">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div
                      className="relative w-14 h-14 rounded-xl bg-white flex items-center justify-center
                        shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                        border border-gray-100 group-hover:border-gray-200
                        transition-all duration-500"
                      aria-hidden="true"
                    >
                      {React.cloneElement(feature.icon, {
                        className:
                          "w-6 h-6 text-gray-800 group-hover:scale-110 transition-all duration-500",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-500 flex items-center group-hover:text-gray-600"
                      >
                        <div className="relative mr-3">
                          <div className="w-1.5 h-1.5 bg-primary/40 rounded-full absolute blur-[2px]" />
                          <div className="w-1 h-1 bg-primary/60 rounded-full relative" />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
