import React from "react";
import {
  Cpu,
  Palette,
  Layers,
  Type,
  FileText,
  DownloadCloud,
  BookTemplate,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "AI Viral Post Writer",
    description:
      "Create viral-worthy posts instantly with our AI that understands trending topics and engagement patterns across LinkedIn.",
    icon: <Cpu className="w-6 h-6" />,
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/10 to-[#2C8EFF]/5",
  },
  {
    name: "Post Idea Generator",
    description:
      "Never run out of content ideas. Our AI generates relevant, trending topics tailored to your industry and audience preferences.",
    icon: <BookTemplate className="w-6 h-6" />,
    color: "#FF6B6B",
    gradient: "from-[#FF6B6B]/10 to-[#FF8787]/5",
  },
  {
    name: "Personalized Tone Matching",
    description:
      "Maintain your unique voice with AI that learns and mimics your writing style for authentic, consistent content creation.",
    icon: <Type className="w-6 h-6" />,
    color: "#845EF7",
    gradient: "from-[#845EF7]/10 to-[#9775FA]/5",
  },
  {
    name: "Smart Post Queue",
    description:
      "Schedule and manage your content pipeline with intelligent posting times for maximum engagement and reach.",
    icon: <Layers className="w-6 h-6" />,
    color: "#20C997",
    gradient: "from-[#20C997]/10 to-[#38D9A9]/5",
  },
  {
    name: "Advanced AI Composer",
    description:
      "Leverage cutting-edge AI features for content refinement, including tone adjustment, length optimization, and engagement hooks.",
    icon: <Palette className="w-6 h-6" />,
    color: "#FAB005",
    gradient: "from-[#FAB005]/10 to-[#FFD43B]/5",
  },
  {
    name: "AI Writing Studio",
    description:
      "Enhance your LinkedIn posts with AI-powered rewriting, tone adjustments, and content optimization to maximize engagement and impact.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "#4C6EF5",
    gradient: "from-[#4C6EF5]/10 to-[#748FFC]/5",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0A66C2]/10 to-[#2C8EFF]/10 border border-[#0A66C2]/20">
              <Sparkles className="w-4 h-4 text-[#0A66C2]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                Powerful Features
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Everything you need to create
              <span className="bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                {" "}
                viral content
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools and features to help you create engaging LinkedIn
              content that drives results
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full">
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-all duration-500",
                    feature.gradient
                  )}
                />

                <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                  {/* Icon */}
                  <div className="mb-5 inline-flex">
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-2xl",
                        `bg-gradient-to-b ${feature.gradient}`
                      )}
                    >
                      <div
                        className="relative"
                        style={{ color: feature.color }}
                      >
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: feature.color }}
                  >
                    {feature.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
