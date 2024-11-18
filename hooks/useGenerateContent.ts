import {
  generateCarouselContent,
  generateContentIdeasForWorkspace,
} from "@/services/ai-content";
import { addAllSlides, setBackground } from "@/state/slice/carousel.slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./useAuth";
import { RootState } from "@/state/store";
import { useQuery } from "react-query";
import { ResponseData } from "@/types";

export const useGenerateContent = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [language, setLanguage] = useState("en");
  const [mood, setMood] = useState("Neutral");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [contentStyle, setContentStyle] = useState("Professional");
  const [targetAudience, setTargetAudience] = useState("General");
  const [themeActive, setThemeActive] = useState(false);
  const dispatch = useDispatch();
  const { refetchSubscription } = useAuth();

  const generateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateCarouselContent(
        topic,
        numSlides,
        language,
        mood,
        theme,
        contentStyle,
        targetAudience,
        themeActive
      );

      if (result.success) {
        refetchSubscription();
        const { response, colorPalette } = result.data;
        dispatch(addAllSlides(response));
        if (themeActive) {
          dispatch(
            setBackground({
              color1: colorPalette.color1,
              color2: colorPalette.color2,
              color3: colorPalette.color3,
              color4: colorPalette.color4,
            })
          );
        }
      } else {
        throw new Error(result.message || "Failed to generate content");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    topic,
    setTopic,
    numSlides,
    setNumSlides,
    language,
    setLanguage,
    mood,
    setMood,
    loading,
    theme,
    setTheme,
    contentStyle,
    setContentStyle,
    targetAudience,
    setTargetAudience,
    themeActive,
    setThemeActive,
  };
};
