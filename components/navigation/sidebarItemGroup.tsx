import React, { useContext, useState } from "react";

import { LayoutContext } from "../../context/layout-context";
import { classNames } from "../../utils/utils";

const SidebarItem = (props) => {
  return (
    <li
      className={classNames`${props.hover} flex items-center py-2 list-none cursor-pointer`}
    >
      <div className="flex items-center mb-2">
        <svg
          className="w-6 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {props.open && (
          <span className="uppercase ml-2 text-gray-900">menu</span>
        )}
      </div>
    </li>
  );
};

type SidebarItem = {
  to?: string;
  icon?: string;
  label: string;
  onclick?: () => void;
};

interface SidebarItemGroupProps {
  // navcolor: SidebarProp;
  items: Array<SidebarItem>;
}

// up/down
const ARROW_UP = "M19 9l-7 7-7-7";
const ARROW_DOWN = "M5 15l7-7 7 7";
const SidebarItemGroup: React.FC<SidebarItemGroupProps> = (
  props: SidebarItemGroupProps
) => {
  const layoutContext = useContext(LayoutContext);
  const BGCOLOR_VARIANT_MAPS = layoutContext.BGCOLOR_VARIANT_MAPS;
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

  const toggleMenuHandler = () => {
    setIsMenuToggled((prev) => !prev);
  };

  return (
    <li className="list-none">
      <div className="h-8 flex items-center justify-between">
        {layoutContext.isNavOpen && (
          <>
            <h3 className="font-bold uppercase text-gray-900">
              Item group name
            </h3>
            <button onClick={toggleMenuHandler}>
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={`${isMenuToggled ? ARROW_UP : ARROW_DOWN}`}
                />
              </svg>
            </button>
          </>
        )}
      </div>
      {!isMenuToggled && (
        // TODO: ?????? map??? ???????????? ???????????? ?????????
        <ul className="-ml-1">
          <SidebarItem
            open={layoutContext.isNavOpen}
            hover={BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].hover}
          />
          <SidebarItem
            open={layoutContext.isNavOpen}
            hover={BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].hover}
          />
          <SidebarItem
            open={layoutContext.isNavOpen}
            hover={BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].hover}
          />
          <SidebarItem
            open={layoutContext.isNavOpen}
            hover={BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].hover}
          />
          <SidebarItem
            open={layoutContext.isNavOpen}
            hover={BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].hover}
          />
        </ul>
      )}
    </li>
  );
};
export default SidebarItemGroup;
