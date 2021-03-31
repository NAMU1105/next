import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  children: ReactNode;
}
let isMonted = false;

const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  useEffect(() => {
    if (!isMonted) isMonted = true;

    if (isMonted) {
      setShowBackdrop(true);
      // document.body.style.overflow = "hidden";
      // 스크롤 방지 해제
      // document.body.style.overflow = "unset"
    }
  }, []);

  if (!showBackdrop) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className="w-screen h-screen bg-black opacity-70 relative z-30">
        {props.children}
      </div>,
      document.getElementById("backdrop-hook")
    );
  }
};

export default Backdrop;
