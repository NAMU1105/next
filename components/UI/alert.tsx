import React, { ReactNode, useEffect, useState } from "react";
import { classNames } from "../util/utils";

const BGCOLOR_VARIANT_MAPS = {
  info: "bg-blue-300 border-blue-300",
  success: "bg-green-300 border-green-300",
  warning: "bg-yellow-300 border-yellow-300",
  danger: "bg-red-300 border-red-300",
};
const ICON_COLOR_VARIANT_MAPS = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
};
const ICON_VARIANT_MAPS = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning:
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  danger: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const COLOR_VARIANT_MAPS = {
  white: "text-white",
  black: "text-black",
  primary: "text-primary",
  secondary: "text-secondary-navy",
  danger: "text-danger hover:text-danger-dark",
};
const DESIGN_VARIANT_MAPS = {
  //   hasDescription: "flex-col",
  outlined: "!bg-transparent border-2",
  filled: "bg-opacity-100",
};

interface AlertProps {
  type: "info" | "success" | "warning" | "danger";
  color?: "white" | "black" | "primary" | "secondary" | "danger";
  design?: "outlined" | "filled";
  durationTime?: "keep" | number;
  includeButton?: boolean;
  //   textAlign?: "center" | "left" | "right";
  //   transition?: "ease-in" | "ease-out" | "ease-in-out";
  onClick?: () => void;
  children: ReactNode;
}

export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  //   alert 닫는 함수
  const closeAlert = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (props.durationTime === "keep" || !props.durationTime) return;
    setTimeout(() => {
      closeAlert();
    }, props.durationTime);
  }, []);

  return (
    isOpen && (
      <div
        className={classNames`shadow-sm w-full flex items-center rounded-md p-5 bg-opacity-50 text-lg 
        ${BGCOLOR_VARIANT_MAPS[props.type]}
          ${COLOR_VARIANT_MAPS[props.color]}
          ${DESIGN_VARIANT_MAPS[props.design]}
          `}
      >
        <div></div>
        <svg
          className={classNames`w-8 mr-3   
          ${ICON_COLOR_VARIANT_MAPS[props.type]}
          `}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={`${ICON_VARIANT_MAPS[props.type]}`}
          />
        </svg>

        {props.children}

        {/* 닫기버튼 */}
        {props.includeButton && (
          <svg
            className="w-5 ml-auto cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={closeAlert}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    )
  );
};
