import { useMemo, useState } from 'react';

const usePagination = <T>(items: T[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, currentPage, pageSize]);

  const pageCount = Math.ceil(items.length / pageSize);

  return {
    currentPage,
    paginatedData,
    setCurrentPage,
    pageCount,
    pageSize,
  };
};

export default usePagination;