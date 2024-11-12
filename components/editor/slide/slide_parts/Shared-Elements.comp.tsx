import React from "react";

import { sharedElements } from "@/lib/core-constants";
interface SharedElementsProps {
  positionStyles: React.CSSProperties;
  color4: string;
  opacity: number;
  id: number;
}

const SharedElementsComponent: React.FC<SharedElementsProps> = ({
  positionStyles,
  color4,
  opacity,
  id,
}) => {
  const element = sharedElements.find((element) => element.id === id);
  return (
    <div
      style={{
        ...positionStyles,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        opacity: opacity,
        color: color4,
      }}
    >
      {element && <element.component color={color4} size={150} />}
    </div>
  );
};

export default SharedElementsComponent;
