import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { signOut } from "@/services/auth";
import useCarousel from "@/hooks/useCarousel";
import CarouselListModal from "@/components/editor/Carousel-List-Modal.comp";
import {
  List,
  Plus,
  Menu,
  X,
  Edit,
  LogOut,
  ArrowLeft,
  ListIcon,
  Loader2,
} from "lucide-react";
import { setNewCarousel, setProperty } from "@/state/slice/carousel.slice";
import FullScreenLoading from "@/components/utils-components/loading/Fullscreen.loading.comp";
import Image from "next/image";
import { logout } from "@/state/slice/user.slice";
import Cookies from "js-cookie";
import UserDropdown from "./User-Dropdown.comp";
import DownloadDropdown from "./Download-Dropdown.comp";
import CarouselSizeDropdown from "./Carousel-Size-Dropdown.comp";
import { scheduleCarouselPdf } from "@/services/carousels.service";
import { toast } from "react-hot-toast";
import PreviewModal from "../Preview-Modal.comp";

const EditorNavbar: React.FC = () => {
  const {
    exportSlidesToPDF,
    exportSlidesToZip,
    pdfLoading,
    zipLoading,
    exportSlidesToPDFThenSchedule,
    convertSlidesToImages,
    previewImages,
    isConverting,
    linkedinText,
    setLinkedinText,
    generateAIContent,
    isGeneratingContent,
  } = useCarousel();
  const {
    isFetchingAll,
    isAuthenticated,
    createOrUpdateCarousel,
    isCreatingOrUpdating,
    refetchCarousels,
  } = useCarouselManager();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const searchParams = useSearchParams();
  const carouselId = searchParams?.get("id");
  const dispatch = useDispatch();
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleLogout = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      await signOut(refreshToken);
    }
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  };

  const handleSaveCarousel = useCallback(() => {
    if (createOrUpdateCarousel) {
      createOrUpdateCarousel({
        newName: name || "Default Carousel",
        id: carouselId ?? undefined,
      });
    } else {
      console.error("createOrUpdateCarousel function is not available");
    }
  }, [name, carouselId, createOrUpdateCarousel]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setProperty({ key: "name", value: e.target.value }));
    },
    [dispatch]
  );

  const handleAddNew = useCallback(() => {
    dispatch(setNewCarousel());
    router.replace("/carousel-editor");
  }, [dispatch, router]);
  const handleOpenCarouselModal = useCallback(() => {
    refetchCarousels();
    setIsViewAllModalOpen(true);
  }, [refetchCarousels]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePreviewClick = async () => {
    if (!isAuthenticated) return;

    try {
      // If carousel is not saved (no carouselId), save it first
      if (!carouselId) {
        await createOrUpdateCarousel({
          newName: name || "Default Carousel",
        });
        // Wait a moment for the save to complete and ID to be available
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      await convertSlidesToImages();
      setIsPreviewModalOpen(true);
    } catch (error) {
      toast.error("Failed to generate preview");
    }
  };

  if (isFetchingAll) {
    return <FullScreenLoading />;
  }

  return (
    <>
      <header className="bg-background sticky top-0 z-40 border-b border-gray-200">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/single-logo.svg"
                  height={40}
                  width={40}
                  alt="boostfury.com"
                />
              </Link>

              <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Link href="/ai-writer">
                    <Button
                      className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200  hover:ring-blue-200 hover:text-blue-700  rounded-lg transition-all duration-200"
                      variant="ghost"
                      size="sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 " />
                      <span>Back to Dashboard</span>
                    </Button>
                  </Link>
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button
                    onClick={handleAddNew}
                    className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-blue-200 hover:text-blue-700 rounded-lg transition-all duration-200"
                    variant="ghost"
                    size="sm"
                    disabled={isCreatingOrUpdating}
                  >
                    <Plus className="w-4 h-4 mr-2 " />
                    <span>New</span>
                  </Button>
                </div>
                <div className="flex items-center bg-white ring-1 ring-gray-200 rounded-lg h-9 w-full sm:w-auto transition-all duration-200 focus-within:ring-blue-200">
                  <Edit className="w-4 h-4 mr-2 text-gray-500 ml-3" />
                  <input
                    type="text"
                    placeholder="Carousel Name"
                    className="w-full sm:w-auto border-none bg-transparent text-gray-700 px-2 focus:outline-none rounded-lg text-sm"
                    value={name}
                    onChange={handleNameChange}
                    aria-label="Carousel name"
                  />
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              <Link href="/carousels">
                <Button
                  className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
                  variant="ghost"
                  size="sm"
                >
                  <ListIcon className="w-4 h-4 mr-2 " />
                  <span>{"All Carousels"}</span>
                </Button>
              </Link>{" "}
              <Button
                onClick={handleSaveCarousel}
                disabled={isCreatingOrUpdating || !isAuthenticated}
                className="h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 transition-all duration-200 rounded-lg"
              >
                {isCreatingOrUpdating ? "Saving..." : "Save Progress"}
              </Button>
              <Button
                onClick={handlePreviewClick}
                disabled={!isAuthenticated || isConverting}
                className="h-9 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                className="text-gray-700 hover:bg-gray-50 rounded-lg"
                size="sm"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Collapsible menu for mobile and tablet */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-gray-200">
            <div className="container mx-auto px-4 py-2 space-y-2">
              <Button
                onClick={handleSaveCarousel}
                disabled={isCreatingOrUpdating}
                className="w-full h-9 bg-blue-50 hover:bg-blue-100  text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 rounded-lg transition-all duration-200"
              >
                {isCreatingOrUpdating ? "Saving..." : "Save Carousel"}
              </Button>
              <Button
                onClick={handlePreviewClick}
                disabled={!isAuthenticated || isConverting}
                className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        )}

        <CarouselListModal
          isOpen={isViewAllModalOpen}
          onClose={() => setIsViewAllModalOpen(false)}
        />
      </header>

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        previewImages={previewImages}
        isConverting={isConverting}
        onSchedule={() => {
          if (carouselId) {
            exportSlidesToPDFThenSchedule(carouselId);
            setIsPreviewModalOpen(false);
          }
        }}
        onDownloadZip={exportSlidesToZip}
        onDownloadPdf={exportSlidesToPDF}
        carouselId={carouselId || undefined}
        linkedinText={linkedinText}
        setLinkedinText={setLinkedinText}
        generateAIContent={generateAIContent}
        isGeneratingContent={isGeneratingContent}
      />
    </>
  );
};

export default EditorNavbar;
