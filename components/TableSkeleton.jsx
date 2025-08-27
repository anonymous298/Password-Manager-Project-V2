import React from "react";

const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header */}
      <div className="flex space-x-0.5 m-1">
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
        <div className="h-9 shimmer rounded w-1/4"></div>
      </div>

      {/* Table Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-0.5 m-1">
          <div className="h-9 shimmer rounded w-1/4"></div>
          <div className="h-9 shimmer rounded w-1/4"></div>
          <div className="h-9 shimmer rounded w-1/4"></div>
          <div className="h-9 shimmer rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
