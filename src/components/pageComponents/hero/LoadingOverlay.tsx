import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingOverlay;