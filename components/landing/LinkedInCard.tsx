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
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [reposts, setReposts] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [connections, setConnections] = useState(0);
  const [showGrowthIndicator, setShowGrowthIndicator] = useState({
    likes: false,
    comments: false,
    reposts: false,
    followers: false,
    connections: false,
  });
  const [floatingIcons, setFloatingIcons] = useState<number[]>([]);
  const [isBoostFuryEnabled, setIsBoostFuryEnabled] = useState(true);
  const [showStory, setShowStory] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBoostFuryEnabled) {
        setLikes(0);
        setComments(0);
        setReposts(0);
        setFollowers(0);
        setConnections(0);

        // Immediately update the counters to 0
        const followersEl = document.getElementById("followers-counter");
        const connectionsEl = document.getElementById("connections-counter");
        if (followersEl) followersEl.textContent = "0";
        if (connectionsEl) connectionsEl.textContent = "0";
        return;
      }

      setConnections((prev) => {
        if (prev >= 8000) return prev;
        const connectionIncrease = Math.floor(Math.random() * 200) + 100;
        const newValue = Math.min(8000, prev + connectionIncrease);
        const counter = { value: prev };
        anime({
          targets: counter,
          value: newValue,
          duration: 200,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("connections-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setFollowers((prev) => {
        if (prev >= 12000) return prev;
        const followerIncrease = Math.floor(Math.random() * 300) + 150;
        const newValue = Math.min(12000, prev + followerIncrease);
        const counter = { value: prev };
        anime({
          targets: counter,
          value: newValue,
          duration: 200,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("followers-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setLikes((prev) => {
        if (prev >= 25000) {
          setIsBoostFuryEnabled(false);
          return prev;
        }
        const likeIncrease = Math.floor(Math.random() * 500) + 300;
        const newValue = Math.min(25000, prev + likeIncrease);
        const counter = { value: prev };
        anime({
          targets: counter,
          value: newValue,
          duration: 200,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("likes-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setComments((prev) => {
        if (prev >= 5000) return prev;
        const commentIncrease = Math.floor(Math.random() * 100) + 50;
        const newValue = Math.min(5000, prev + commentIncrease);
        const counter = { value: prev };
        anime({
          targets: counter,
          value: newValue,
          duration: 200,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("comments-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      setReposts((prev) => {
        if (prev >= 3500) return prev;
        const repostIncrease = Math.floor(Math.random() * 80) + 40;
        const newValue = Math.min(3500, prev + repostIncrease);
        const counter = { value: prev };
        anime({
          targets: counter,
          value: newValue,
          duration: 200,
          easing: "easeOutExpo",
          update: () => {
            const el = document.getElementById("reposts-counter");
            if (el) el.textContent = Math.round(counter.value).toString();
          },
        });
        return newValue;
      });

      if (likes < 25000) {
        setFloatingIcons((prev) => [...prev, Date.now()]);
        setTimeout(() => {
          setFloatingIcons((prev) => prev.slice(1));
        }, 400);

        setShowGrowthIndicator({
          likes: true,
          comments: true,
          reposts: true,
          followers: true,
          connections: true,
        });
        setTimeout(() => {
          setShowGrowthIndicator({
            likes: false,
            comments: false,
            reposts: false,
            followers: false,
            connections: false,
          });
        }, 300);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isBoostFuryEnabled, likes]);

  // Add auto-reset functionality with longer disabled time
  useEffect(() => {
    if (!isBoostFuryEnabled) {
      const resetTimeout = setTimeout(() => {
        setIsBoostFuryEnabled(true);
      }, 5000); // Increased from 3000ms to 5000ms
      return () => clearTimeout(resetTimeout);
    }
  }, [isBoostFuryEnabled]);

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

  const StorySection = () => (
    <motion.div
      className="mb-8"
      animate={{
        opacity: isBoostFuryEnabled ? 1 : 0.7,
      }}
    >
      <motion.div
        className="flex items-center gap-3 mb-4"
        animate={{
          opacity: isBoostFuryEnabled ? 1 : 0.7,
        }}
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
        />
        <div>
          <motion.h3
            className="font-semibold text-gray-900"
            animate={{
              color: isBoostFuryEnabled ? "#111827" : "#6B7280",
            }}
          >
            Sarah Parker
          </motion.h3>
          <motion.p
            className="text-sm text-gray-600"
            animate={{
              color: isBoostFuryEnabled ? "#4B5563" : "#9CA3AF",
            }}
          >
            Content Creator | Digital Marketing Specialist
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="space-y-4 text-gray-700"
        animate={{
          opacity: isBoostFuryEnabled ? 1 : 0.7,
        }}
      >
        {isBoostFuryEnabled ? (
          <>
            <p className="font-medium text-lg">
              🚀 Just hit another milestone with my LinkedIn content!
            </p>
            <p>
              Since I started using BoostFury, my engagement has skyrocketed.
              What used to take me weeks to achieve in terms of reach and
              engagement, now happens in days!
            </p>
            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
              <p className="font-medium">With BoostFury:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Posts consistently reaching 5000+ likes</li>
                <li>1000+ meaningful comments per post</li>
                <li>500+ reposts spreading my content</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <p className="font-medium text-lg">
              😔 Struggling with LinkedIn engagement...
            </p>
            <p>
              Before BoostFury, my posts would barely get any traction. It was
              frustrating seeing my content disappear into the void.
            </p>
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <p className="font-medium">Without BoostFury:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Posts getting lost in the feed</li>
                <li>Minimal engagement and reach</li>
                <li>Hours spent with no results</li>
              </ul>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative flex flex-col gap-8">
      {/* BoostFury Switch */}
      <motion.div
        className="absolute -top-16 left-0"
        animate={{
          opacity: 1,
        }}
      >
        <motion.button
          onClick={() => setIsBoostFuryEnabled((prev) => !prev)}
          className="group flex items-center gap-4 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* LinkedIn Logo */}
          <motion.div
            className="w-8 h-8 mr-2"
            animate={{
              opacity: isBoostFuryEnabled ? 1 : 0.5,
            }}
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
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

          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-6 rounded-full relative p-1"
              animate={{
                backgroundColor: isBoostFuryEnabled
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(107, 114, 128, 0.2)",
              }}
            >
              <motion.div
                className="w-4 h-4 rounded-full absolute"
                animate={{
                  backgroundColor: isBoostFuryEnabled ? "#22C55E" : "#9CA3AF",
                  left: isBoostFuryEnabled ? "24px" : "4px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            </motion.div>
            <div className="flex flex-col items-start">
              <motion.span
                className="text-sm font-medium"
                animate={{
                  color: isBoostFuryEnabled ? "#16A34A" : "#6B7280",
                }}
              >
                BoostFury {isBoostFuryEnabled ? "Enabled" : "Disabled"}
              </motion.span>
              <motion.span
                className="text-xs"
                animate={{
                  color: isBoostFuryEnabled ? "#22C55E" : "#9CA3AF",
                }}
              >
                {isBoostFuryEnabled
                  ? "Growth mode active"
                  : "Growth mode inactive"}
              </motion.span>
            </div>
          </div>

          {isBoostFuryEnabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 text-green-500"
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <TrendingUp className="w-4 h-4" />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      <div className="flex flex-col gap-4">
        {/* Engagement Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          }}
        >
          {/* Background blur effects */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl"
            animate={{
              backgroundColor: isBoostFuryEnabled
                ? "rgba(59, 130, 246, 0.1)"
                : "rgba(107, 114, 128, 0.1)",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl"
            animate={{
              backgroundColor: isBoostFuryEnabled
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(107, 114, 128, 0.1)",
            }}
          />

          {/* Reactions Section */}
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 relative">
                {/* Floating Icons */}
                <AnimatePresence>
                  {isBoostFuryEnabled &&
                    floatingIcons.map((id) => (
                      <FloatingIcon key={id} id={id} />
                    ))}
                </AnimatePresence>

                {/* Reaction icons */}
                <motion.div
                  className="w-10 h-10 rounded-full border-3 border-white flex items-center justify-center shadow-xl z-30"
                  animate={{
                    scale:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [1, 1.5, 1]
                        : 1,
                    rotate:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [0, -10, 10, 0]
                        : 0,
                    backgroundColor: isBoostFuryEnabled ? "#3B82F6" : "#9CA3AF",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ThumbsUp className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-red-500 border-3 border-white flex items-center justify-center shadow-xl z-20"
                  animate={{
                    scale:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [1, 1.5, 1]
                        : 1,
                    rotate:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [0, -10, 10, 0]
                        : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="text-base text-white">❤</span>
                </motion.div>
                <motion.div
                  className="w-10 h-10 rounded-full bg-yellow-500 border-3 border-white flex items-center justify-center shadow-xl z-10"
                  animate={{
                    scale:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [1, 1.5, 1]
                        : 1,
                    rotate:
                      showGrowthIndicator.likes && isBoostFuryEnabled
                        ? [0, -10, 10, 0]
                        : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-base text-white">👏</span>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center gap-2"
                animate={{
                  scale:
                    showGrowthIndicator.likes && isBoostFuryEnabled
                      ? [1, 1.1, 1]
                      : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.span className="text-base text-gray-700 px-4 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm">
                  <motion.span
                    id="likes-counter"
                    className="font-bold text-xl text-gray-900"
                    animate={{
                      scale:
                        showGrowthIndicator.likes && isBoostFuryEnabled
                          ? [1, 1.6, 1]
                          : 1,
                      color:
                        showGrowthIndicator.likes && isBoostFuryEnabled
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
                  scale:
                    showGrowthIndicator.comments && isBoostFuryEnabled
                      ? [1, 1.1, 1]
                      : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="flex items-center gap-2"
                  animate={{
                    scale:
                      showGrowthIndicator.comments && isBoostFuryEnabled
                        ? [1, 1.2, 1]
                        : 1,
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
                    scale:
                      showGrowthIndicator.reposts && isBoostFuryEnabled
                        ? [1, 1.2, 1]
                        : 1,
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
        </motion.div>

        {/* Network Growth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-xl relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          }}
        >
          <div className="relative">
            <motion.div
              className="grid grid-cols-2 gap-8"
              animate={{
                opacity: isBoostFuryEnabled ? 1 : 0.7,
              }}
            >
              {/* Followers Section */}
              <div className="text-center border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Followers
                </h3>
                <motion.div
                  className="text-4xl font-bold"
                  animate={{
                    scale:
                      showGrowthIndicator.followers && isBoostFuryEnabled
                        ? [1, 1.2, 1]
                        : 1,
                    color: isBoostFuryEnabled ? "#111827" : "#6B7280",
                  }}
                >
                  <span id="followers-counter">0</span>
                </motion.div>
                <motion.p
                  className="text-sm mt-1"
                  animate={{
                    color: isBoostFuryEnabled ? "#6B7280" : "#9CA3AF",
                  }}
                >
                  New Followers
                </motion.p>
                {isBoostFuryEnabled && (
                  <motion.div
                    className="text-green-500 flex items-center gap-1 justify-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Growing</span>
                  </motion.div>
                )}
              </div>

              {/* Connections Section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Connections
                </h3>
                <motion.div
                  className="text-4xl font-bold"
                  animate={{
                    scale:
                      showGrowthIndicator.connections && isBoostFuryEnabled
                        ? [1, 1.2, 1]
                        : 1,
                    color: isBoostFuryEnabled ? "#111827" : "#6B7280",
                  }}
                >
                  <span id="connections-counter">0</span>
                </motion.div>
                <motion.p
                  className="text-sm mt-1"
                  animate={{
                    color: isBoostFuryEnabled ? "#6B7280" : "#9CA3AF",
                  }}
                >
                  New Connections
                </motion.p>
                {isBoostFuryEnabled && (
                  <motion.div
                    className="text-green-500 flex items-center gap-1 justify-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Growing</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
