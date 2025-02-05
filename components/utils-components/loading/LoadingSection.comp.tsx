import React from "react";

interface LoadingSectionProps {
  className?: string;
}

const LoadingSection: React.FC<LoadingSectionProps> = ({}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loadingWrapper">
        <div className="crystalSpinner">
          <div className="crystalElement"></div>
          <div className="crystalElement"></div>
          <div className="crystalElement"></div>
          <div className="crystalElement"></div>
          <div className="crystalElement"></div>
          <div className="crystalElement"></div>
        </div>
      </div>
      <style jsx>{`
        .loadingWrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .crystalSpinner {
          position: relative;
          width: 200px;
          height: 200px;
          perspective: 800px;
        }

        .crystalElement {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          opacity: 0;
          transform-origin: bottom center;
          transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
          animation: crystalSpin 4s linear infinite, crystalPulse 2s ease-in-out infinite alternate,
            crystalAppear 0.3s ease-out forwards;
          border-radius: 10px;
          visibility: hidden;
        }

        @keyframes crystalSpin {
          from {
            transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg);
          }
        }

        @keyframes crystalPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes crystalAppear {
          to {
            visibility: visible;
            opacity: 0.8;
          }
        }

        .crystalElement:nth-child(1) {
          background: linear-gradient(45deg, #003366, #336699);
          animation-delay: 0s;
        }

        .crystalElement:nth-child(2) {
          background: linear-gradient(45deg, #003399, #3366cc);
          animation-delay: 0.3s;
        }

        .crystalElement:nth-child(3) {
          background: linear-gradient(45deg, #0066cc, #3399ff);
          animation-delay: 0.6s;
        }

        .crystalElement:nth-child(4) {
          background: linear-gradient(45deg, #0099ff, #66ccff);
          animation-delay: 0.9s;
        }

        .crystalElement:nth-child(5) {
          background: linear-gradient(45deg, #33ccff, #99ccff);
          animation-delay: 1.2s;
        }

        .crystalElement:nth-child(6) {
          background: linear-gradient(45deg, #66ffff, #ccffff);
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
};

export default LoadingSection;
