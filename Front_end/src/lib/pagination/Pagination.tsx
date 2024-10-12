import React, { useMemo } from 'react';



interface PaginationProps<T> {
  items: T[];
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}


const Pagination = <T,>({ items, pageSize, currentPage, onPageChange }: PaginationProps<T>) => {

  const totalPages = useMemo(() => Math.ceil(items.length / pageSize), [items.length, pageSize]);
  const previousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };


  return (
    <div className="mt-4 flex justify-center mb-10">
      <button
        className="px-4 py-2 border border-black text-black hover:text-white hover:bg-black"
        onClick={previousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 border-black text-black">{currentPage}</span>
      <button
        className="px-8 py-2 border border-black text-black hover:text-white hover:bg-black"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;