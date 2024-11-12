"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Trash,
  Calendar,
  Layout,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import Link from "next/link";

const CarouselsPage = () => {
  const router = useRouter();
  const {
    carousels,
    pagination,
    deleteCarousel,
    isDeleting,
    isFetchingAll,
    refetchCarousels,
    handlePageChange,
    currentPage,
  } = useCarouselManager();

  const handleDeleteCarousel = useCallback(
    async (carouselId: string) => {
      try {
        await deleteCarousel(carouselId);
        refetchCarousels();
        toast.success("Carousel deleted successfully");
      } catch (error) {
        toast.error("Failed to delete carousel");
      }
    },
    [deleteCarousel, refetchCarousels]
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Carousels
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and organize your carousel presentations
              </p>
            </div>
            <Button
              onClick={() => router.push("/carousel-editor")}
              className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white 
                        transition-all duration-200 shadow-sm"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Carousel
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search carousels..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl 
                         text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-8 py-6">
        {isFetchingAll ? (
          <div className="flex justify-center items-center h-[600px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : !carousels || carousels.length === 0 ? (
          <>
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 
                          min-h-[600px] flex flex-col items-center justify-center">
              <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Layout className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No carousels yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new carousel
              </p>
              <Button
                onClick={() => router.push("/carousel-editor")}
                className="mt-4 h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 
                          text-white transition-all duration-200 shadow-sm"
                variant="outline"
              >
                Create Carousel
              </Button>
            </div>
            <Pagination
              currentPage={1}
              totalPages={1}
              totalCount={0}
              onPageChange={() => {}}
            />
          </>
        ) : (
          <>
            <div className="w-full bg-white rounded-xl border border-gray-200 
                          overflow-hidden min-h-[600px] flex flex-col shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="w-[35%] py-4 text-gray-600 font-medium">
                      Name
                    </TableHead>
                    <TableHead className="w-[20%] py-4 text-gray-600 font-medium">
                      Created
                    </TableHead>
                    <TableHead className="w-[15%] py-4 text-gray-600 font-medium">
                      Slides
                    </TableHead>
                    <TableHead className="w-[15%] py-4 text-gray-600 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="w-[15%] py-4 text-right text-gray-600 font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carousels.map((carousel: any) => (
                    <TableRow
                      key={carousel.id}
                      className="border-b border-gray-100 hover:border-gray-200 
                               hover:bg-primary/[0.02] transition-all duration-200"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg border border-gray-200 
                                        flex items-center justify-center">
                            <Layout className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 truncate 
                                         hover:text-primary transition-colors">
                              {carousel?.data?.name || "Unnamed Carousel"}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              ID: {String(carousel?.id).padStart(4, "0")}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                          {new Date(carousel?.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Layout className="w-4 h-4 mr-1.5 text-gray-400" />
                          {carousel?.data?.slides?.length} slides
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex justify-end gap-2">
                          <Link href={`/carousel-editor?id=${carousel?.id}`}>
                            <Button className="h-8 px-3 rounded-lg text-white 
                                           bg-primary hover:bg-primary/90 
                                           transition-all duration-200 shadow-sm">
                              <FileText className="w-4 h-4 mr-1.5" />
                              Open
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleDeleteCarousel(carousel?.id)}
                            disabled={isDeleting}
                            variant="ghost"
                            className="h-8 px-2 rounded-lg text-gray-600 
                                     hover:text-red-600 border border-gray-200 
                                     hover:border-red-200"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={pagination?.totalPages || 1}
              totalCount={pagination?.totalCount || carousels.length}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CarouselsPage;
