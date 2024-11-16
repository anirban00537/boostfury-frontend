import React from "react";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-[-20px] animate-pulse-slow rounded-2xl bg-blue-500/5" />
        
        {/* Logo Container */}
        <div className="relative flex flex-col items-center">
          {/* Main Logo */}
          <div className="relative">
            {/* Blue Shape */}
            <div className="animate-float">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_4px_8px_rgba(37,99,235,0.25)]"
              >
                <path 
                  d="M34 2H14C6.8 2 1 7.8 1 15V22C1 23.1 1.9 24 3 24H14C19 24 23 28 23 33V43C23 44.1 23.9 45 25 45H34C42 45 47 40 47 32V15C47 7.8 41.2 2 34 2Z" 
                  className="animate-gradient-shift"
                  fill="#2563EB"
                />
              </svg>
            </div>

            {/* Gray Shape */}
            <div className="absolute right-0 top-1/2 animate-slide-fade">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M20 12V18C20 21 19 22 16 22H8C5 22 4 21 4 18V12C4 9 5 8 8 8H16C19 8 20 9 20 12Z" 
                  fill="#E5E7EB"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mt-8 flex items-center gap-1">
            <span className="text-sm font-medium text-gray-400">Loading</span>
            <span className="flex space-x-1">
              <span className="animate-bounce-dot1 h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="animate-bounce-dot2 h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="animate-bounce-dot3 h-1 w-1 rounded-full bg-blue-500"></span>
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-slide-fade {
          animation: slideFade 2s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradientShift 3s ease-in-out infinite;
        }

        .animate-bounce-dot1 {
          animation: bounceDot 1s infinite 0s;
        }

        .animate-bounce-dot2 {
          animation: bounceDot 1s infinite 0.2s;
        }

        .animate-bounce-dot3 {
          animation: bounceDot 1s infinite 0.4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes slideFade {
          0%, 100% { 
            transform: translateX(0);
            opacity: 0.7;
          }
          50% { 
            transform: translateX(4px);
            opacity: 1;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            fill: #2563EB;
            filter: brightness(1);
          }
          50% {
            fill: #4F46E5;
            filter: brightness(1.1);
          }
        }

        @keyframes bounceDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenLoading;
