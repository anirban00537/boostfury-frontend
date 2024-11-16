export const DiamondSVG = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main Diamond Shape */}
    <path
      d="M12 1.5L3 8.25L12 22.5L21 8.25L12 1.5Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    
    {/* Top Facet Highlights */}
    <path
      d="M12 1.5L7.5 8.25H16.5L12 1.5Z"
      fill="currentColor"
      fillOpacity="0.3"
    />
    
    {/* Bottom Left Facet */}
    <path
      d="M3 8.25L12 22.5L7.5 8.25H3Z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    
    {/* Bottom Right Facet */}
    <path
      d="M21 8.25L12 22.5L16.5 8.25H21Z"
      fill="currentColor"
      fillOpacity="0.15"
    />
    
    {/* Outline */}
    <path
      d="M12 1.5L3 8.25L12 22.5L21 8.25L12 1.5Z
         M3 8.25H21
         M7.5 8.25L12 1.5L16.5 8.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Inner Details */}
    <path
      d="M7.5 8.25L12 22.5L16.5 8.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.5"
    />
    
    {/* Sparkle Effects */}
    <circle
      cx="12"
      cy="5"
      r="0.5"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <circle
      cx="9"
      cy="12"
      r="0.5"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <circle
      cx="15"
      cy="12"
      r="0.5"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);

// Alternative Premium Diamond
export const PremiumDiamondSVG = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Glow Effect */}
    <path
      d="M12 1L2 9L12 23L22 9L12 1Z"
      fill="url(#diamond-glow)"
      fillOpacity="0.2"
    />
    
    {/* Main Diamond Shape */}
    <path
      d="M12 2L4 9L12 21L20 9L12 2Z"
      fill="url(#diamond-gradient)"
    />
    
    {/* Top Facet */}
    <path
      d="M12 2L8 9H16L12 2Z"
      fill="url(#top-facet)"
      fillOpacity="0.9"
    />
    
    {/* Bottom Facets */}
    <path
      d="M4 9L12 21L8 9H4Z"
      fill="url(#left-facet)"
      fillOpacity="0.7"
    />
    <path
      d="M20 9L12 21L16 9H20Z"
      fill="url(#right-facet)"
      fillOpacity="0.8"
    />
    
    {/* Shine Lines */}
    <path
      d="M12 2L4 9H20L12 2Z"
      stroke="white"
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
    
    {/* Definitions for gradients */}
    <defs>
      <radialGradient
        id="diamond-glow"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12 12) rotate(90) scale(12)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="currentColor" />
      </radialGradient>
      
      <linearGradient
        id="diamond-gradient"
        x1="12"
        y1="2"
        x2="12"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.7" />
      </linearGradient>
      
      <linearGradient
        id="top-facet"
        x1="12"
        y1="2"
        x2="12"
        y2="9"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.5" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      
      <linearGradient
        id="left-facet"
        x1="4"
        y1="9"
        x2="12"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
      
      <linearGradient
        id="right-facet"
        x1="20"
        y1="9"
        x2="12"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);
