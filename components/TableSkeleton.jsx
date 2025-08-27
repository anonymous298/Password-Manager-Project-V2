import React from "react";

const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header */}
      <div className="flex space-x-0.5 m-1 max-[780px]:hidden">
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
      </div>

      {/* Table Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-0.5 m-1 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:w-[100%]">
          <div className="h-9 shimmer rounded w-1/4 max-[780px]:w-[75%] max-[600px]:w-[90%] max-[780px]:mx-auto max-[780px]:h-40"></div>
          <div className="h-9 shimmer rounded w-1/4 max-[780px]:hidden"></div>
          <div className="h-9 shimmer rounded w-1/4 max-[780px]:hidden"></div>
          <div className="h-9 shimmer rounded w-1/4 max-[780px]:hidden"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
