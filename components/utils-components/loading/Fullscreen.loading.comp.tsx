import React from "react";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Loading Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 animate-pulse" />

          {/* Spinning arc */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>

          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Loading</span>
          <span className="flex space-x-1">
            <span className="animate-bounce-dot1 h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="animate-bounce-dot2 h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="animate-bounce-dot3 h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
        </div>
      </div>

      <style jsx>{`
        .animate-bounce-dot1 {
          animation: bounceDot 1s infinite 0s;
        }

        .animate-bounce-dot2 {
          animation: bounceDot 1s infinite 0.2s;
        }

        .animate-bounce-dot3 {
          animation: bounceDot 1s infinite 0.4s;
        }

        @keyframes bounceDot {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenLoading;
