import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
} from "@/state/slice/carousel.slice";
import { backgroundPatterns, sharedElements } from "@/lib/core-constants";
import { Slider } from "@/components/ui/slider";
import {
  CircleOff,
  ChevronDown,
  ChevronUp,
  Grid,
  Layers,
  Palette,
} from "lucide-react";
import { getBackgroundPattern } from "@/components/editor/shared-components/Backgrounds.comp";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundPatternsAndElements = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const { pattern } = useSelector((state: RootState) => state.slides.layout);
  const sharedSelectedElement = useSelector(
    (state: RootState) => state.slides.sharedSelectedElement
  );
  const layout = useSelector((state: RootState) => state.slides.layout);

  const [patternSectionOpen, setPatternSectionOpen] = useState(true);
  const [elementsSectionOpen, setElementsSectionOpen] = useState(true);

  const handlePatternChange = (value: number) => dispatch(setPattern(value));

  const SectionHeader = ({
    title,
    icon,
    isOpen,
    toggleOpen,
  }: {
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
  }) => (
    <div
      className="cursor-pointer bg-white rounded-lg p-3 ring-1 ring-gray-200 hover:ring-blue-200 transition-all duration-200"
      onClick={toggleOpen}
    >
      <h3 className="text-sm font-medium flex items-center justify-between text-gray-700">
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </h3>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Patterns & Elements
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {/* Pattern Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Pattern"
            icon={<Grid size={16} className="text-gray-500" />}
            isOpen={patternSectionOpen}
            toggleOpen={() => setPatternSectionOpen(!patternSectionOpen)}
          />
          <AnimatePresence>
            {patternSectionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex justify-center items-center h-12 rounded-lg cursor-pointer transition-all duration-200 ${
                      pattern === 0
                        ? "bg-blue-50 ring-1 ring-blue-200"
                        : "ring-1 ring-gray-200 hover:ring-blue-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePatternChange(0)}
                  >
                    <CircleOff size={16} className="text-gray-500" />
                  </motion.div>
                  {backgroundPatterns.map((patternItem) => (
                    <motion.div
                      key={patternItem.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex justify-center items-center rounded-lg cursor-pointer transition-all duration-200 overflow-hidden ${
                        pattern === patternItem.id
                          ? "ring-2 ring-blue-200"
                          : "ring-1 ring-gray-200 hover:ring-blue-200"
                      }`}
                      onClick={() => handlePatternChange(patternItem.id)}
                    >
                      <div
                        className="w-full h-12 rounded-lg"
                        style={{
                          backgroundImage: `url("${getBackgroundPattern(
                            patternItem.id,
                            background.color4
                          )}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "repeat",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                    Background Opacity
                    <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                      {Math.round(layout.backgroundOpacity * 100)}%
                    </span>
                  </label>
                  <Slider
                    max={0.05}
                    step={0.01}
                    value={[layout.backgroundOpacity]}
                    onValueChange={(value) =>
                      dispatch(setBackgroundOpacity(value[0]))
                    }
                    className="my-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Shared Elements Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Shared Elements"
            icon={<Layers size={16} className="text-gray-500" />}
            isOpen={elementsSectionOpen}
            toggleOpen={() => setElementsSectionOpen(!elementsSectionOpen)}
          />
          <AnimatePresence>
            {elementsSectionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex justify-center items-center h-12 rounded-lg cursor-pointer transition-all duration-200 ${
                      sharedSelectedElement?.id === 0
                        ? "bg-blue-50 ring-1 ring-blue-200"
                        : "ring-1 ring-gray-200 hover:ring-blue-200 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      dispatch(setSharedSelectedElementId(0));
                      dispatch(setSharedSelectedElementOpacity(0.4));
                    }}
                  >
                    <CircleOff size={16} className="text-gray-500" />
                  </motion.div>
                  {sharedElements.map((element) => (
                    <motion.div
                      key={element?.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex justify-center items-center h-12 rounded-lg cursor-pointer transition-all duration-200 ${
                        sharedSelectedElement?.id === element?.id
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : "ring-1 ring-gray-200 hover:ring-blue-200 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        dispatch(setSharedSelectedElementId(element.id));
                        dispatch(setSharedSelectedElementOpacity(0.4));
                      }}
                    >
                      <element.component />
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                    Opacity
                    <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                      {Math.round((sharedSelectedElement?.opacity || 0) * 100)}%
                    </span>
                  </label>
                  <Slider
                    max={1}
                    step={0.01}
                    value={[sharedSelectedElement?.opacity || 0]}
                    onValueChange={(value) =>
                      dispatch(setSharedSelectedElementOpacity(value[0]))
                    }
                    className="my-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default BackgroundPatternsAndElements;
