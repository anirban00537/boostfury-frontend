import { FileText, Layout, Wand2, ChevronDown, InfoIcon, CheckIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PostTypeSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
  carouselTemplates: Array<{
    id: string;
    name: string;
    slides: number;
    icon: string;
  }>;
}

export const PostTypeSelector = ({
  activeTab,
  setActiveTab,
  selectedTemplate,
  setSelectedTemplate,
  carouselTemplates,
}: PostTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-600">
            Choose Format
          </span>
          {activeTab === "carousel" && !selectedTemplate && (
            <span className="flex items-center gap-0.5 text-amber-600 text-[10px] bg-amber-50 px-1.5 py-0.5 rounded-full">
              <InfoIcon className="h-3 w-3" />
              Select template
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Compact Post Type Selection */}
        <div className="grid grid-cols-2 gap-2">
          {["text", "carousel"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "text") setSelectedTemplate(null);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-blue-50 ring-1 ring-blue-200"
                    : "bg-white hover:bg-gray-50 ring-1 ring-gray-200"
                }
              `}
            >
              {tab === "text" ? (
                <FileText className={`h-4 w-4 ${activeTab === tab ? "text-blue-500" : "text-gray-400"}`} />
              ) : (
                <Layout className={`h-4 w-4 ${activeTab === tab ? "text-blue-500" : "text-gray-400"}`} />
              )}
              <div className="text-left">
                <div className="text-xs font-medium text-gray-900">
                  {tab === "text" ? "Single Post" : "Carousel Post"}
                </div>
                <p className="text-[10px] text-gray-500">
                  {tab === "text" 
                    ? "Create a single post" 
                    : "Create multiple slides"}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Compact Template Selector */}
        {activeTab === "carousel" && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center justify-between px-3 py-2 rounded-lg
                border border-blue-200 hover:border-blue-300
                bg-blue-50/50 hover:bg-blue-50 transition-all duration-200 w-full">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <Wand2 className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium text-gray-900">
                      {selectedTemplate
                        ? carouselTemplates.find((t) => t.id === selectedTemplate)?.name
                        : "Choose Template"}
                    </div>
                    <p className="text-[10px] text-gray-500">
                      {selectedTemplate
                        ? `${carouselTemplates.find((t) => t.id === selectedTemplate)?.slides} slides`
                        : "Select a template"}
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </DialogTrigger>

            {/* Compact Template Dialog */}
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">
                  Choose Template
                </DialogTitle>
                <p className="text-xs text-gray-500">
                  Select a template for your carousel
                </p>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-2 p-1">
                {carouselTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      const closeButton = document.querySelector('[aria-label="Close"]');
                      if (closeButton instanceof HTMLElement) closeButton.click();
                    }}
                    className={`relative flex items-center gap-2 p-3 rounded-lg transition-all
                      ${
                        selectedTemplate === template.id
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : "hover:bg-gray-50 ring-1 ring-gray-200"
                      }
                    `}
                  >
                    <span className="text-xl">{template.icon}</span>
                    <div className="text-left">
                      <div className="text-xs font-medium text-gray-900">
                        {template.name}
                      </div>
                      <p className="text-[10px] text-gray-500">
                        {template.slides} slides
                      </p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-1.5 right-1.5">
                        <div className="bg-blue-500 text-white p-0.5 rounded-full">
                          <CheckIcon className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
