import React from "react";

interface BackgroundProps {
  backgroundImageStyle: React.CSSProperties;
  color1: string;
  backgroundImage?: string | null;
}

const Background: React.FC<BackgroundProps> = ({
  backgroundImageStyle,
  color1,
  backgroundImage,
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          ...backgroundImageStyle,
        }}
      />
      {/* {backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: color1,
            opacity: 0.5,
          }}
        />
      )} */}
    </>
  );
};

export default Background;
