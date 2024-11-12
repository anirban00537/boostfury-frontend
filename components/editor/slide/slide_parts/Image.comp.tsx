import React, { useState } from "react";
import FileUploadModal from "../../file_upload_modal/file-Upload-Modal.comp";
import { Slide } from "@/types";
import useCarousel from "@/hooks/useCarousel";
import { ImagePlus, X } from "lucide-react";

interface ImageProps {
  imageUrl: string | null;
  index: number;
  updateSlide: (index: number, updatedSlide: Partial<Slide>) => void;
}

const Image: React.FC<ImageProps> = ({ imageUrl, index, updateSlide }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    handleImageSelect,
    handleImageIconClick,
    isModalOpen,
    setIsModalOpen,
  } = useCarousel();

  const handleImageClick = () => {
    handleImageIconClick(index, "slide");
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateSlide(index, { imageUrl: null });
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    overflow: "hidden",
    borderRadius: "3px",
    padding: "7px",
    width: imageUrl ? "auto" : "100%",
    height: imageUrl ? "auto" : "200px",
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    cursor: "pointer",
  };

  const removeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
    padding: "4px",
    display: isHovered ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
  };

  return (
    <>
      <div
        style={containerStyle}
        onClick={handleImageClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Slide image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "3px",
              }}
            />
            <div style={removeButtonStyle} onClick={handleRemoveImage}>
              <X size={16} color="black" />
            </div>
          </>
        ) : (
          <ImagePlus size={48} color="rgba(128, 128, 128, 0.5)" />
        )}
      </div>
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </>
  );
};

export default Image;
