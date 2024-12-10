import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-8"
    >
      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        {/* Enhanced badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                     border border-primary/10"
          >
            <div className="relative w-6 h-6 rounded-md flex items-center justify-center">
              <Wand2 className="w-3.5 h-3.5 text-primary relative z-10" />
            </div>
            <span className="text-sm font-medium text-gray-800">
              AI-Powered Creation
            </span>
          </motion.div>
        </div>

        {/* Main heading with enhanced design */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Main Title */}
            <div className="relative">
              <h1 className="relative text-3xl md:text-4xl font-bold tracking-tight">
                Create{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-purple-500 to-blue-500 
                                bg-clip-text text-transparent">
                    Viral Content
                  </span>
                </span>{" "}
                with AI
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-sm text-gray-600 max-w-xl mx-auto"
            >
              Transform your ideas into engaging content with our AI-powered platform
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
