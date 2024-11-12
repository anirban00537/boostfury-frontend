const createSvgDataUrl = (svgContent: string, color: string): string => {
  const encodedSvg = encodeURIComponent(svgContent?.replace(/#808080/g, color));
  return `data:image/svg+xml,${encodedSvg}`;
};

export const pattern1 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="80" height="80" patternUnits="userSpaceOnUse"><ellipse cx="0" cy="40" rx="32" ry="40" fill="none" stroke="${color}" stroke-width="2"></ellipse><ellipse cx="80" cy="40" rx="32" ry="40" fill="none" stroke="${color}" stroke-width="2"></ellipse><ellipse cx="40" cy="0" rx="40" ry="32" fill="none" stroke="${color}" stroke-width="2"></ellipse><ellipse cx="40" cy="80" rx="40" ry="32" fill="none" stroke="${color}" stroke-width="2"></ellipse></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};
export const pattern2 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="12" stroke="${color}" stroke-width="2" fill="none"></circle><circle cx="13.2" cy="12" r="6" fill="${color}"></circle><circle cx="15" cy="45" r="12" stroke="${color}" stroke-width="2" fill="none"></circle><circle cx="13.2" cy="46.8" r="6" fill="${color}"></circle><circle cx="45" cy="15" r="12" stroke="${color}" stroke-width="2" fill="none"></circle><circle cx="48" cy="15.6" r="6" fill="${color}"></circle><circle cx="45" cy="45" r="12" stroke="${color}" stroke-width="2" fill="none"></circle><circle cx="48" cy="46.8" r="6" fill="${color}"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};
export const pattern3 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="60" height="60" patternUnits="userSpaceOnUse"><polygon points="24,24 36,36 0,60" fill="${color}"></polygon><polygon points="24,36 36,24 0,0" fill="${color}"></polygon><polygon points="36,24 24,36 60,60" fill="${color}"></polygon><polygon points="24,24 36,36 60,0" fill="${color}"></polygon><circle cx="30" cy="30" r="9" fill="${color}"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};
export const pattern4 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <pattern id="bg_pattern" width="200" height="200" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="8" fill="${color}" opacity="0.5" />
        <circle cx="60" cy="60" r="6" fill="${color}" opacity="0.5" />
        <circle cx="100" cy="30" r="10" fill="${color}" opacity="0.5" />
        <circle cx="140" cy="80" r="8" fill="${color}" opacity="0.5" />
        <circle cx="180" cy="120" r="6" fill="${color}" opacity="0.5" />
        <rect x="50" y="150" width="12" height="12" fill="${color}" opacity="0.5" />
        <rect x="120" y="170" width="10" height="10" fill="${color}" opacity="0.5" />
        <polygon points="160,20 168,32 152,32" fill="${color}" opacity="0.5" />
        <polygon points="30,100 38,112 22,112" fill="${color}" opacity="0.5" />
        <path d="M80,140 Q95,125 110,140" stroke="${color}" fill="none" stroke-width="3" opacity="0.5" />
        <circle cx="40" cy="180" r="7" fill="${color}" opacity="0.5" />
        <circle cx="170" cy="50" r="9" fill="${color}" opacity="0.5" />
        <rect x="85" y="85" width="10" height="10" fill="${color}" opacity="0.5" />
        <polygon points="130,160 138,172 122,172" fill="${color}" opacity="0.5" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)" />
  </svg>`;
};
export const pattern5 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3" fill="${color}"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};

export const pattern6 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="${color}" stroke-width="2" /><path d="M0,100 Q25,50 50,100 T100,100" fill="none" stroke="${color}" stroke-width="2" /></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};
export const pattern7 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="60" height="60" patternUnits="userSpaceOnUse"><line x1="0" y1="30" x2="60" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"></line><line x1="30" y1="0" x2="30" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"></line><circle cx="30" cy="30" r="6" fill="${color}"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};
export const pattern8 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="bg_pattern" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3" fill="${color}"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)"></rect></svg>`;
};

export const pattern9 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <pattern id="bg_pattern" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M20,0 L40,0 L60,20 L60,40 L40,60 L20,60 L0,40 L0,20 Z" fill="none" stroke="${color}" stroke-width="2" />
        <circle cx="30" cy="30" r="4" fill="${color}" />
        <circle cx="50" cy="50" r="4" fill="${color}" />
        <circle cx="10" cy="50" r="4" fill="${color}" />
        <circle cx="50" cy="10" r="4" fill="${color}" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)" />
  </svg>`;
};

export const pattern10 = (color: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs>
      <pattern id="bg_pattern" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="30" fill="none" stroke="${color}" stroke-width="2" />
        <path d="M50,20 Q65,35 80,50 T50,80" fill="none" stroke="${color}" stroke-width="2" />
        <path d="M20,50 Q35,65 50,80 T80,50" fill="none" stroke="${color}" stroke-width="2" />
        <circle cx="50" cy="50" r="5" fill="${color}" />
        <circle cx="20" cy="20" r="3" fill="${color}" />
        <circle cx="80" cy="80" r="3" fill="${color}" />
        <circle cx="20" cy="80" r="3" fill="${color}" />
        <circle cx="80" cy="20" r="3" fill="${color}" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#bg_pattern)" />
  </svg>`;
};

export const getBackgroundPattern = (
  patternId: number,
  color: string
): string => {
  const patterns = [
    pattern1(color),
    pattern2(color),
    pattern3(color),
    pattern4(color),
    pattern5(color),
    pattern6(color),
    pattern7(color),
    pattern8(color),
    pattern9(color),
    pattern10(color),
  ];

  if (patternId < 1 || patternId > patterns.length) {
    console.error(`Invalid pattern ID: ${patternId}`);
    return "";
  }

  return createSvgDataUrl(patterns[patternId - 1], color);
};
