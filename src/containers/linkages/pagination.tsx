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
    <div className="w-full flex flex-row items-center justify-between my-10 px-4">
      <div className="">
        <button
          className="text-sm"
          onClick={handlePreviousPage}
          disabled={!pagination?.hasPreviousPage}
        >
          Prev Page
        </button>
      </div>

      <div className="flex gap-2 flex-row items-center justify-center self-center xs:self-end pt-6 xs:pt-0">
        Page
        {pagination?.currentPage}
        of {pagination?.totalPages}
      </div>

      <div className="">
        <button
          className="text-sm"
          onClick={handleNextPage}
          disabled={!pagination?.hasNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
