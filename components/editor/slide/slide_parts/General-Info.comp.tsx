import { Slide } from "@/types";
import { Bookmark, ChevronRight, Heart, Save } from "lucide-react";
import React from "react";

interface GeneralInfoProps {
  headshot: string | null;
  name: string;
  handle: string;
  color2: string;
  color4: string;
  slide: Slide;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  headshot = "/creator.jpg",
  name,
  handle,
  color2,
  color4,
  slide,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {headshot && (
          <img
            src={
              headshot === "/creator.jpg"
                ? "/creator.jpg"
                : `${headshot}`
            }
            alt="Headshot"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: `2px solid ${color4}`,
            }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: `14px`,
              fontWeight: "600",
              color: color2,
            }}
          >
            {name || "BuildSocialPost"}
          </div>
          <div
            style={{
              fontSize: `12px`,
              fontStyle: "italic",
              color: color2,
            }}
          >
            {handle || "@buildsocialpost"}
          </div>
        </div>
      </div>
      {slide?.type === "intro" && (
        <div
          style={{
            cursor: "pointer",
            borderRadius: "10px",
            backgroundColor: color4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            padding: "2px",
            paddingLeft: "12px",
            paddingRight: "8px",
            fontSize: "14px",
            color: "white",
          }}
        >
          Swipe
          <ChevronRight
            size={23}
            color={"white"}
            className="hover:scale-110 transition-transform"
          />
        </div>
      )}
      {slide?.type === "outro" && (
        <div className="flex gap-2">
          <Heart size={23} color={color2} />
          <Bookmark size={23} color={color2} />
        </div>
      )}
    </div>
  );
};

export default GeneralInfo;
