import React, { ReactNode } from "react";
import { classNames } from "../../util/utils";
// import styled, { css } from "styled-components";
// import tw from "twin.macro";

// TODO: 아이콘 버튼 만들기

const COLOR_VARIANT_MAPS = {
  white: "text-white",
  black: "text-black",
  primary: "text-primary hover:text-primary-dark",
  secondary: "text-secondary-navy",
  danger: "text-danger hover:text-danger-dark",
};

const BGCOLOR_VARIANT_MAPS = {
  primary:
    "bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2  focus:ring-primary-dark focus:ring-opacity-50",
  secondary:
    "bg-secondary-navy focus:outline-none focus:ring-2  focus:ring-secondary-navy focus:ring-opacity-50",
  danger:
    "text-white bg-danger hover:text-danger-dark focus:outline-none focus:ring-2  focus:ring-danger-dark focus:ring-opacity-50",
  transparent: "focus:outline-none focus:ring-2  focus:border-transparent",
};

const DESIGN_VARIANT_MAPS = {
  contained: "rounded-md",
  text:
    "bg-transparent  focus:outline-none focus:ring-transparent focus:border-transparent",
  outlined: "!bg-transparent border-2 rounded-md",
  withIcon: "",
};

const SIZE_VARIANT_MAPS = {
  sm: "w-auto text-sm",
  md: "w-24 text-md",
  lg: "w-6/12 text-lg",
  full: "w-full text-lg",
};

const DISABLED_VARIANT_MAPS = {
  true: "cursor-default bg-disabled text-gray-800",
};

const TEXT_TRANSFORM_VARIANT_MAPS = {
  uppercase: "uppercase",
  capitalize: "capitalize",
  lowercase: "lowercase",
};

interface ButtonProps {
  type?: "button" | "link" | "submit";
  color?: "white" | "black" | "primary" | "secondary" | "danger";
  bgColor?: "primary" | "secondary" | "danger" | "transparent";
  design?: "contained" | "text" | "outlined" | "withIcon";
  size?: "sm" | "md" | "lg" | "full";
  disabled?: "true" | "false";
  textTransform?: "uppercase" | "capitalize" | "lowercase";
  href?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (props.type === "link") {
    return (
      <a
        href={props.href}
        className={classNames`cursor-pointer inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md
          ${COLOR_VARIANT_MAPS[props.color]}
          ${BGCOLOR_VARIANT_MAPS[props.bgColor]}
          ${DESIGN_VARIANT_MAPS[props.design]}
          ${SIZE_VARIANT_MAPS[props.size]}
          ${DISABLED_VARIANT_MAPS[props.disabled]}
          ${TEXT_TRANSFORM_VARIANT_MAPS[props.textTransform]}  
          `}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <button
        type={props.type || "button"}
        onClick={props.onClick}
        className={classNames`cursor-pointer inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-md
       ${COLOR_VARIANT_MAPS[props.color]}
       ${BGCOLOR_VARIANT_MAPS[props.bgColor]}
       ${DESIGN_VARIANT_MAPS[props.design]}
       ${SIZE_VARIANT_MAPS[props.size]}
       ${DISABLED_VARIANT_MAPS[props.disabled]}
       ${TEXT_TRANSFORM_VARIANT_MAPS[props.textTransform]}  
       `}
      >
        {props.children}
      </button>
    );
  }
};

Button.defaultProps = {
  type: "button",
  color: "white",
  design: "contained",
  size: "full",
  disabled: "false",
  textTransform: "uppercase",
  bgColor: "primary",
};
// Button.defaultProps = defaultProps;

export default Button;
