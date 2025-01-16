"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export default function ToneAndVoicePage() {
  const [newTopic, setNewTopic] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [customInstructions, setCustomInstructions] = useState("");

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic("");
    }
  };

  const removeTopic = (topicToRemove: string) => {
    setTopics(topics.filter((topic) => topic !== topicToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTopic();
    }
  };

  return (
    <div className="mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Topics & Instructions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Define your content topics and writing preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[2fr,1.5fr] gap-6">
        <div className="space-y-6">
          {/* Topics Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-3">Topics</h2>
              <div className="flex gap-2">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a topic (e.g., 'AI in Healthcare')"
                  className="flex-1"
                />
                <Button
                  onClick={addTopic}
                  className="bg-blue-600 hover:bg-blue-700 text-xs gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Topic
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 pl-3 pr-2 py-1.5 flex items-center gap-1"
                  >
                    {topic}
                    <button
                      onClick={() => removeTopic(topic)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {topics.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Add topics you want to write about
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-700">
              Writing Instructions
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Add specific instructions for your content (e.g., 'Focus on practical tips', 'Include industry statistics')"
                className="min-h-[200px] border-0 p-0 focus:ring-0 resize-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-sm mb-2">
              Tips for better content
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Add specific topics you're knowledgeable about</li>
              <li>• Be specific with your writing instructions</li>
              <li>• Include your preferred content style</li>
              <li>• Mention any industry-specific terms to use</li>
            </ul>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={topics.length === 0}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
