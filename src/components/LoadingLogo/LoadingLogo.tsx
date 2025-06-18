import React, {
  useEffect,
  useState,
  ComponentType,
  SVGProps,
  CSSProperties,
} from "react";
import { PrestigeLogoIcon } from "../icons/LogoIcon/PrestigeLogoIcon";

type AnimationType = "opacity" | "brightness" | "saturation" | "scale";

const LoadignSvg = () => {
  return (
    <svg viewBox="0 0 200 200">
      <rect
        fill="#D3277C"
        stroke="#D3277C"
        strokeWidth="15"
        width="30"
        height="30"
        x="25"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </rect>
      <rect
        fill="#D3277C"
        stroke="#D3277C"
        strokeWidth="15"
        width="30"
        height="30"
        x="85"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </rect>
      <rect
        fill="#D3277C"
        stroke="#D3277C"
        strokeWidth="15"
        width="30"
        height="30"
        x="145"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="2"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </rect>
    </svg>
  );
};

interface LoadingAnimationProps {
  animationType?: AnimationType;
  duration?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

const LoadingLogo = ({
  animationType = "opacity",
  duration = 2000,
  minOpacity = 0.1,
  maxOpacity = 1,
}: LoadingAnimationProps) => {
  const [opacity, setOpacity] = useState(minOpacity);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === minOpacity ? maxOpacity : minOpacity));
    }, duration / 2);

    return () => clearInterval(interval);
  }, [minOpacity, maxOpacity, duration]);

  const animationStyles: CSSProperties = {
    opacity: animationType === "opacity" ? opacity : undefined,
    filter:
      animationType === "brightness"
        ? `brightness(${opacity})`
        : animationType === "saturation"
          ? `saturate(${opacity})`
          : undefined,
    transform: animationType === "scale" ? `scale(${opacity})` : undefined,
    transition: `all ${duration / 1000}s ease-in-out`,
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        minHeight: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "auto",
          height: "100px",
          width: "100px",
          display: "inline-block",
          ...animationStyles,
        }}
      >
        <LoadignSvg />
      </div>
    </div>
  );
};

export default LoadingLogo;
