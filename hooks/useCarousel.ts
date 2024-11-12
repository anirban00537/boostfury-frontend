import { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Slide } from "@/types";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  moveSlideLeft,
  moveSlideRight,
  removeBackgroundImage,
  setBackground,
} from "@/state/slice/carousel.slice";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { setCarouselDownloading } from "@/state/slice/user.slice";
import { lightColorPresets } from "@/lib/color-presets";
import { toast } from "react-hot-toast";
import { scheduleCarouselPdf } from "@/services/carousels.service";
import { useRouter } from "next/navigation";
import { generateLinkedinPostContentForCarousel } from "@/services/ai-content";

const useCarousel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slides, layout, background } = useSelector(
    (state: RootState) => state.slides
  );
  const { color1, color2, color3, color4 } = background;
  const { carouselDownloading } = useSelector((state: RootState) => state.user);
  const swiperRef = useRef<any>(null);
  const [zipLoading, setZipLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkedinText, setLinkedinText] = useState("");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null);
  const [imageType, setImageType] = useState<"background" | "slide">(
    "background"
  );
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--color4", color4);
  }, [color4]);

  const handleSlideClick = useCallback(
    (index: number) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index, 500);
      }
    },
    [swiperRef]
  );

  const handleInsertSlide = useCallback(
    (index: number) => {
      dispatch(insertSlide(index));
    },
    [dispatch]
  );

  const handleCopySlide = useCallback(
    (index: number) => {
      dispatch(copySlide(index));
    },
    [dispatch]
  );

  const handleDeleteSlide = useCallback(
    (index: number) => {
      dispatch(deleteSlide(index));
    },
    [dispatch]
  );

  const handleUpdateSlide = useCallback(
    (index: number, updatedSlide: Partial<Slide>) => {
      dispatch(updateSlide({ index, updatedSlide }));
    },
    [dispatch]
  );

  const handleMoveSlideLeft = useCallback(
    (index: number) => {
      dispatch(moveSlideLeft(index));
    },
    [dispatch]
  );

  const handleMoveSlideRight = useCallback(
    (index: number) => {
      dispatch(moveSlideRight(index));
    },
    [dispatch]
  );

  const handleImageIconClick = useCallback(
    (index: number, type: "background" | "slide") => {
      setActiveSlideIndex(index);
      setImageType(type);
      setIsModalOpen(true);
    },
    []
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      dispatch(removeBackgroundImage(index));
    },
    [dispatch]
  );
  const handleImageSelect = useCallback(
    (url: string) => {
      if (activeSlideIndex !== null) {
        const updatedSlide = {
          ...slides[activeSlideIndex],
          [imageType === "background" ? "backgroundImage" : "imageUrl"]: url,
        };
        handleUpdateSlide(activeSlideIndex, updatedSlide);
      }
      setIsModalOpen(false);
    },
    [activeSlideIndex, imageType, slides, handleUpdateSlide]
  );

  const handleImageUrlChange = useCallback(
    (index: number, setting: keyof Slide, value: boolean) => {
      dispatch(
        updateSlide({
          index,
          updatedSlide: { [setting]: value },
        })
      );
    },
    [dispatch]
  );
  const handleSettingChange = useCallback(
    (index: number, setting: keyof Slide, value: boolean) => {
      dispatch(
        updateSlide({
          index,
          updatedSlide: { [setting]: value },
        })
      );
    },
    [dispatch]
  );
  const exportSlidesToZip = useCallback(async () => {
    dispatch(setCarouselDownloading(true));
    setZipLoading(true);
    const zip = new JSZip();
    const scaleFactor = 3; // Adjust the scale factor for higher quality

    const captureSlide = async (index: number) => {
      const slideElement = document.getElementById(`slide-${index}`);
      if (slideElement) {
        try {
          // Wait for a short time to ensure the slide is fully rendered
          await new Promise((resolve) => setTimeout(resolve, 100));

          const pngDataUrl = await toPng(slideElement, {
            cacheBust: true,
            pixelRatio: scaleFactor,
          });

          const response = await fetch(pngDataUrl);
          const blob = await response.blob();
          zip.file(`slide-${index + 1}.png`, blob);
        } catch (error) {
          console.error(`Failed to export slide ${index + 1} as image`, error);
        }
      } else {
        console.warn(`Slide element with ID slide-${index} not found`);
      }
    };

    // Capture all slides sequentially
    for (let i = 0; i < slides.length; i++) {
      await captureSlide(i);
    }

    await zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "slides.zip");
      setZipLoading(false);
    });
    dispatch(setCarouselDownloading(false));
  }, [slides, layout.width, layout.height]);

  const exportSlidesToPDF = useCallback(async () => {
    dispatch(setCarouselDownloading(true));
    setPdfLoading(true);
    const pdf = new jsPDF("p", "px", [layout.width, layout.height]);
    const scaleFactor = 3; // Adjust the scale factor for higher quality

    const captureSlide = async (index: number) => {
      const slideElement = document.getElementById(`slide-${index}`);
      if (slideElement) {
        try {
          // Wait for a short time to ensure the slide is fully rendered
          await new Promise((resolve) => setTimeout(resolve, 100));

          const pngDataUrl = await toPng(slideElement, {
            cacheBust: true,
            pixelRatio: scaleFactor,
          });

          if (index !== 0) {
            pdf.addPage();
          }
          pdf.addImage(
            pngDataUrl,
            "PNG",
            0,
            0,
            layout.width,
            layout.height,
            undefined,
            "FAST" // Use FAST compression to reduce file size
          );
        } catch (error) {
          console.error(`Failed to export slide ${index + 1} as image`, error);
        }
      } else {
        console.warn(`Slide element with ID slide-${index} not found`);
      }
    };

    // Capture all slides sequentially
    for (let i = 0; i < slides.length; i++) {
      await captureSlide(i);
    }

    await pdf.save("carousel_slides.pdf");
    setPdfLoading(false);
    dispatch(setCarouselDownloading(false));
  }, [slides, layout.width, layout.height]);

  const createPDFFromImages = useCallback(
    async (images: string[]) => {
      const pdf = new jsPDF("p", "px", [layout.width, layout.height]);

      try {
        // Add each image to the PDF
        for (let i = 0; i < images.length; i++) {
          if (i !== 0) {
            pdf.addPage();
          }

          pdf.addImage(
            images[i],
            "PNG",
            0,
            0,
            layout.width,
            layout.height,
            undefined,
            "FAST"
          );
        }

        return pdf.output("blob");
      } catch (error) {
        console.error("Failed to create PDF:", error);
        throw new Error("Failed to create PDF from images");
      }
    },
    [layout.width, layout.height]
  );

  const convertSlidesToImages = useCallback(async () => {
    setIsConverting(true);
    const images: string[] = [];
    const scaleFactor = 3;

    try {
      for (let i = 0; i < slides.length; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        if (slideElement) {
          await new Promise((resolve) => setTimeout(resolve, 100));

          const pngDataUrl = await toPng(slideElement, {
            cacheBust: true,
            pixelRatio: scaleFactor,
            backgroundColor: "#fff",
          });

          images.push(pngDataUrl);
        }
      }

      setPreviewImages(images);
      return images;
    } catch (error) {
      console.error("Failed to convert slides to images:", error);
      toast.error("Failed to generate preview images");
      return [];
    } finally {
      setIsConverting(false);
    }
  }, [slides]);

  const exportSlidesToPDFThenSchedule = useCallback(
    async (carouselId: string) => {
      dispatch(setCarouselDownloading(true));

      try {
        const pdf = new jsPDF("p", "px", [layout.width, layout.height]);
        const scaleFactor = 3;

        for (let i = 0; i < slides.length; i++) {
          const slideElement = document.getElementById(`slide-${i}`);
          if (slideElement) {
            await new Promise((resolve) => setTimeout(resolve, 100));

            const pngDataUrl = await toPng(slideElement, {
              cacheBust: true,
              pixelRatio: scaleFactor,
            });

            if (i !== 0) {
              pdf.addPage();
            }

            pdf.addImage(
              pngDataUrl,
              "PNG",
              0,
              0,
              layout.width,
              layout.height,
              undefined,
              "FAST"
            );
          }
        }

        const pdfOutput = pdf.output("blob");
        const formData = new FormData();
        formData.append("file", pdfOutput, "carousel.pdf");
        formData.append("carouselId", carouselId);
        formData.append("content", linkedinText);

        const response = await scheduleCarouselPdf(formData);

        if (response.success) {
          const postId = response.data.post.post.id;
          toast.success("Carousel scheduled successfully!");
          router.push(`/compose?draft_id=${postId}`);
        } else {
          toast.error("Failed to schedule carousel");
        }
      } catch (error) {
        console.error("Schedule error:", error);
        toast.error("Failed to schedule carousel");
      } finally {
        dispatch(setCarouselDownloading(false));
      }
    },
    [slides, layout.width, layout.height, router, linkedinText]
  );

  const generateAIContent = useCallback(async (topic: string) => {
    setIsGeneratingContent(true);
    try {
      const response = await generateLinkedinPostContentForCarousel(topic);
      if (response.success) {
        setLinkedinText(response.data.post);
        return response.data;
      } else {
        throw new Error("Failed to generate content");
      }
    } catch (error) {
      console.error("AI content generation error:", error);
      toast.error("Failed to generate content");
      throw error;
    } finally {
      setIsGeneratingContent(false);
    }
  }, []);

  return {
    swiperRef,
    slides,
    layout,
    isModalOpen,
    setIsModalOpen,
    activeSlideIndex,
    handleSlideClick,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    handleMoveSlideLeft,
    handleMoveSlideRight,
    handleImageIconClick,
    handleImageSelect,
    handleSettingChange,
    handleImageUrlChange,
    exportSlidesToZip,
    exportSlidesToPDF,
    zipLoading,
    pdfLoading,
    handleRemoveImage,
    carouselDownloading,
    convertSlidesToImages,
    previewImages,
    isConverting,
    createPDFFromImages,
    exportSlidesToPDFThenSchedule,
    linkedinText,
    setLinkedinText,
    generateAIContent,
    isGeneratingContent,
  };
};

export default useCarousel;
