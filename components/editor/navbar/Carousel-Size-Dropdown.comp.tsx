import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setLayoutHeightAndWidth } from "@/state/slice/carousel.slice";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram } from "react-icons/fa";

interface CarouselSizeDropdownProps {
  className?: string;
}

const sizes = [
  {
    name: "Square",
    ratio: "1:1",
    width: 600,
    height: 600,
    icons: [FaInstagram, FaLinkedinIn, FaFacebookF],
  },
  {
    name: "Portrait",
    ratio: "3:4",
    width: 540,
    height: 720,
    icons: [FaInstagram, FaTiktok],
  },
  {
    name: "Carousel",
    ratio: "4:5",
    width: 576,
    height: 720,
    icons: [FaInstagram, FaFacebookF],
  },
  {
    name: "Story Carousel",
    ratio: "9:16",
    width: 540,
    height: 960,
    icons: [FaInstagram, FaFacebookF, FaTiktok],
  },
  {
    name: "Landscape",
    ratio: "4:3",
    width: 720,
    height: 540,
    icons: [FaInstagram, FaFacebookF],
  },
  {
    name: "Presentation",
    ratio: "16:9",
    width: 800,
    height: 450,
    icons: [FaLinkedinIn, FaInstagram],
  },
];

const CarouselSizeDropdown: React.FC<CarouselSizeDropdownProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(
    (state: RootState) => state.slides.layout
  );

  const handleSizeChange = (width: number, height: number) => {
    dispatch(setLayoutHeightAndWidth({ width, height }));
  };

  const renderIcons = (icons: typeof FaInstagram[]) => {
    return icons.map((Icon, index) => (
      <Icon 
        key={index} 
        className="w-3.5 h-3.5 mr-1 transition-colors duration-200 text-gray-500 group-hover:text-gray-700" 
      />
    ));
  };

  const selectedSize = sizes.find(size => size.width === width && size.height === height) || sizes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-9 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg transition-all duration-200 group ${className}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderIcons(selectedSize.icons)}
            </div>
            <span className="text-sm font-medium">
              {selectedSize.name} ({selectedSize.ratio})
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 bg-white rounded-lg shadow-lg">
        <DropdownMenuLabel className="text-sm font-medium text-gray-700 px-2 py-1.5">
          Choose size
        </DropdownMenuLabel>
        <div className="max-h-[300px] overflow-y-auto mt-1">
          {sizes.map((size) => (
            <DropdownMenuItem
              key={size.ratio}
              onClick={() => handleSizeChange(size.width, size.height)}
              className={`flex items-center py-2 px-2 rounded-lg cursor-pointer transition-all duration-200 group
                ${
                  size.width === width && size.height === height
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }
              `}
            >
              <div className="flex-1 flex items-center">
                <div className="w-16 flex items-center">
                  {renderIcons(size.icons)}
                </div>
                <div className="flex flex-col ml-2">
                  <span className={`text-sm font-medium group-hover:text-gray-700 ${
                    size.width === width && size.height === height
                      ? 'text-blue-700'
                      : 'text-gray-600'
                  }`}>
                    {size.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {size.width} x {size.height}px
                  </span>
                </div>
              </div>
              <span className={`text-xs font-medium ml-auto group-hover:text-gray-700 ${
                size.width === width && size.height === height
                  ? 'text-blue-700'
                  : 'text-gray-600'
              }`}>
                {size.ratio}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CarouselSizeDropdown;
