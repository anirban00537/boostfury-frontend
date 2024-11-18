"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Save, Plus, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const AISettingsPage = () => {
  const [topics, setTopics] = React.useState<string[]>([]);
  const [newTopic, setNewTopic] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddTopic = useCallback(() => {
    if (newTopic.trim()) {
      setTopics((prev) => [...prev, newTopic.trim()]);
      setNewTopic("");
    }
  }, [newTopic]);

  const handleRemoveTopic = useCallback((topicToRemove: string) => {
    setTopics((prev) => prev.filter((topic) => topic !== topicToRemove));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      // Add your save logic here
      toast.success("AI settings saved successfully");
    } catch (error) {
      toast.error("Failed to save AI settings");
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                AI Settings
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Customize your AI assistant's personality and expertise
              </p>
            </div>
            <Button
              onClick={handleSave}
              className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white 
                        transition-all duration-200 shadow-sm"
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-8 py-6">
        <div className="grid gap-6">
          {/* AI Description Card */}
          <Card>
            <CardHeader>
              <CardTitle>AI Personality</CardTitle>
              <CardDescription>
                Define how your AI assistant should present itself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="I am an AI assistant specialized in..."
                className="min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Topics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Expertise Topics</CardTitle>
              <CardDescription>
                Add topics that your AI assistant is knowledgeable about
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a new topic..."
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTopic()}
                />
                <Button
                  onClick={handleAddTopic}
                  className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2"
                  >
                    <Tag className="h-3 w-3" />
                    {topic}
                    <button
                      onClick={() => handleRemoveTopic(topic)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
