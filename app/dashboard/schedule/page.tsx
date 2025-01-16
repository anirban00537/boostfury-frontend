"use client";

import { useState } from "react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Plus,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleEditorModal } from "@/components/schedule-editor-modal";

interface ScheduledPost {
  id: string;
  content: string;
  scheduledFor: string;
}

export default function SchedulePage() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      content:
        "Imagine scaling your AI startup from an idea at Y Combinator (YC) to reaching 10 million use...",
      scheduledFor: "2024-01-16T12:00:00",
    },
    {
      id: "2",
      content:
        "🚀 Excited to announce our latest AI-powered feature: Real-time sentiment analysis for customer feedback...",
      scheduledFor: "2024-01-16T16:00:00",
    },
    {
      id: "3",
      content:
        "Join us for an exclusive webinar on 'Building Scalable AI Solutions' with industry experts...",
      scheduledFor: "2024-01-18T12:00:00",
    },
    {
      id: "4",
      content:
        "How we improved our model accuracy by 35% using these three simple techniques...",
      scheduledFor: "2024-01-18T16:00:00",
    },
  ]);

  // Generate time slots for the next 7 days
  const generateTimeSlots = () => {
    const slots = [];
    // Set the start date to January 16, 2024
    const now = new Date("2024-01-16T00:00:00");

    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      // Add 12:00 PM and 4:00 PM slots
      slots.push({
        date: new Date(date.setHours(12, 0, 0, 0)),
        isOccupied: scheduledPosts.some(
          (post) =>
            new Date(post.scheduledFor).toDateString() ===
              date.toDateString() &&
            new Date(post.scheduledFor).getHours() === 12
        ),
      });
      slots.push({
        date: new Date(date.setHours(16, 0, 0, 0)),
        isOccupied: scheduledPosts.some(
          (post) =>
            new Date(post.scheduledFor).toDateString() ===
              date.toDateString() &&
            new Date(post.scheduledFor).getHours() === 16
        ),
      });
    }
    return slots;
  };

  return (
    <div className="mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">My queue</h1>
          <p className="text-sm text-gray-500 mt-1">
            You have {scheduledPosts.length} scheduled posts. The next post will
            be published on{" "}
            {scheduledPosts[0]?.scheduledFor &&
              new Date(scheduledPosts[0].scheduledFor).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }
              )}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setIsScheduleModalOpen(true)}
        >
          Edit post schedule
        </Button>
      </div>

      <ScheduleEditorModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
      />

      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="mb-4 bg-transparent p-0 gap-2">
          <TabsTrigger
            value="scheduled"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            Scheduled
            <span className="ml-1.5 bg-blue-100 text-blue-600 px-1.5 rounded-full">
              {scheduledPosts.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="published"
            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-600"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Published
            <span className="ml-1.5 bg-green-100 text-green-600 px-1.5 rounded-full">
              2
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="errors"
            className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600"
          >
            <AlertCircle className="w-4 h-4 mr-1.5" />
            Errors
            <span className="ml-1.5 bg-red-100 text-red-600 px-1.5 rounded-full">
              0
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled">
          <div className="space-y-4">
            {generateTimeSlots().map((slot, index) => {
              const post = scheduledPosts.find(
                (p) =>
                  new Date(p.scheduledFor).toISOString() ===
                  slot.date.toISOString()
              );

              return (
                <div
                  key={slot.date.toISOString()}
                  className="border-b border-gray-100 last:border-0 pb-4"
                >
                  {index === 0 ||
                  new Date(slot.date).getDate() !==
                    new Date(generateTimeSlots()[index - 1].date).getDate() ? (
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-medium">
                        {slot.date.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </h3>
                      <span className="text-gray-500">
                        {slot.date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gray-500">
                      {slot.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                    {post ? (
                      <div className="flex-1 flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-sm line-clamp-1">
                            {post.content}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start text-gray-500 border border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to queue
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="published">
          <div className="text-sm text-gray-500 text-center py-8">
            No published posts yet
          </div>
        </TabsContent>

        <TabsContent value="errors">
          <div className="text-sm text-gray-500 text-center py-8">
            No errors
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
