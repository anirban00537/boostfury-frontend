import React from "react";
import { Slide } from "@/types";
import { useSelector } from "react-redux";
import SharedElementsComponent from "./slide_parts/Shared-Elements.comp";
import Text from "./slide_parts/Text.comp";
import Image from "./slide_parts/Image.comp";
import Background from "./slide_parts/Background.comp";
import GeneralInfo from "./slide_parts/General-Info.comp";
import { RootState } from "@/state/store";
import { CSSProperties } from "react";
import { fontOptions } from "@/lib/fonts";
import { getBackgroundPattern } from "@/components/editor/shared-components/Backgrounds.comp";

interface SlideProps {
  slide: Slide;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  slideNumber?: number;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  updateSlide,
  slideNumber,
}) => {
  const {
    titleTextSettings,
    descriptionTextSettings,
    taglineTextSettings,
    layout,
    sharedSelectedElement,
    globalBackground,
  } = useSelector((state: RootState) => state.slides);
  const { gradient } = useSelector((state: RootState) => state.slides.layout);
  const { subscription } = useSelector((state: RootState) => state.user);
  const { fontFamily } = useSelector((state: RootState) => state.slides);
  const selectedFont = fontOptions.find((font) => font.slug === fontFamily);
  const { handle, headshot, name } = useSelector(
    (state: RootState) => state.branding
  );
  const { pattern, backgroundOpacity } = layout;
  const subscribed = subscription?.isSubscribed;
  const { color1, color2, color3, color4 } = useSelector(
    (state: RootState) => state.slides.background
  );

  const backgroundImageStyle: CSSProperties = {
    ...(slide.backgroundImage || globalBackground
      ? {
          backgroundImage: `url("${
            slide.backgroundImage ? slide.backgroundImage : globalBackground
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {
          backgroundImage: `url("${getBackgroundPattern(pattern, color4)}")`,
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity:
      slide.backgroundImage || globalBackground ? 0.5 : backgroundOpacity,
    zIndex: 0,
  };
  return (
    <div
      className="cursor-pointer hover:opacity-90 relative"
      style={{
        fontFamily: selectedFont?.font.style.fontFamily,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: color2,
        backgroundColor: color1,
        zIndex: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 z-0">
        {gradient && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at top left, ${color3}, transparent 40%),
                        radial-gradient(circle at bottom right, ${color4}, transparent 30%)`,
            }}
          ></div>
        )}
        <div className="absolute inset-0 backdrop-blur-[50px]"></div>
      </div>
      <div style={backgroundImageStyle} />
      {index % 2 === 1 ? (
        <>
          <SharedElementsComponent
            positionStyles={{
              left: "0px",
              transform: "translateX(-50%)",
              position: "absolute",
              top: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
          <SharedElementsComponent
            positionStyles={{
              right: "0px",
              transform: "translateX(50%)",
              position: "absolute",
              bottom: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
        </>
      ) : (
        <>
          <SharedElementsComponent
            positionStyles={{
              right: "0px",
              transform: "translateX(50%)",
              position: "absolute",
              top: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
          <SharedElementsComponent
            positionStyles={{
              left: "0px",
              transform: "translateX(-50%)",
              position: "absolute",
              bottom: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
        </>
      )}

      <Background
        backgroundImageStyle={backgroundImageStyle}
        color1={color1}
        backgroundImage={
          globalBackground ? globalBackground : slide.backgroundImage
        }
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems:
            titleTextSettings.alignment === "center"
              ? "center"
              : titleTextSettings.alignment === "left"
              ? "flex-start"
              : "flex-end",
          justifyContent: "center",
          textAlign: titleTextSettings.alignment,
          width: "100%",
          height: "100%",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
            width: "100%",
            maxWidth: "768px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {slideNumber !== undefined && slide?.type === "slide" && (
            <p
              style={{
                height: "32px",
                width: "32px",
                minWidth: "32px",
                minHeight: "32px",
                borderRadius: "50%",
                backgroundColor: color4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${14}px`,
                marginBottom: "8px",
                fontWeight: "bold",
                color: "white",
                alignSelf:
                  titleTextSettings.alignment === "center"
                    ? "center"
                    : titleTextSettings.alignment === "left"
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              {slideNumber}
            </p>
          )}
          {slide.tagline && slide?.showTagline && (
            <Text
              content={slide.tagline}
              onBlur={(content: string) =>
                updateSlide(index, { ...slide, tagline: content })
              }
              fontSize={taglineTextSettings.fontSize}
              fontStyle={taglineTextSettings.fontStyle}
              fontWeight={taglineTextSettings.fontWeight}
              alignment={taglineTextSettings.alignment}
              placeholder="Your Tagline Here"
            />
          )}
          {slide.title && slide?.showTitle && (
            <Text
              content={slide.title}
              onBlur={(content: string) =>
                updateSlide(index, { ...slide, title: content })
              }
              fontSize={titleTextSettings.fontSize}
              fontStyle={titleTextSettings.fontStyle}
              fontWeight={titleTextSettings.fontWeight}
              alignment={titleTextSettings.alignment}
              placeholder="Title"
            />
          )}
          {slide.description && slide?.showDescription && (
            <Text
              content={slide.description}
              onBlur={(content: string) =>
                updateSlide(index, {
                  ...slide,
                  description: content,
                })
              }
              fontSize={descriptionTextSettings.fontSize}
              fontStyle={descriptionTextSettings.fontStyle}
              fontWeight={descriptionTextSettings.fontWeight}
              alignment={descriptionTextSettings.alignment}
              placeholder="Your introductory paragraph here. Describe your content briefly."
            />
          )}
          {slide?.showImage && (
            <Image
              imageUrl={slide.imageUrl || null}
              index={index}
              updateSlide={updateSlide}
            />
          )}
        </div>
        <GeneralInfo
          headshot={headshot}
          name={name}
          handle={handle}
          color2={color2}
          color4={color4}
          slide={slide}
        />
      </div>
      {!subscribed && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: color3,
            textAlign: "center",
            fontSize: "12px",
            padding: "4px",
            color: color2,
            zIndex: 1,
          }}
        >
          Built with{" "}
          <a
            href="https://buildsocialpost.com"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Buildsocialpost.com
          </a>
        </div>
      )}
    </div>
  );
};

export default SlideComponent;
