import { motion } from "framer-motion";

export const Header = () => {
  return (
    <div className="flex items-center justify-center mb-7">
      {/* Text Content with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start text-left"
      >
        <h1 className="text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
            AI Viral
          </span>{" "}
          <span className="bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-500 bg-clip-text text-transparent">
            Post Writer
          </span>
        </h1>
      </motion.div>
    </div>
  );
};
