import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-10 space-y-4">
      {/* Text Content with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="relative flex flex-col items-center text-center space-y-3">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0A66C2]/10 to-[#2C8EFF]/10 border border-[#0A66C2]/20">
            <Sparkles className="w-4 h-4 text-[#0A66C2]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
              AI-Powered Content Creation
            </span>
          </div>

          <h1 className="text-6xl font-bold tracking-tight leading-tight">
            <span className="text-slate-600">What</span>{" "}
            <span className="bg-gradient-to-r from-[#0A66C2] via-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
              viral post
            </span>{" "}
            <span className="text-slate-600">do you want to create?</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl">
            Transform your ideas into engaging content with our AI writer.
            Generate professional posts that drive engagement and grow your
            network.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
