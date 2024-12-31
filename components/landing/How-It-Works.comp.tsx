import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PenLine,
  Share,
  BarChart,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Generate Ideas",
    description:
      "Get AI-powered content ideas tailored to your industry and audience. Never run out of engaging topics to write about.",
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/10 to-[#2C8EFF]/5",
  },
  {
    icon: <PenLine className="w-6 h-6" />,
    title: "Create Your Post",
    description:
      "Transform ideas into engaging content with our AI writer. Optimize your posts for maximum impact and engagement.",
    color: "#845EF7",
    gradient: "from-[#845EF7]/10 to-[#9775FA]/5",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Enhance Content",
    description:
      "Fine-tune your content with AI-powered suggestions, tone adjustments, and engagement optimization.",
    color: "#20C997",
    gradient: "from-[#20C997]/10 to-[#38D9A9]/5",
  },
  {
    icon: <Share className="w-6 h-6" />,
    title: "Share & Grow",
    description:
      "Schedule and share your optimized content directly to LinkedIn. Track performance and grow your presence.",
    color: "#FAB005",
    gradient: "from-[#FAB005]/10 to-[#FFD43B]/5",
  },
];

const HowItWorksSection = () => {
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
              <ArrowRight className="w-4 h-4 text-[#0A66C2]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                How It Works
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
              Create viral content in
              <span className="bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                {" "}
                four simple steps
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our streamlined process helps you create and share engaging
              LinkedIn content in minutes
            </p>
          </motion.div>
        </div>

        {/* Steps Grid with Connection Lines */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0A66C2]/10 via-[#2C8EFF]/20 to-[#0A66C2]/10 hidden lg:block" />

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative h-full">
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-all duration-500",
                      step.gradient
                    )}
                  />

                  <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                    {/* Step Number */}
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: `${step.color}10`,
                        color: step.color,
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="mb-5 inline-flex">
                      <div
                        className={cn(
                          "relative flex items-center justify-center w-12 h-12 rounded-2xl",
                          `bg-gradient-to-b ${step.gradient}`
                        )}
                      >
                        <div className="relative" style={{ color: step.color }}>
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className="text-xl font-semibold mb-3"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
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

export default HowItWorksSection;
