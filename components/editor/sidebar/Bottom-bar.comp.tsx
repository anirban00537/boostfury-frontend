import React from "react";
import { Plus, Download, Save, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { setNewCarousel, setProperty } from "@/state/slice/carousel.slice";
import DownloadDropdown from "../navbar/Download-Dropdown.comp";
import useCarousel from "@/hooks/useCarousel";
import { Button } from "@/components/ui/button";

const Bottombar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { name } = useSelector((state: RootState) => state.slides);
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const { isAuthenticated, createOrUpdateCarousel, isCreatingOrUpdating } =
    useCarouselManager();
  const searchParams = new URLSearchParams(window.location.search);
  const carouselId = searchParams.get("id");

  const handleAddNew = () => {
    dispatch(setNewCarousel());
    router.replace("/carousel-editor");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProperty({ key: "name", value: e.target.value }));
  };

  const handleSaveCarousel = () => {
    if (createOrUpdateCarousel) {
      createOrUpdateCarousel({
        newName: name || "Default Carousel",
        id: carouselId ?? undefined,
      });
    }
  };

  const handleLoginRequired = () => {
    // Implement login modal logic
  };

  const buttonClasses = "h-10 px-4 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white \
    hover:from-blue-600 hover:via-blue-700 hover:to-blue-900 shadow-sm \
    flex items-center gap-2 justify-center transition-all duration-200";

  return (
    <div className="border-t border-gray-200 bg-white p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Button
          onClick={handleAddNew}
          className={buttonClasses}
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New Carousel</span>
        </Button>

        <div className="flex-1">
          <div className="flex items-center bg-gray-50 rounded-xl h-10 w-full transition-all duration-200 focus-within:ring-1 focus-within:ring-blue-200">
            <Edit className="w-4 h-4 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Carousel Name"
              className="w-full bg-transparent text-gray-700 px-3 focus:outline-none text-sm"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <DownloadDropdown
          onDownloadPDF={exportSlidesToPDF}
          onDownloadZip={exportSlidesToZip}
          pdfLoading={pdfLoading}
          zipLoading={zipLoading}
          isAuthenticated={isAuthenticated}
          onLoginRequired={handleLoginRequired}
          className="flex-1"
        />

        <Button
          onClick={handleSaveCarousel}
          disabled={isCreatingOrUpdating || !isAuthenticated}
          className={`${buttonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
          variant="outline"
        >
          <Save className="h-4 w-4" />
          <span className="text-sm font-medium">Save Carousel</span>
        </Button>
      </div>
    </div>
  );
};

export default Bottombar;
