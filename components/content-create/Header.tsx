import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 
                    flex items-center justify-center shadow-inner">
          <Wand2 className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-3.5 w-3.5 text-primary/40" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">
          <span className="text-gray-900">AI Viral</span>{" "}
          <span className="text-primary">Post Writer</span>
        </h1>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
          <div className="size-1.5 rounded-full bg-primary/40" />
          <span className="text-xs font-medium text-primary/80">AI Powered</span>
        </div>
      </div>
    </div>
  );
};
