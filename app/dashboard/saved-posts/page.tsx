"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { LinkedInPostPreview } from "@/components/linkedin-post-preview";

// Dummy data for demonstration
const SAVED_POSTS = [
  {
    id: "1",
    content:
      "Excited to announce that we've just launched our new AI-powered analytics dashboard! 🚀 Early access is now available for our Pro users. Here's what you can expect:\n\n• Real-time data visualization\n• Predictive analytics\n• Custom reporting\n• Integration with popular tools\n\nDM me if you'd like to try it out!",
    createdAt: "2024-01-15T10:30:00",
    scheduledFor: "2024-01-20T12:00:00",
    status: "scheduled",
  },
  {
    id: "2",
    content:
      "Just wrapped up an amazing webinar on 'Building Scalable AI Solutions' with industry experts! 🎯 Here are the key takeaways:\n\n1. Start small, think big\n2. Focus on data quality\n3. Choose the right architecture\n4. Monitor and iterate\n\nMissed it? Don't worry - recording will be available next week!",
    createdAt: "2024-01-14T15:45:00",
    status: "draft",
  },
  // Add more dummy posts as needed
];

export default function SavedPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = SAVED_POSTS.filter((post) => {
    const matchesSearch = post.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Saved Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your saved LinkedIn posts
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 group hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {post.status === "scheduled" && (
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        <Clock className="h-3 w-3 mr-1" />
                        Scheduled
                      </Badge>
                    )}
                    {post.status === "draft" && (
                      <Badge variant="secondary">
                        <Edit2 className="h-3 w-3 mr-1" />
                        Draft
                      </Badge>
                    )}
                    {post.scheduledFor && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.scheduledFor).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Edit2 className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Trash2 className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-3.5 w-3.5 text-gray-500" />
                  </Button>
                </div>
              </div>

              <LinkedInPostPreview content={post.content} />
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No posts found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
