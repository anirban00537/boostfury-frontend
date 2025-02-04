"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import anime from "animejs";

export const LinkedInCard = () => {
  const [likes, setLikes] = useState(5226);
  const [comments, setComments] = useState(1072);
  const [reposts, setReposts] = useState(608);
  const [showGrowthIndicator, setShowGrowthIndicator] = useState({
    likes: false,
    comments: false,
    reposts: false,
  });
  const [floatingIcons, setFloatingIcons] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const likeIncrease = Math.floor(Math.random() * 25) + 15;
      const commentIncrease = Math.floor(Math.random() * 8) + 2;
      const repostIncrease = Math.floor(Math.random() * 5) + 1;

      // Add new floating icons
      setFloatingIcons((prev) => [...prev, Date.now()]);
      setTimeout(() => {
        setFloatingIcons((prev) => prev.slice(1));
      }, 1000);

      setLikes((prev) => {
        const newValue = prev + likeIncrease;
        const counter = { value: prev };
        const animation = anime({
          targets: counter,
          value: newValue,
          duration: 600,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("likes-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setComments((prev) => {
        const newValue = prev + commentIncrease;
        const counter = { value: prev };
        const animation = anime({
          targets: counter,
          value: newValue,
          duration: 800,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("comments-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setReposts((prev) => {
        const newValue = prev + repostIncrease;
        const counter = { value: prev };
        const animation = anime({
          targets: counter,
          value: newValue,
          duration: 800,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("reposts-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setShowGrowthIndicator({ likes: true, comments: true, reposts: true });
      setTimeout(() => {
        setShowGrowthIndicator({
          likes: false,
          comments: false,
          reposts: false,
        });
      }, 800);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const FloatingIcon = ({ id }: { id: number }) => (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 1],
        y: -60,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1"
    >
      <ArrowUpRight className="w-4 h-4 text-green-500" />
      <TrendingUp className="w-4 h-4 text-green-500" />
    </motion.div>
  );

  const GrowthIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -20 }}
      exit={{ opacity: 0 }}
      className="absolute -top-2 text-green-500 text-xs font-medium"
    >
      <TrendingUp className="w-4 h-4 inline" />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-2xl relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
      }}
    >
      {/* Background blur effects */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Reactions Section */}
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 relative">
            {/* Floating Icons */}
            <AnimatePresence>
              {floatingIcons.map((id) => (
                <FloatingIcon key={id} id={id} />
              ))}
            </AnimatePresence>

            {/* Reaction icons */}
            <motion.div
              className="w-10 h-10 rounded-full bg-blue-500 border-3 border-white flex items-center justify-center shadow-xl z-30"
              animate={{
                scale: showGrowthIndicator.likes ? [1, 1.5, 1] : 1,
                rotate: showGrowthIndicator.likes ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <ThumbsUp className="w-5 h-5 text-white" />
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full bg-red-500 border-3 border-white flex items-center justify-center shadow-xl z-20"
              animate={{
                scale: showGrowthIndicator.likes ? [1, 1.5, 1] : 1,
                rotate: showGrowthIndicator.likes ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-base text-white">❤</span>
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full bg-yellow-500 border-3 border-white flex items-center justify-center shadow-xl z-10"
              animate={{
                scale: showGrowthIndicator.likes ? [1, 1.5, 1] : 1,
                rotate: showGrowthIndicator.likes ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-base text-white">👏</span>
            </motion.div>
          </div>
          <motion.div
            className="flex items-center gap-2"
            animate={{
              scale: showGrowthIndicator.likes ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.span className="text-base text-gray-700 px-4 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm">
              <motion.span
                id="likes-counter"
                className="font-bold text-xl text-gray-900"
                animate={{
                  scale: showGrowthIndicator.likes ? [1, 1.6, 1] : 1,
                  color: showGrowthIndicator.likes
                    ? ["#111827", "#2563EB", "#111827"]
                    : "#111827",
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {likes}
              </motion.span>{" "}
              others
            </motion.span>
          </motion.div>
          <motion.div
            className="ml-auto flex items-center gap-3 px-6 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm"
            animate={{
              scale: showGrowthIndicator.comments ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="flex items-center gap-2"
              animate={{
                scale: showGrowthIndicator.comments ? [1, 1.2, 1] : 1,
              }}
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span
                id="comments-counter"
                className="text-base text-gray-700 font-medium"
              >
                {comments}
              </span>
            </motion.span>
            <span className="text-gray-400">•</span>
            <motion.span
              className="flex items-center gap-2"
              animate={{
                scale: showGrowthIndicator.reposts ? [1, 1.2, 1] : 1,
              }}
            >
              <Repeat2 className="w-5 h-5 text-gray-600" />
              <span
                id="reposts-counter"
                className="text-base text-gray-700 font-medium"
              >
                {reposts}
              </span>
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 mt-6 pt-4">
        <div className="grid grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-3 py-4 hover:bg-gray-100/80 rounded-2xl transition-colors group">
            <ThumbsUp className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
            <span className="text-base text-gray-600 group-hover:text-blue-500 font-medium">
              Like
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 py-4 hover:bg-gray-100/80 rounded-2xl transition-colors group">
            <MessageCircle className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
            <span className="text-base text-gray-600 group-hover:text-blue-500 font-medium">
              Comment
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 py-4 hover:bg-gray-100/80 rounded-2xl transition-colors group">
            <Repeat2 className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
            <span className="text-base text-gray-600 group-hover:text-blue-500 font-medium">
              Repost
            </span>
          </button>
          <button className="flex items-center justify-center gap-3 py-4 hover:bg-gray-100/80 rounded-2xl transition-colors group">
            <Send className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
            <span className="text-base text-gray-600 group-hover:text-blue-500 font-medium">
              Send
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
