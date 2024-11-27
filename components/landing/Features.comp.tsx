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

const FeaturesSection = () => {
  return (
    <motion.section
      id="features"
      className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-background/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      role="region"
      aria-label="Product features"
    >
      {/* Updated background design */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute w-full h-full bg-[url('/grid.svg')] opacity-[0.02]"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-textColor to-textColor/80 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AI-Powered LinkedIn Growth Tools
          </motion.h2>
          <motion.p
            className="text-xl text-textColor/70 leading-relaxed"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Grow your LinkedIn profile with AI-powered tools. Create
            professional LinkedIn posts, carousels, and more with our
            easy-to-use tools.
          </motion.p>
        </div>

        <div
          className="mt-24 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Product features list"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className={cn(
                "group relative bg-cardBackground/30 backdrop-blur-xl rounded-2xl",
                "hover:bg-cardBackground/50 transition-all duration-500",
                "border border-borderColor/30 hover:border-primary/30",
                "hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              role="listitem"
              aria-label={feature.ariaLabel}
            >
              <div className="p-8">
                <div
                  className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  aria-hidden="true"
                >
                  {React.cloneElement(feature.icon, {
                    className:
                      "w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300",
                  })}
                </div>
                <h3 className="text-2xl font-semibold text-textColor mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.name}
                </h3>
                <p className="text-textColor/70 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-textColor/60 flex items-center group-hover:text-textColor/70 transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Structured data script remains the same */}
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
