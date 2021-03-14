import React, { useState, useEffect } from "react";

// TODO: 언어(국가) 정보도 여기서 컨트롤 하기(?)
const BGCOLOR_VARIANT_MAPS = {
  white: {
    bg: "bg-white",
    hover: "hover:bg-gray-100",
  },
  black: {
    bg: "bg-black ",
    hover: "hover:bg-gray-800",
  },
  primary: {
    bg: "bg-primary",
    hover: "hover:bg-primary-dark",
  },
  secondary: {
    bg: "bg-secondary-gray-light",
    hover: "hover:bg-secondary-gray-medium",
  },
};

const COLOR_VARIANT_MAPS = {
  white: "text-white",
  black: "text-black",
  primary: "text-primary",
  secondary: "text-secondary-navy",
};

export type LayoutColorType = "white" | "black" | "primary" | "secondary";

export const useLayout = () => {
  const [layoutColor, setLayoutColor] = useState<LayoutColorType>("white");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

  const changeLayoutColorHandler = (newColor: LayoutColorType) => {
    setLayoutColor(newColor);
  };

  // 사이드네비게이션 열고 닫는 함수
  const ToggleNavHandler = () => {
    setIsNavOpen((prev) => !prev);
  };
  const SetToggleStateNavHandler = (state) => {
    setIsNavOpen(state);
  };

  return {
    BGCOLOR_VARIANT_MAPS,
    COLOR_VARIANT_MAPS,
    layoutColor,
    changeLayoutColorHandler,
    isNavOpen,
    ToggleNavHandler,
    SetToggleStateNavHandler,
  };
};
