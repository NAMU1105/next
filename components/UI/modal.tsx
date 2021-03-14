import React, { ReactNode, useState } from "react";
import { classNames } from "../util/utils";
// close button
const CloseBtn = (props) => {
  return (
    <svg
      className="w-10 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={props.onclick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const TYPE_COLOR_VARIANT_MAPS = {
  info: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "bg-green-300 text-green-500",
  warning: "bg-yellow-300 text-yellow-500",
  danger: "bg-red-300 text-red-500",
};
const ICON_VARIANT_MAPS = {
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  warning:
    "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  danger: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const FOOTER_COLOR_VARIANT_MAP = {
  gray: "bg-gray-100",
  white: "bg-white",
};

interface ModalProps {
  type: "info" | "success" | "warning" | "danger";
  title: string;
  content: string;
  icon?: boolean;
  centered?: boolean;
  closeBtn?: boolean;
  footerColor?: "gray" | "white";
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const [isShowing, setIsShowing] = useState<boolean>(true);

  const toggleShowing = () => {
    setIsShowing(false);
  };

  return (
    isShowing && (
      <div className="bg-white rounded-md shadow-md flex flex-col justify-between w-1/3 min-h-100 z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        {/* upperPart */}
        <div
          className={
            props.centered ? `flex flex-col flex-1 p-5` : `flex flex-1 p-5`
          }
        >
          {props.icon && (
            <div
              className={
                props.centered
                  ? classNames`self-center ${
                      TYPE_COLOR_VARIANT_MAPS[props.type]
                    } rounded-full  p-3 mb-5`
                  : classNames`self-center  ${
                      TYPE_COLOR_VARIANT_MAPS[props.type]
                    } rounded-full p-3 mr-5`
              }
            >
              <svg
                className="w-10 "
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
            </div>
          )}
          <div
            className={
              props.centered
                ? `flex flex-col items-center w-full`
                : `flex flex-col w-full`
            }
          >
            <div className={`flex justify-between items-baseline  mb-2`}>
              <h1
                className={
                  props.centered
                    ? `text-2xl font-bold break-all`
                    : `text-2xl font-bold break-all mr-5`
                }
              >
                {props.title}
              </h1>
              {!props.centered && <CloseBtn onclick={toggleShowing} />}
            </div>
            <p className="break-all">{props.content}</p>
          </div>
        </div>
        {/* lowerPart, footer */}
        <div
          className={
            props.centered
              ? classNames`flex justify-center flex-row-reverse p-5 ${
                  FOOTER_COLOR_VARIANT_MAP[props.footerColor]
                }`
              : classNames`flex flex-row-reverse p-5 ${
                  FOOTER_COLOR_VARIANT_MAP[props.footerColor]
                }`
          }
        >
          {props.children}
        </div>
      </div>
    )
  );
};

Modal.defaultProps = {
  footerColor: "gray",
};
