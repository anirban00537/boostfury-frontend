"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-wrap justify-center -gap-3">
      {items.map((item) => (
        <motion.div
          className="relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                className="absolute -top-20 -left-1/2 translate-x-1/2 flex flex-col items-center justify-center z-50"
              >
                <div className="px-4 py-3 bg-black/40 backdrop-blur-md rounded-2xl shadow-lg border border-primary">
                  <div className="font-bold text-white text-sm mb-1">
                    {item.name}
                  </div>
                  <div className="text-gray-200 text-xs">
                    {item.designation}
                  </div>
                </div>
                <div className="w-4 h-4 bg-white/10 backdrop-blur-md rotate-45 -mt-2 z-[-1]" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-lg"
            whileHover={{ scale: 1.1 }}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
