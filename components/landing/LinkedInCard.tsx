"use client";

import React, { useState, useEffect, useCallback } from "react";
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

// Constants for animation and metrics
const METRICS = {
  MAX_LIKES: 25000,
  MAX_COMMENTS: 5000,
  MAX_REPOSTS: 3500,
  MAX_FOLLOWERS: 12000,
  MAX_CONNECTIONS: 8000,
  UPDATE_INTERVAL: 100,
  RESET_TIMEOUT: 5000,
  INCREMENT_RANGES: {
    LIKES: { MIN: 2, MAX: 5 },
    COMMENTS: { MIN: 1, MAX: 2 },
    REPOSTS: { MIN: 1, MAX: 2 },
    FOLLOWERS: { MIN: 1, MAX: 3 },
    CONNECTIONS: { MIN: 1, MAX: 2 },
  },
};

// Add animation variants for consistent animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const counterVariants = {
  growing: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  idle: {
    opacity: 0.9,
  },
};

// Types
interface GrowthIndicatorState {
  likes: boolean;
  comments: boolean;
  reposts: boolean;
  followers: boolean;
  connections: boolean;
}

interface MetricCounterProps {
  value: number;
  label: string;
  isGrowing?: boolean;
  isEnabled: boolean;
}

// Reusable components
const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  label,
  isGrowing,
  isEnabled,
}) => {
  return (
    <div className="text-center h-[160px] flex flex-col justify-center relative">
      <motion.div
        className="text-5xl font-medium tabular-nums leading-none"
        style={{
          color: isEnabled ? "#111827" : "#9CA3AF",
        }}
      >
        {value.toLocaleString()}
      </motion.div>
      <motion.p
        className="text-sm mt-2"
        animate={{
          color: isEnabled ? "#6B7280" : "#D1D5DB",
        }}
      >
        {label}
      </motion.p>
      <div className="h-6 mt-2">
        {isEnabled && isGrowing && (
          <motion.div
            className="text-green-500 flex items-center gap-1 justify-center"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Growing</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ReactionButton = ({
  icon,
  color,
  isEnabled,
}: {
  icon: React.ReactNode;
  color: string;
  isEnabled: boolean;
}) => (
  <div className="w-12 h-12 relative">
    <motion.div
      className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center shadow-lg absolute"
      animate={{
        backgroundColor: isEnabled ? color : "#E5E7EB",
      }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  </div>
);

export const LinkedInCard = () => {
  const [metrics, setMetrics] = useState({
    likes: 0,
    comments: 0,
    reposts: 0,
    followers: 0,
    connections: 0,
  });
  const [showGrowthIndicator, setShowGrowthIndicator] =
    useState<GrowthIndicatorState>({
      likes: false,
      comments: false,
      reposts: false,
      followers: false,
      connections: false,
    });
  const [isBoostFuryEnabled, setIsBoostFuryEnabled] = useState(true);

  const getRandomIncrement = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const updateMetric = useCallback(
    (
      currentValue: number,
      maxValue: number,
      minIncrement: number,
      maxIncrement: number
    ) => {
      if (currentValue >= maxValue) return currentValue;

      // Always increase by a small amount
      const increase = getRandomIncrement(minIncrement, maxIncrement);
      return Math.min(maxValue, currentValue + increase);
    },
    [getRandomIncrement]
  );

  useEffect(() => {
    if (!isBoostFuryEnabled) {
      setMetrics({
        likes: 0,
        comments: 0,
        reposts: 0,
        followers: 0,
        connections: 0,
      });
      return;
    }

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        likes: updateMetric(
          prev.likes,
          METRICS.MAX_LIKES,
          METRICS.INCREMENT_RANGES.LIKES.MIN,
          METRICS.INCREMENT_RANGES.LIKES.MAX
        ),
        comments: updateMetric(
          prev.comments,
          METRICS.MAX_COMMENTS,
          METRICS.INCREMENT_RANGES.COMMENTS.MIN,
          METRICS.INCREMENT_RANGES.COMMENTS.MAX
        ),
        reposts: updateMetric(
          prev.reposts,
          METRICS.MAX_REPOSTS,
          METRICS.INCREMENT_RANGES.REPOSTS.MIN,
          METRICS.INCREMENT_RANGES.REPOSTS.MAX
        ),
        followers: updateMetric(
          prev.followers,
          METRICS.MAX_FOLLOWERS,
          METRICS.INCREMENT_RANGES.FOLLOWERS.MIN,
          METRICS.INCREMENT_RANGES.FOLLOWERS.MAX
        ),
        connections: updateMetric(
          prev.connections,
          METRICS.MAX_CONNECTIONS,
          METRICS.INCREMENT_RANGES.CONNECTIONS.MIN,
          METRICS.INCREMENT_RANGES.CONNECTIONS.MAX
        ),
      }));

      // Show growth indicators when any metric is not at max
      const hasChanges =
        metrics.likes < METRICS.MAX_LIKES ||
        metrics.comments < METRICS.MAX_COMMENTS ||
        metrics.reposts < METRICS.MAX_REPOSTS ||
        metrics.followers < METRICS.MAX_FOLLOWERS ||
        metrics.connections < METRICS.MAX_CONNECTIONS;

      if (hasChanges) {
        setShowGrowthIndicator({
          likes: metrics.likes < METRICS.MAX_LIKES,
          comments: metrics.comments < METRICS.MAX_COMMENTS,
          reposts: metrics.reposts < METRICS.MAX_REPOSTS,
          followers: metrics.followers < METRICS.MAX_FOLLOWERS,
          connections: metrics.connections < METRICS.MAX_CONNECTIONS,
        });
      } else {
        setShowGrowthIndicator({
          likes: false,
          comments: false,
          reposts: false,
          followers: false,
          connections: false,
        });
      }
    }, METRICS.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isBoostFuryEnabled, metrics, updateMetric]);

  useEffect(() => {
    if (!isBoostFuryEnabled) {
      const resetTimeout = setTimeout(() => {
        setIsBoostFuryEnabled(true);
      }, METRICS.RESET_TIMEOUT);
      return () => clearTimeout(resetTimeout);
    }
  }, [isBoostFuryEnabled]);

  return (
    <div className="relative flex flex-col gap-8 max-w-xl mx-auto min-h-[600px]">
      {/* BoostFury Toggle - Moved to top */}
      <motion.button
        onClick={() => setIsBoostFuryEnabled((prev) => !prev)}
        className="group flex items-center justify-center gap-6 px-8 py-4 rounded-2xl  shadow-sm mx-auto w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <motion.div
          className="w-10 h-10"
          animate={{ opacity: isBoostFuryEnabled ? 1 : 0.5 }}
        >
          <svg
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="1024" height="1024" rx="200" fill="#0A66C2" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M229.2 286.4C229.2 263.2 248.4 244 271.6 244C294.8 244 314 263.2 314 286.4C314 309.6 294.8 329.2 271.6 329.2C248.4 328.8 229.2 309.6 229.2 286.4ZM234 357.2H309.2V730.4H234V357.2ZM389.2 357.2H462V390H463.2C475.2 370.8 500.4 350.4 537.6 350.4C614 350.4 633.2 402.4 633.2 470.4V730.4H558V486.4C558 456.4 557.6 417.6 516.4 417.6C474.8 417.6 468 450.8 468 484.8V730.4H392.8V357.2H389.2Z"
              fill="white"
            />
          </svg>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.div
            className="w-12 h-7 rounded-full relative p-1"
            style={{
              background: isBoostFuryEnabled
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(229, 231, 235, 0.5)",
            }}
          >
            <motion.div
              className="w-5 h-5 rounded-full absolute"
              animate={{
                backgroundColor: isBoostFuryEnabled ? "#22C55E" : "#D1D5DB",
                left: isBoostFuryEnabled ? "24px" : "4px",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.div>
          <div className="flex flex-col items-start">
            <motion.span
              className="text-base font-medium"
              animate={{ color: isBoostFuryEnabled ? "#16A34A" : "#6B7280" }}
            >
              BoostFury {isBoostFuryEnabled ? "Enabled" : "Disabled"}
            </motion.span>
            <motion.span
              className="text-sm"
              animate={{ color: isBoostFuryEnabled ? "#22C55E" : "#9CA3AF" }}
            >
              {isBoostFuryEnabled
                ? "Growth mode active"
                : "Growth mode inactive"}
            </motion.span>
          </div>
        </div>
      </motion.button>

      {/* Engagement Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="rounded-3xl shadow-sm p-8 border border-gray-100 min-h-[120px] overflow-hidden"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Reactions */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex -space-x-2 relative h-12">
              <ReactionButton
                icon={<ThumbsUp className="w-6 h-6 text-white" />}
                color="#0A66C2"
                isEnabled={isBoostFuryEnabled}
              />
              <ReactionButton
                icon={<span className="text-lg text-white">❤</span>}
                color="#EF4444"
                isEnabled={isBoostFuryEnabled}
              />
              <ReactionButton
                icon={<span className="text-lg text-white">👏</span>}
                color="#F59E0B"
                isEnabled={isBoostFuryEnabled}
              />
            </div>

            <div className="flex items-center min-w-0">
              <span className="text-base text-gray-600 px-6 py-3 rounded-full bg-gray-50/80 whitespace-nowrap">
                <span className="font-medium text-2xl text-gray-900 tabular-nums">
                  {metrics.likes.toLocaleString()}
                </span>{" "}
                others
              </span>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-gray-50/80 whitespace-nowrap">
            <span className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-base text-gray-600 font-medium tabular-nums">
                {metrics.comments.toLocaleString()}
              </span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-3">
              <Repeat2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-base text-gray-600 font-medium tabular-nums">
                {metrics.reposts.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Network Growth Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="rounded-3xl shadow-sm p-8 border border-gray-100 min-h-[200px]"
      >
        <motion.div
          className="grid grid-cols-2 gap-16"
          animate={{ opacity: isBoostFuryEnabled ? 1 : 0.7 }}
        >
          <div className="border-r border-gray-100">
            <MetricCounter
              value={metrics.followers}
              label="New Followers"
              isGrowing={showGrowthIndicator.followers}
              isEnabled={isBoostFuryEnabled}
            />
          </div>
          <MetricCounter
            value={metrics.connections}
            label="New Connections"
            isGrowing={showGrowthIndicator.connections}
            isEnabled={isBoostFuryEnabled}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
