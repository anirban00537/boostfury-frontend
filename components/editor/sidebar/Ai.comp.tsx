import React from "react";
import { Sun, Moon, Sparkles, HelpCircle, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useGenerateContent } from "@/hooks/useGenerateContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useRouter } from "next/navigation";

const TooltipComponent = ({ id, content }: { id: string; content: string }) => (
  <Tooltip
    id={id}
    place="left"
    className="z-50 text-xs bg-white text-gray-700 border border-gray-200 rounded-lg shadow-lg p-2"
    data-tooltip-content={content}
  />
);

const AiSettingsComponent = () => {
  const {
    generateContent,
    topic,
    setTopic,
    setNumSlides,
    numSlides,
    setLanguage,
    language,
    setMood,
    mood,
    loading,
    theme,
    setTheme,
    contentStyle,
    setContentStyle,
    targetAudience,
    setTargetAudience,
    themeActive,
    setThemeActive,
  } = useGenerateContent();

  const { subscription } = useSelector((state: RootState) => state.user);
  const isSubscribed = subscription.isActive;

  const router = useRouter();

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribed) {
      generateContent(e);
    } else {
      router.push("/pricing");
    }
  };

  const buttonState = loading
    ? {
        disabled: true,
        content: (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating Content...
          </>
        ),
        className: "bg-blue-600 text-white hover:bg-blue-700",
      }
    : {
        disabled: false,
        content: isSubscribed ? "Generate Content" : "Upgrade to Premium",
        className: isSubscribed
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
      };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <Sparkles size={20} className="text-blue-600" />
          AI Content Generator
        </h2>
      </div>
      <form onSubmit={handleButtonClick} className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              Topic
              <HelpCircle
                data-tooltip-id="topic-tooltip"
                data-tooltip-content="Main subject for AI content"
                className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
              />
            </Label>
            <Textarea
              id="content"
              placeholder="Enter your topic..."
              className="min-h-[6rem] text-sm rounded-lg border border-gray-200 text-gray-700 bg-white resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200"
              value={topic}
              maxLength={100}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Theme Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="theme"
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                Theme
                <HelpCircle
                  data-tooltip-id="theme-tooltip"
                  data-tooltip-content="Color theme for slides"
                  className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                />
              </Label>
              <Switch
                id="theme"
                checked={themeActive}
                onCheckedChange={() => setThemeActive(!themeActive)}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {themeActive && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  className={`flex-1 h-9 text-sm font-medium ${
                    theme === "light"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <Sun size={16} className="mr-2" />
                  Light
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="ghost"
                  className={`flex-1 h-9 text-sm font-medium ${
                    theme === "dark"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon size={16} className="mr-2" />
                  Dark
                </Button>
              </div>
            )}
          </div>

          {/* Number of Slides */}
          <div className="space-y-4">
            <Label
              htmlFor="slides"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              Number of Slides
              <HelpCircle
                data-tooltip-id="slides-tooltip"
                data-tooltip-content="Select slide count"
                className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
              />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                max={10}
                step={1}
                value={[numSlides]}
                onValueChange={(value) => setNumSlides(value[0])}
                className="flex-grow"
              />
              <span className="text-sm text-gray-700 font-medium w-8 text-center bg-gray-50 rounded-lg py-1 border border-gray-200">
                {numSlides}
              </span>
            </div>
          </div>

          {/* Other Settings */}
          <div className="space-y-4">
            {[
              {
                label: "Style",
                value: contentStyle,
                onChange: setContentStyle,
                options: ["Professional", "Casual", "Academic", "Storytelling"],
                tooltip: "Choose writing style",
              },
              {
                label: "Audience",
                value: targetAudience,
                onChange: setTargetAudience,
                options: ["General", "Experts", "Beginners", "Executives"],
                tooltip: "Select target audience",
              },
              {
                label: "Mood",
                value: mood,
                onChange: setMood,
                options: [
                  "Narrative",
                  "Creative",
                  "Happy",
                  "Curious",
                  "Fun",
                  "Neutral",
                ],
                tooltip: "Set content tone",
              },
              {
                label: "Language",
                value: language,
                onChange: setLanguage,
                options: [
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "de", label: "German" },
                  { value: "zh", label: "Chinese" },
                ],
                tooltip: "Choose content language",
              },
            ].map((setting, index) => (
              <div key={index} className="space-y-2">
                <Label
                  htmlFor={setting.label.toLowerCase()}
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  {setting.label}
                  <HelpCircle
                    data-tooltip-id={`${setting.label.toLowerCase()}-tooltip`}
                    data-tooltip-content={setting.tooltip}
                    className="ml-2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                  />
                </Label>
                <Select value={setting.value} onValueChange={setting.onChange}>
                  <SelectTrigger className="w-full h-9 text-sm rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200">
                    <SelectValue placeholder={setting.label} />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-700 border border-gray-200 rounded-lg shadow-lg">
                    {setting.options.map((option) => (
                      <SelectItem
                        key={typeof option === "string" ? option : option.value}
                        value={
                          typeof option === "string" ? option : option.value
                        }
                        className="text-sm py-2 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {typeof option === "string" ? option : option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 mb-32 bg-white border-t border-gray-200 mt-auto">
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            disabled={buttonState.disabled}
            className={`w-full h-10 text-sm font-medium ${buttonState.className}`}
          >
            {buttonState.content}
          </Button>

          {!isSubscribed && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Subscribe to{" "}
              {subscription.subscription?.package.name || "Premium"} to access
              AI content generation
            </p>
          )}
        </div>
      </form>

      {/* Tooltips with updated styling */}
      {[
        { id: "topic-tooltip", content: "Main subject for AI content" },
        { id: "theme-tooltip", content: "Color theme for slides" },
        { id: "slides-tooltip", content: "Select slide count" },
        { id: "style-tooltip", content: "Choose writing style" },
        { id: "audience-tooltip", content: "Select target audience" },
        { id: "mood-tooltip", content: "Set content tone" },
        { id: "language-tooltip", content: "Choose content language" },
      ].map(({ id, content }) => (
        <TooltipComponent key={id} id={id} content={content} />
      ))}
    </div>
  );
};

export default AiSettingsComponent;
