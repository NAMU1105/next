import React from "react";

interface IF {}

// 직선바 형태
export const LoadingBar: React.FC<IF> = (props: IF) => {
  return (
    <div className="relative bg-gray-200 rounded w-1/3">
      <div className="w-full absolute top-0 h-6 rounded overflow-hidden bg-blue-500  loading "></div>
    </div>
  );
};
