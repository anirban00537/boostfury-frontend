"use client";

import { PostCard, Post } from "@/components/post-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Temporary mock data
const mockDrafts: Post[] = [
  {
    id: 1,
    content: `🚀 Just hit a major milestone in my journey as a software engineer!

After 6 months of dedicated learning and building, I'm excited to share that I've successfully launched my first SaaS product that helps businesses automate their workflow.

Key learnings along the way:
• Start small, but think big
• Listen to user feedback religiously
• Done is better than perfect
• Consistency beats intensity

#softwareengineering #entrepreneurship #saas`,
    createdAt: new Date("2024-01-16T10:00:00"),
    updatedAt: new Date("2024-01-16T10:00:00"),
  },
  {
    id: 2,
    content: `💡 Quick tip for aspiring developers:

One of the most valuable habits I've developed is documenting my learning journey. Here's why:

• Helps solidify your understanding
• Creates a personal knowledge base
• Helps others learn from your experience
• Shows your growth over time

What's your favorite way to document your learning?

#coding #webdevelopment #learning`,
    createdAt: new Date("2024-01-15T14:00:00"),
    updatedAt: new Date("2024-01-15T16:30:00"),
  },
];

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Post[]>(mockDrafts);
  const router = useRouter();

  const handleDelete = (draftId: number) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
  };

  return (
    <div className="mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">My drafts</h1>
          <p className="text-sm text-gray-500 mt-1">
            You have {drafts.length} saved drafts. Last updated on{" "}
            {drafts[0]?.updatedAt &&
              new Date(drafts[0].updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/ai-writer")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-4 h-10 hover:from-blue-600 hover:to-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 bg-transparent p-0 gap-2">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            All Drafts
            <span className="ml-1.5 bg-blue-100 text-blue-600 px-1.5 rounded-full">
              {drafts.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            Recently Updated
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {drafts.map((draft, index) => (
              <div
                key={draft.id}
                className="border-b border-gray-100 last:border-0 pb-4"
              >
                {index === 0 ||
                new Date(draft.updatedAt).toDateString() !==
                  new Date(drafts[index - 1].updatedAt).toDateString() ? (
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-medium">
                      {new Date(draft.updatedAt).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </h3>
                    <span className="text-gray-500">
                      {new Date(draft.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ) : null}

                <PostCard
                  post={draft}
                  onDelete={handleDelete}
                  editPath="/dashboard/ai-writer?draft="
                />
              </div>
            ))}

            {drafts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No drafts yet</p>
                <Button
                  onClick={() => router.push("/dashboard/ai-writer")}
                  variant="outline"
                  className="mt-4"
                >
                  Create your first post
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="space-y-4">
            {drafts
              .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
              .slice(0, 5)
              .map((draft) => (
                <div
                  key={draft.id}
                  className="border-b border-gray-100 last:border-0 pb-4"
                >
                  <PostCard
                    post={draft}
                    onDelete={handleDelete}
                    editPath="/dashboard/ai-writer?draft="
                  />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
