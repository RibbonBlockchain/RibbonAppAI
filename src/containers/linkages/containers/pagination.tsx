import clsx from "clsx";
import React from "react";

interface PaginationProps {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  pagination: {
    pageSize: number;
    endIndex: number;
    totalPages: number;
    startIndex: number;
    currentPage: number;
    hasNextPage: boolean;
    totalDataSize: number;
    hasPreviousPage: boolean;
  };
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between mt-2 mb-10 px-4">
      <button
        className={clsx(
          "text-sm py-2 px-4 cursor-pointer rounded-md",
          pagination?.hasPreviousPage
            ? "bg-[#dac4fa14] text-white"
            : "bg-stone-400 cursor-not-allowed"
        )}
        onClick={handlePreviousPage}
        disabled={!pagination?.hasPreviousPage}
      >
        Prev Page
      </button>

      <div className="flex gap-2 flex-row items-center justify-center self-center">
        Page {pagination?.currentPage} of {pagination?.totalPages}
      </div>

      <button
        className={clsx(
          "text-sm py-2 px-4 cursor-pointer rounded-md",
          pagination?.hasNextPage
            ? "bg-[#dac4fa14] text-white"
            : "bg-stone-400 cursor-not-allowed"
        )}
        onClick={handleNextPage}
        disabled={!pagination?.hasNextPage}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
