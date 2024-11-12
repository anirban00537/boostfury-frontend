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
    name: "AI-Powered Content Generation",
    description:
      "Create engaging LinkedIn, Instagram, and TikTok carousel content instantly with our advanced AI. Save hours of content creation time.",
    icon: <Cpu className="w-8 h-8" />,
    benefits: ["Instant content creation", "Professional copy", "Time-saving"],
    ariaLabel: "AI content generation feature",
  },
  {
    name: "Professional Design Templates",
    description:
      "Access premium color palettes and design schemes optimized for social media engagement and brand consistency.",
    icon: <Palette className="w-8 h-8" />,
    benefits: [
      "Brand-consistent designs",
      "Engagement-optimized",
      "Professional look",
    ],
    ariaLabel: "Professional design templates feature",
  },
  {
    name: "Modern Background Library",
    description:
      "Choose from 1000+ contemporary backgrounds designed specifically for LinkedIn and Instagram carousels.",
    icon: <Layers className="w-8 h-8" />,
    benefits: ["Extensive library", "Platform-optimized", "Regular updates"],
    ariaLabel: "Background library feature",
  },
  {
    name: "Advanced Text Editor",
    description:
      "Professional typography tools with social media-optimized fonts and layouts for maximum readability and impact.",
    icon: <Type className="w-8 h-8" />,
    benefits: ["Custom typography", "Readability-focused", "Brand fonts"],
    ariaLabel: "Text customization feature",
  },
  {
    name: "Multi-Format Export",
    description:
      "Export your carousels in PDF format, perfect for LinkedIn articles and professional presentations.",
    icon: <FileText className="w-8 h-8" />,
    benefits: ["Professional PDF export", "Print-ready", "High resolution"],
    ariaLabel: "PDF export feature",
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
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      role="region"
      aria-label="Product features"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute top-48 left-36 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute top-40 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-52 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-44 right-0 w-1/3 h-1/6 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-textColor mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AI-Powered Carousel Creation Features
          </motion.h2>
          <motion.p
            className="text-xl text-textColor/70 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Grow your LinkedIn profile with AI-powered tools. Create professional
            LinkedIn posts, carousels, and more with our easy-to-use tools.
          </motion.p>
        </div>

        <div
          className="mt-20 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Product features list"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className={cn(
                "bg-cardBackground/40 backdrop-blur-lg rounded-xl shadow-lg",
                "overflow-hidden hover:shadow-xl transition-all duration-300",
                "ease-in-out border border-borderColor/50"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              role="listitem"
              aria-label={feature.ariaLabel}
            >
              <div className="p-6">
                <div
                  className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  {React.cloneElement(feature.icon, {
                    className: "w-6 h-6 text-primary",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-textColor mb-2">
                  {feature.name}
                </h3>
                <p className="text-textColor/70 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-textColor/60 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Added structured data for features */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: features.map((feature, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Thing",
                name: feature.name,
                description: feature.description,
              },
            })),
          })}
        </script>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
