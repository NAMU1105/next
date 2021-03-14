import Head from "next/head";
import React, { ReactNode, useContext, useState, useEffect } from "react";
import Sidebar from "../navigation/sidebar";
import Header from "../navigation/header";

import { LayoutContext } from "../../context/layout-context";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <>
      <Head>
        <title>4D REPLAY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="backdrop-hook"></div>
      {/* <div id="modal-hook"></div>
      <div id="drawer-hook"></div> */}
      {/* 컨텐츠 */}
      <div className="content flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <main
            className={`${
              layoutContext.isNavOpen ? `ml-sidenav` : `ml-18 mdScreen`
            } p-5 w-full mt-header`}
          >
            {props.children}
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default Layout;
