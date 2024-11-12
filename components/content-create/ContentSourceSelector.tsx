import { FileText, ChevronDown, Sparkles, Check, Wand2 } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface ContentSourceSelectorProps {
  contentSource: string;
  setContentSource: (source: string) => void;
  contentSources: Array<{
    id: string;
    label: string;
    icon: any;
  }>;
}

export const ContentSourceSelector = ({
  contentSource,
  setContentSource,
  contentSources,
}: ContentSourceSelectorProps) => {
  return (
    <div className="space-y-4">
      {/* Header with Primary Color Icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Create Content from
            </h3>
          </div>
        </div>
      </div>

      {/* Source Selection with AI Optimizer Style */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {contentSources.map((source) => (
          <motion.button
            key={source.id}
            onClick={() => setContentSource(source.id)}
            className={`
              group relative flex items-center px-1 rounded-xl transition-all duration-200
              ${
                contentSource === source.id
                  ? "bg-primary/10 ring-1 ring-primary/20"
                  : "bg-gray-50/80 hover:bg-primary/5 ring-1 ring-gray-200 hover:ring-primary/20"
              }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              w-full sm:w-auto
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
            `}
            >
              <source.icon
                className={`
                  h-3 w-3 transition-all duration-200
                  ${
                    contentSource === source.id
                      ? "text-primary"
                      : "text-primary/60 group-hover:text-primary"
                  }
                `}
              />
            </div>

            <span
              className={`
              text-xs font-medium whitespace-nowrap mr-4 transition-colors
              ${
                contentSource === source.id
                  ? "text-primary"
                  : "text-gray-700 group-hover:text-primary"
              }
            `}
            >
              {source.label}
            </span>

            {contentSource === source.id && (
              <motion.div
                className="absolute -right-1 -top-1 w-5 h-5 bg-primary/10 
                         rounded-full flex items-center justify-center ring-2 ring-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-3 h-3 text-primary" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Helper Text */}
      <div className="px-1">
        <p className="text-xs text-gray-500">
          Select the most appropriate source type for your content generation
          needs
        </p>
      </div>
    </div>
  );
};
