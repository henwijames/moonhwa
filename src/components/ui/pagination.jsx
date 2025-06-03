import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) {
  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    const showStartEllipsis = currentPage > 3;
    const showEndEllipsis = currentPage < totalPages - 2;

    if (showEllipsis) {
      // First page
      pages.push(
        <Button
          key="1"
          variant={currentPage === 1 ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(1)}
          className="h-8 w-8"
        >
          1
        </Button>
      );

      // Start ellipsis
      if (showStartEllipsis) {
        pages.push(
          <Button
            key="start-ellipsis"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
      }

      // Pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i > 1 && i < totalPages) {
          pages.push(
            <Button
              key={i}
              variant={currentPage === i ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(i)}
              className="h-8 w-8"
            >
              {i}
            </Button>
          );
        }
      }

      // End ellipsis
      if (showEndEllipsis) {
        pages.push(
          <Button
            key="end-ellipsis"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
      }

      // Last page
      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(totalPages)}
            className="h-8 w-8"
          >
            {totalPages}
          </Button>
        );
      }
    } else {
      // Show all pages if total pages is less than or equal to 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(i)}
            className="h-8 w-8"
          >
            {i}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
