import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalCount,
  onPageChange,
  itemsPerPage = 10 
}: PaginationProps) => {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="mt-6 flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-200/80 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-600 font-medium">
          {totalCount}
        </div>
        <span className="text-gray-500">
          {totalCount === 0 ? (
            "No results found"
          ) : (
            `Showing ${start} to ${end} of ${totalCount} results`
          )}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 pl-3 pr-4 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/80
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200
            hover:border-gray-300 disabled:hover:border-gray-200/80"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Previous</span>
        </Button>
        
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.max(1, totalPages) }, (_, i) => (
            <Button
              key={i}
              onClick={() => onPageChange(i + 1)}
              disabled={totalCount === 0}
              variant="outline"
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                ${currentPage === i + 1
                  ? "bg-primary text-white shadow-sm hover:bg-primary/90 border-primary hover:border-primary/90"
                  : "text-gray-600 hover:text-gray-900 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                ${currentPage === i + 1 ? "scale-105" : "hover:scale-105"}
              `}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalCount === 0}
          className="h-9 pl-4 pr-3 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/80
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200
            hover:border-gray-300 disabled:hover:border-gray-200/80"
          variant="outline"
        >
          <span className="text-sm font-medium">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
