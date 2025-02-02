"use client";

import React, { useState, useEffect } from "react";
import { AnimatedList } from "../ui/animater-list-item";
import Image from "next/image";

const NotificationItem = ({
  avatar,
  name,
  action,
  time,
}: {
  avatar: string;
  name: string;
  action: string;
  time: string;
}) => (
  <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-5 border border-neutral-200/50 hover:bg-white/80 hover:border-neutral-300/50 transition-all duration-300">
    <div className="relative">
      <div className="h-14 w-14 rounded-full overflow-hidden relative ring-4 ring-white">
        <Image src={avatar} alt={name} fill className="object-cover" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-blue-600" />
      </div>
    </div>
    <div className="flex-1">
      <p className="text-neutral-800 text-[15px] leading-relaxed">
        <span className="font-semibold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          {name}
        </span>{" "}
        {action}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-1 h-1 rounded-full bg-neutral-300" />
        <p className="text-sm text-neutral-500">{time}</p>
      </div>
    </div>
  </div>
);

export const LinkedInNotifications = () => {
  const allNotifications = [
    {
      id: 1,
      avatar: "/demo-avatars/user1.jpg",
      name: "Sarah Johnson",
      action: "commented on your LinkedIn post about AI content generation",
      time: "Just now",
    },
    {
      id: 2,
      avatar: "/demo-avatars/user2.jpg",
      name: "Michael Chen",
      action: "sent you a connection request",
      time: "1 minute ago",
    },
    {
      id: 3,
      avatar: "/demo-avatars/user3.jpg",
      name: "Emily Williams",
      action: "liked your automated post about industry trends",
      time: "2 minutes ago",
    },
    {
      id: 4,
      avatar: "/demo-avatars/user4.jpg",
      name: "David Martinez",
      action: "shared your AI-generated content with their network",
      time: "3 minutes ago",
    },
    {
      id: 5,
      avatar: "/demo-avatars/user1.jpg",
      name: "Alex Thompson",
      action: "mentioned you in a comment about content automation",
      time: "4 minutes ago",
    },
    {
      id: 6,
      avatar: "/demo-avatars/user2.jpg",
      name: "Jessica Lee",
      action: "wants to connect with you after seeing your viral post",
      time: "5 minutes ago",
    },
  ];

  const [visibleNotifications, setVisibleNotifications] = useState(
    allNotifications.slice(0, 4)
  );
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleNotifications((prev) => {
        const rotated = [...allNotifications];
        const first = rotated.shift();
        if (first) rotated.push(first);
        return rotated.slice(0, 4);
      });
      setKey((prev) => prev + 1);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatedList key={key} delay={400} className="w-full space-y-3">
        {visibleNotifications.map((notification) => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </AnimatedList>
    </div>
  );
};
