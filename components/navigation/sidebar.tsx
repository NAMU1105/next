import React, { useState, useEffect, useContext } from "react";
import { LayoutContext } from "../../context/layout-context";
import { classNames } from "../../utils/utils";
import SidebarItemGroup from "./sidebarItemGroup";

// const DUMMY_MENUS =[{}]

// Sidebar 열고 닫고 정보는 컨텍스트에, 컬러 정보는 theme provider에 담기
export type SidebarProp = {
  //   bgcolor: "white" | "primary" | "secondary";
};

// 사이드바 메뉴들
const SIDEBAR_ITEMS = [
  {
    to: "/users",
    icon:
      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "menu",
    className: null,
    onclick: null,
  },
  {
    to: "/users",
    icon:
      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "menu",
    className: null,
    onclick: null,
  },
  {
    to: "/users",
    icon:
      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "menu",
    className: null,
    onclick: null,
  },
  {
    to: "/users",
    icon:
      "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "menu",
    className: null,
    onclick: null,
  },
];

const Sidebar: React.FC<SidebarProp> = (props: SidebarProp) => {
  const layoutContext = useContext(LayoutContext);

  const BGCOLOR_VARIANT_MAPS = layoutContext.BGCOLOR_VARIANT_MAPS;

  return (
    <aside
      className={classNames`fixed left-0 top-header p-4 shadow-xl flex flex-col h-screen ${
        layoutContext.isNavOpen && `w-sidenav`
      } ${BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].bg} `}
    >
      <h1 className="sr-only">Sidebar</h1>
      <SidebarItemGroup items={SIDEBAR_ITEMS} />
      <SidebarItemGroup items={SIDEBAR_ITEMS} />
    </aside>
  );
};
export default Sidebar;
