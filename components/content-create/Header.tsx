import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";
import ParticlesContainer from "../ui/particles-container";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-12 overflow-hidden"
    >
      <ParticlesContainer />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Glowing badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-gradient-to-r from-purple-500/10 via-primary/10 to-blue-500/10
                   border border-white/10 backdrop-blur-sm"
        >
          <div className="relative">
            <Wand2 className="w-4 h-4 text-primary" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
            />
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-purple-500 via-primary to-blue-500 
                         bg-clip-text text-transparent">
            AI-Powered Creation
          </span>
        </motion.div>

        {/* Main heading with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute -inset-x-20 -inset-y-10">
            <div className="w-full h-full absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 
                            animate-gradient-slow rounded-full blur-3xl opacity-50" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Create 
            <span className="bg-gradient-to-r from-purple-500 via-primary to-blue-500 
                           bg-clip-text text-transparent px-3">
              Viral Content
            </span>
            with AI
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-600"
          >
            Transform your ideas into engaging content with our AI-powered platform
          </motion.div>

          <div className="absolute -top-2 -right-2 text-primary/20">
            <Sparkles className="w-8 h-8" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
