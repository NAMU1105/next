import React, { useState, useEffect, useContext } from "react";
import { LayoutContext } from "../../context/layout-context";
import { classNames } from "../util/utils";
import SidebarItemGroup from "./sidebarItemGroup";

// const DUMMY_MENUS =[{}]

// Sidebar 열고 닫고 정보는 컨텍스트에, 컬러 정보는 theme provider에 담기
export type SidebarProp = {
  //   bgcolor: "white" | "primary" | "secondary";
};

const Sidebar: React.FC<SidebarProp> = (props: SidebarProp) => {
  const layoutContext = useContext(LayoutContext);

  const BGCOLOR_VARIANT_MAPS = layoutContext.BGCOLOR_VARIANT_MAPS;

  return (
    <aside
      className={classNames`fixed left-0 top-header p-4 shadow-sm flex flex-col h-screen ${
        layoutContext.isNavOpen && `w-sidenav`
      } ${BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].bg} `}
    >
      <h1 className="sr-only">Sidebar</h1>
      <SidebarItemGroup />
      <SidebarItemGroup />
    </aside>
  );
};
export default Sidebar;
