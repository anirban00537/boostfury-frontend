import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  X,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Slide } from "@/types";
import { Button } from "@/components/ui/button";

interface SlideControlsProps {
  index: number;
  slide: Slide;
  handleInsertSlide: (index: number) => void;
  handleCopySlide: (index: number) => void;
  handleDeleteSlide: (index: number) => void;
  handleMoveSlideLeft: (index: number) => void;
  handleMoveSlideRight: (index: number) => void;
  handleImageIconClick: (index: number, type: "background" | "slide") => void;
  handleSettingChange: (
    index: number,
    setting: keyof Slide,
    value: boolean
  ) => void;
  handleRemoveImage: (index: number) => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({
  index,
  slide,
  handleInsertSlide,
  handleCopySlide,
  handleDeleteSlide,
  handleMoveSlideLeft,
  handleMoveSlideRight,
  handleImageIconClick,
  handleSettingChange,
  handleRemoveImage,
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const ControlButton = ({
    onClick,
    title,
    icon: Icon,
  }: {
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
    title: string;
    icon: React.ElementType;
  }) => (
    <button
      className="flex items-center justify-center bg-background/50 text-textColor border border-borderColor rounded-md hover:bg-primary/20 hover:border-primary hover:text-primary transition-colors duration-200 h-8 w-8"
      onClick={onClick}
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-cardBackground/80 backdrop-blur-sm border rounded-t-lg ">
      <div className="flex items-center space-x-2">
        <ControlButton
          onClick={() => handleInsertSlide(index)}
          title="Insert new slide"
          icon={Plus}
        />
        <ControlButton
          onClick={() => handleCopySlide(index)}
          title="Copy slide"
          icon={Copy}
        />
        <ControlButton
          onClick={() => handleDeleteSlide(index)}
          title="Delete slide"
          icon={Trash2}
        />
        <ControlButton
          onClick={(e) => {
            e.stopPropagation();
            handleMoveSlideLeft(index);
          }}
          title="Move slide left"
          icon={ArrowLeft}
        />
        <ControlButton
          onClick={(e) => {
            e.stopPropagation();
            handleMoveSlideRight(index);
          }}
          title="Move slide right"
          icon={ArrowRight}
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          {slide.backgroundImage ? (
            <div className="relative h-8 w-8 rounded-md overflow-hidden border border-borderColor">
              <img
                src={slide.backgroundImage}
                alt="Background"
                onClick={() => handleImageIconClick(index, "background")}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-0 right-0 bg-cardBackground/80 hover:bg-cardBackground text-primary hover:text-primary/80 rounded-bl-md transition-colors duration-200"
                onClick={() => {
                  handleRemoveImage(index);
                  setShowImagePreview(false);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <ControlButton
              onClick={() => handleImageIconClick(index, "background")}
              title="Add background image"
              icon={ImageIcon}
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center bg-background/50  border border-borderColor rounded-md hover:bg-primary/20 hover:border-primary hover:text-primary transition-colors duration-200 h-8 w-8"
              title="Slide settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cardBackground text-textColor border-borderColor">
            <DropdownMenuLabel>Slide Settings</DropdownMenuLabel>
            {(
              [
                { value: "showImage", label: "Show Image" },
                { value: "showTagline", label: "Show Tagline" },
                { value: "showTitle", label: "Show Title" },
                { value: "showDescription", label: "Show Description" },
              ] as const
            ).map((setting) => (
              <DropdownMenuItem
                key={setting.value}
                className="flex items-center justify-between"
              >
                <span>{setting.label}</span>
                <Switch
                  checked={slide[setting.value]}
                  className="data-[state=checked]:bg-primary bg-background data-[state=unchecked]:bg-primary/50"
                  onCheckedChange={(checked) =>
                    handleSettingChange(index, setting.value, checked)
                  }
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SlideControls;
