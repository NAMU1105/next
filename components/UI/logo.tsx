import React from "react";
import Link from "next/link";
import Image from "next/image";
import { classNames } from "../../utils/utils";

interface LogoProps {
  withLink?: boolean;
  customstyle?: string;
  type:
    | "LogoHorizontalDark"
    | "LogoHorizontalLight"
    | "LogoVerticalDark"
    | "LogoVertialtalLight";
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { withLink, customstyle, type } = props;

  let compElem;
  let strImg;

  switch (type) {
    case "LogoHorizontalDark":
      strImg = "/image/logo/Horizontal_Dark.png";
      break;
    case "LogoHorizontalLight":
      strImg = "/image/logo/Horizontal_Light.png";
      break;
    case "LogoVerticalDark":
      strImg = "/image/logo/Vertical_Dark.png";
      break;
    case "LogoVertialtalLight":
      strImg = "/image/logo/Vertical_Light.png";
      break;

    default:
      strImg = "/image/logo/Horizontal_Light.png";
      break;
  }

  if (withLink) {
    compElem = (
      // <div className="flex justify-start ">
      <Link href="/">
        <a>
          <span className="sr-only">4DREPLAY</span>
          <Image
            className={classNames`h-logoHeight cursor-pointer`}
            src={strImg}
            alt="logo"
            width={140}
            height={20}
          />
        </a>
      </Link>
      // </div>
    );
  } else {
    compElem = (
      <Image
        className={classNames`h-logoHeight cursor-pointer ${customstyle}`}
        src={strImg}
        alt="logo"
        width={140}
        height={20}
      />
    );
  }

  return compElem;
};
export default Logo;
