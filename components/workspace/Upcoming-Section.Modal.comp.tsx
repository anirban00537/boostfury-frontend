import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Edit, MoreHorizontal, Calendar, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const demoScheduledPosts = [
  {
    date: "Tomorrow | May 15",
    posts: [
      {
        time: "08:14 am",
        content:
          "Self-improvement isn't about perfection. It's about progress. At one point, I believed that success meant having...",
      },
      {
        time: "01:02 pm",
        content:
          "I've witnessed a lot of regular ol' Joe and Janes outperforming well-educated MBA types simply because they ...",
      },
    ],
  },
  {
    date: "Tuesday | May 16",
    posts: [
      {
        time: "08:14 am",
        content:
          "Beware of the LinkedIn content police. People who judge, but don't create. They have strong opinions about w...",
      },
      {
        time: "01:02 pm",
        content:
          "So many people have a zero-sum mindset. They hate seeing other people succeed. They think it messes up th...",
      },
    ],
  },
  // Add more days as needed
];

const UpcomingPosts: React.FC = () => {
  return (
    <Card className="bg-white border-none shadow-none p-0 ">
      <CardHeader className="p-0 pb-2  flex mb-4 justify-between items-start">
        <h2 className="flex items-center text-xl font-medium mb-4 text-gray-800">
          <Calendar className="w-7 h-7 mr-2 text-blue-500" />
          Upcoming Scheduled Posts
        </h2>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        {demoScheduledPosts.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-600 bg-cardBackground p-2 rounded-md">
              {day.date}
            </h3>
            {day.posts.map((post, postIndex) => (
              <Card
                key={postIndex}
                className="border-none shadow-none cursor-pointer"
              >
                <CardContent className="p-2 flex items-center space-x-4">
                  <div className="flex-shrink-0 w-28 text-xs font-semibold text-slate-700 flex items-center justify-around">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.time}
                    </div>
                    <Image
                      src="/linkedin-logo.webp"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-primary hover:bg-primary/10"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
