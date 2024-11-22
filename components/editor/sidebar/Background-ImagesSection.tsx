import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundImageToAllSlides } from "@/state/slice/carousel.slice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { X, Upload, Check, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const backgroundImages = [
  "https://images.unsplash.com/photo-1589810264340-0ce27bfbf751?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579546928937-641f7ac9bced?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1668359407785-ac5dca1de611?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710162734220-d543f0dff259?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644426358808-d5db8b4735a0?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710162734239-f2368bc6fae1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184713246-91865a6123dc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184121903-64d5fdf9f603?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184122027-bdd5ac4675bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184122196-e47fdcb8631d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710166755608-58b3d62db3a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const BackgroundImagesSection = () => {
  const dispatch = useDispatch();
  const { globalBackground } = useSelector((state: RootState) => state.slides);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackgroundImageSelect = (imageUrl: string) => {
    dispatch(setBackgroundImageToAllSlides(imageUrl));
  };

  const handleImageUpload = (url: string) => {
    handleBackgroundImageSelect(url);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-600" />
          Background Image
        </h2>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {globalBackground ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-white p-4 rounded-lg ring-1 ring-gray-200 hover:ring-blue-200 transition-all duration-200"
          >
            <div className="relative w-24 h-24 rounded-lg overflow-hidden mr-4">
              <Image
                src={globalBackground}
                alt="Current Background"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Current background
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="w-full h-9 text-sm font-medium text-red-600 bg-red-50 ring-1 ring-red-200 hover:bg-red-100 transition-all duration-200"
                onClick={() => dispatch(setBackgroundImageToAllSlides(null))}
              >
                <X size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center w-full h-24 bg-gray-50 rounded-lg ring-1 ring-gray-200 ring-dashed"
          >
            <p className="text-sm text-gray-500">No background selected</p>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Choose an image</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsModalOpen(true)}
            className="h-9 text-sm font-medium text-gray-700 bg-white ring-1 ring-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pb-6">
          {backgroundImages.map((imageUrl, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-square cursor-pointer rounded-lg overflow-hidden ring-1 ring-gray-200 hover:ring-blue-200 transition-all duration-200"
              onClick={() => handleBackgroundImageSelect(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Background ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200" />
              {globalBackground === imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                  <Check size={20} className="text-blue-600" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundImagesSection;
