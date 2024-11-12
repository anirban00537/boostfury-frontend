import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setBackground, setGradient } from "@/state/slice/carousel.slice";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  BackgroundColors,
  lightColorPresets,
  darkColorPresets,
} from "@/lib/color-presets";
import { Switch } from "@/components/ui/switch";
import { Palette, Sun, Moon, Droplet, Check } from "lucide-react";
import { motion } from "framer-motion";

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const layout = useSelector((state: RootState) => state.slides.layout);

  const handleColorChange = (
    colorKey: keyof BackgroundColors,
    colorValue: string
  ) => {
    dispatch(setBackground({ ...background, [colorKey]: colorValue }));
  };

  const handlePresetSelect = (preset: BackgroundColors) =>
    dispatch(setBackground(preset));

  return (
    <div className="w-full h-full flex flex-col bg-white ">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Background Settings
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-44">
        {/* Gradient Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-gray-500" />
              Gradient
            </h3>
            <Switch
              checked={layout.gradient}
              onCheckedChange={(checked) => dispatch(setGradient(checked))}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </section>

        {/* Custom Background Colors */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-500" />
            Custom Background Color
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {(Object.keys(background) as Array<keyof BackgroundColors>).map(
              (colorKey) => (
                <Popover key={colorKey}>
                  <PopoverTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg shadow-sm overflow-hidden transition-all duration-200"
                      style={{ backgroundColor: background[colorKey] }}
                    >
                      <div className="w-full h-full flex items-center justify-center hover:bg-black/5 transition-colors duration-200">
                        <Palette className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 bg-white border-0 ring-1 ring-gray-200 rounded-lg shadow-lg">
                    <HexColorPicker
                      color={background[colorKey]}
                      onChange={(color) => handleColorChange(colorKey, color)}
                    />
                  </PopoverContent>
                </Popover>
              )
            )}
          </div>
        </section>

        {/* Light Presets */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Sun className="w-4 h-4 text-gray-500" />
            Light Presets
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {lightColorPresets.map(
              (preset: BackgroundColors, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg grid grid-cols-4 shadow-sm overflow-hidden relative transition-all duration-200"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {Object.values(preset).map((color, colorIndex) => (
                    <div key={colorIndex} style={{ backgroundColor: color }} />
                  ))}
                  <div className="absolute inset-0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Dark Presets */}
        <section className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Moon className="w-4 h-4 text-gray-500" />
            Dark Presets
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {darkColorPresets.map((preset: BackgroundColors, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-12 ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg grid grid-cols-4 shadow-sm overflow-hidden relative transition-all duration-200"
                onClick={() => handlePresetSelect(preset)}
              >
                {Object.values(preset).map((color, colorIndex) => (
                  <div key={colorIndex} style={{ backgroundColor: color }} />
                ))}
                <div className="absolute inset-0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BackgroundColorsSection;
