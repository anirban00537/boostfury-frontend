import React, { useEffect, useState } from "react";
import { Wand2, User, Type, Image, Shapes, Palette } from "lucide-react";
import AiSettingsComponent from "./Ai.comp";
import BrandingSection from "./Branding.comp";
import TextSettingsSection from "./Text-Settings.comp";
import BackgroundColorsSection from "./Background.comp";
import BackgroundPatternsAndElements from "./Background-Patterns-Elements.comp";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import BackgroundImagesSection from "./Background-ImagesSection";
import { FaPallet } from "react-icons/fa";

interface MainSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("ai-settings");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(tab);
      setIsCollapsed(false);
    }
  }, [searchParams, setIsCollapsed]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsCollapsed(false);

    // Create a new URLSearchParams object with the current query parameters
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    // Update or add the 'tab' parameter
    newSearchParams?.set("tab", tab);

    // Construct the new URL with updated query parameters
    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    // Use router.push to navigate to the new URL
    router.push(newUrl);
  };

  return (
    <div
      className={`flex flex-col md:flex-row h-screen transition-all duration-200 ${
        isCollapsed ? "w-[80px]" : "w-full md:w-[420px]"
      } bg-white border-r border-gray-200`}
    >
      <div className="sticky top-0 w-full md:w-[80px] order-first md:order-first border-r border-gray-200 bg-white">
        <div className="flex flex-wrap md:flex-col w-full h-full justify-start items-center border-b md:border-b-0 border-gray-200">
          {[
            { name: "ai-settings", icon: <Wand2 size={18} />, label: "AI" },
            { name: "branding", icon: <User size={18} />, label: "Brand" },
            { name: "text-settings", icon: <Type size={18} />, label: "Text" },
            { name: "background", icon: <Palette size={18} />, label: "Color" },
            {
              name: "patterns-elements",
              icon: <Shapes size={18} />,
              label: "Elements",
            },
            {
              name: "background-images",
              icon: <Image size={18} />,
              label: "Images",
            },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`flex flex-col items-center justify-center m-1 transition-all rounded-lg w-[60px] h-[60px] ${
                activeTab === tab.name
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:ring-1 hover:ring-gray-200"
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.icon}
              <span
                className={`text-xs mt-1.5 font-medium ${
                  activeTab === tab.name ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`flex-1 bg-white overflow-hidden transition-all transform ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {activeTab === "ai-settings" && <AiSettingsComponent />}
        {activeTab === "branding" && <BrandingSection />}
        {activeTab === "text-settings" && <TextSettingsSection />}
        {activeTab === "background" && <BackgroundColorsSection />}
        {activeTab === "patterns-elements" && <BackgroundPatternsAndElements />}
        {activeTab === "background-images" && <BackgroundImagesSection />}
      </div>
    </div>
  );
};

export default MainSidebar;
