import React from "react";

const DownloadLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-16 h-16 mb-4">
        <svg
          width="64"
          height="64"
          viewBox="0 0 25 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <path
            opacity="0.4"
            d="M16.1458 12.6021H13.8853C12.0312 12.6021 10.5208 11.2221 10.5208 9.50665V7.42706C10.5208 7.03415 10.177 6.70831 9.7395 6.70831H6.43742C4.03117 6.70831 2.08325 8.14581 2.08325 10.7141V17.0775C2.08325 19.6458 4.03117 21.0833 6.43742 21.0833H12.5728C14.9791 21.0833 16.927 19.6458 16.927 17.0775V13.3208C16.927 12.9183 16.5728 12.6021 16.1458 12.6021Z"
            fill="#3369E7"
            className="animate-fade-in-out"
          />
          <path
            d="M18.5622 1.91669H16.5101H15.3747H12.4268C10.0726 1.91669 8.16634 3.29669 8.08301 5.7596C8.14551 5.7596 8.19759 5.75002 8.26009 5.75002H11.208H12.3435H14.3955C16.8018 5.75002 18.7497 7.18752 18.7497 9.75585V11.6438V14.2409V16.1288C18.7497 16.1863 18.7393 16.2342 18.7393 16.2821C21.0622 16.215 22.9164 14.7967 22.9164 12.2954V10.4075V7.81044V5.92252C22.9164 3.35419 20.9685 1.91669 18.5622 1.91669Z"
            fill="#3369E7"
            className="animate-fade-in-out animation-delay-300"
          />
          <path
            d="M12.4797 6.85233C12.1568 6.55525 11.6047 6.7565 11.6047 7.16858V9.67938C11.6047 10.7335 12.5735 11.596 13.761 11.596C14.5006 11.6056 15.5318 11.6056 16.4172 11.6056C16.8652 11.6056 17.0943 11.1265 16.7818 10.839C15.6464 9.79438 13.6256 7.92567 12.4797 6.85233Z"
            fill="#3369E7"
            className="animate-fade-in-out animation-delay-600"
          />
        </svg>
      </div>
      <p className="text-white text-sm font-normal">Processing Carousel</p>

      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s infinite;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default DownloadLoading;
