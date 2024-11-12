import React from "react";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative w-48 h-48">
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 44 43" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="animate-float"
        >
          <path 
            d="M20.1665 28.9354V33.7729C20.1665 37.8042 18.5165 39.4167 14.3915 39.4167H9.4415C5.3165 39.4167 3.6665 37.8042 3.6665 33.7729V28.9354C3.6665 24.9042 5.3165 23.2917 9.4415 23.2917H14.3915C18.5165 23.2917 20.1665 24.9042 20.1665 28.9354Z" 
            fill="#484848"
            className="animate-scale"
          />
          <path 
            d="M30.2133 3.58331H15.62C10.0283 3.58331 5.5 8.00873 5.5 13.4733V18.8125C5.5 19.7979 6.325 20.6041 7.33333 20.6041H15.5833C19.635 20.6041 22.9167 23.8112 22.9167 27.7708V35.8333C22.9167 36.8187 23.7417 37.625 24.75 37.625H30.2133C36.5383 37.625 40.3333 33.9341 40.3333 27.735V13.4733C40.3333 8.00873 35.805 3.58331 30.2133 3.58331ZM34.3933 17.8987C34.3933 18.6333 33.77 19.2425 33.0183 19.2425C32.2667 19.2425 31.6433 18.6333 31.6433 17.8987V13.9571L24.805 20.6579C24.53 20.9266 24.1817 21.0521 23.8333 21.0521C23.485 21.0521 23.1367 20.9266 22.8617 20.6579C22.33 20.1383 22.33 19.2783 22.8617 18.7587L29.7 12.04H25.6667C24.8967 12.04 24.2917 11.4487 24.2917 10.6962C24.2917 9.96165 24.8967 9.35248 25.6667 9.35248H33.0183C33.1833 9.35248 33.3483 9.40623 33.495 9.45998C33.55 9.4779 33.5867 9.49581 33.6233 9.51373C33.7333 9.56748 33.825 9.62123 33.9167 9.71081C33.9533 9.72873 33.99 9.76456 34.0267 9.8004C34.1183 9.9079 34.1917 10.0154 34.265 10.1408C34.265 10.1587 34.2833 10.1766 34.2833 10.1946C34.3567 10.3379 34.375 10.4991 34.375 10.6604C34.3933 10.6783 34.3933 10.6783 34.3933 10.6962V17.8987Z" 
            fill="#1769FF"
            className="animate-glow"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.95); }
        }

        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(23, 105, 255, 0));
            opacity: 0.9;
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(23, 105, 255, 0.5));
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scale {
          animation: scale 2s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Add shine effect */
        .animate-glow::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Optional: Add a subtle background pulse */
        .bg-background {
          animation: bgPulse 4s ease-in-out infinite;
        }

        @keyframes bgPulse {
          0%, 100% { background-color: rgba(255, 255, 255, 1); }
          50% { background-color: rgba(23, 105, 255, 0.03); }
        }
      `}</style>
    </div>
  );
};

export default FullScreenLoading;
