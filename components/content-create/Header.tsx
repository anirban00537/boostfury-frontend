import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center pb-4 relative"
    >
      <div className="relative space-y-4">
        {/* Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gradient-to-r from-primary/5 to-primary/10
                     border border-primary/20 shadow-sm"
        >
          <div className="relative">
            <Wand2 className="w-4 h-4 text-primary relative z-10" />
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/80 
                         bg-clip-text text-transparent">
            AI-Powered Writing
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r 
                       from-primary/5 via-transparent to-primary/5 
                       blur-3xl opacity-30" />
          
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl 
                       bg-gradient-to-br from-gray-900 to-gray-700
                       inline-block text-transparent bg-clip-text
                       [text-shadow:_0_1px_3px_rgb(0_0_0_/_10%)]
                       relative z-10"
          >
            What Viral Post Would You Like to Create?
            <span className="absolute -top-1 -right-1 text-primary/20">
              <Sparkles className="w-6 h-6" />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg relative z-10"
        >
          Transform your ideas into engaging content with{' '}
          <span className="text-primary/80 font-medium">AI-powered</span> assistance
        </motion.p>

        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-[100%] h-[100%] rounded-full bg-gradient-to-br 
                       from-primary/5 via-transparent to-primary/5 
                       blur-3xl opacity-20" />
        </div>
      </div>
    </motion.div>
  );
};
