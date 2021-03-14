import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { LayoutContext } from "../../context/layout-context";
import { classNames } from "../util/utils";
import { InputField } from "../UI/form/input";
import { Avatar } from "../UI/avatar";

interface IF {}
type Values = {
  searchBar: string;
};
let isMounted = false;

const HeaderMenuItems = (props) => {
  return (
    <>
      {/* 1. alarm */}
      <button className={`${!props.sub && `hidden md:inline-block`} mr-2 `}>
        <svg
          className="w-7 animate-wiggle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
      {/* 2. language setting */}
      <button className={`${!props.sub && `hidden md:inline-block`} mr-2 `}>
        <svg
          className="w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      </button>
      {/* 3. setting */}
      <button className={`${!props.sub && `hidden md:inline-block`} mr-2 `}>
        <svg
          className="w-7 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      <Avatar
        customstyle={`${!props.sub && `hidden md:inline-block`} mr-2 `}
        src="https://pbs.twimg.com/profile_images/1354357825355411464/kJZxEWo5_400x400.jpg"
        // badge="active"
      />
    </>
  );
};

const Header: React.FC<IF> = (props: IF) => {
  const layoutContext = useContext(LayoutContext);
  const BGCOLOR_VARIANT_MAPS = layoutContext.BGCOLOR_VARIANT_MAPS;

  // const [windowWidthSize, setWindowWidthSize] = useState<number>(0);
  // 디바운싱 타이머
  const [timer, setTimer] = useState<number>(0);
  const [isSubHeaderOpen, setIsSubHeaderOpen] = useState<boolean>(false);

  const toggleSubHeaderHandler = () => {
    setIsSubHeaderOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
    }
  }, []);

  const changeNavState = () => {
    if (window.innerWidth <= 768) {
      layoutContext.SetToggleStateNavHandler(false);
    } else {
      layoutContext.SetToggleStateNavHandler(true);
    }
  };

  const handleResize = async () => {
    if (timer) {
      // console.log("clear timer");
      clearTimeout(timer);
    }

    const newTimer: number = window.setTimeout(async () => {
      try {
        await changeNavState();
        // console.log(window.innerWidth);
        // console.log("newTimer: ", newTimer);
      } catch (error) {
        console.log(error);
      }
    }, 100);
    setTimer(newTimer);
  };

  useEffect(() => {
    if (isMounted) window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={classNames`flex-col md:flex`}>
      <div
        className={classNames`w-full fixed z-10 pr-4 top-0 h-header flex items-center ${
          BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].bg
        } shadow-sm`}
      >
        <div className="w-sidenav min-w-sidenav px-4 flex items-center">
          {/* 사이드네비게이션 토글 버튼 */}
          <button className="mr-2" onClick={layoutContext.ToggleNavHandler}>
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Image
            src="/image/logo/Horizontal_Light.png"
            alt="site logo"
            width={140}
            height={20}
          />
        </div>

        {/* 메뉴 */}
        <div className="w-full flex justify-between items-center">
          {/* 서치바 */}
          <Formik
            initialValues={{
              searchBar: "",
            }}
            // validationSchema={TestSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                // validation에 통과하지 못하면 아래 코드에 닿지 않는다.
                alert(JSON.stringify(values, null, 2));
                console.log(values);
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <InputField
                  type="text"
                  placeholder="Search..."
                  name="searchBar"
                  label="search bar"
                  fieldsize="full"
                  ringcolor="transprent"
                  searchbar="true"
                  autoComplete="off"
                  customstyle="hidden md:inline-block"
                />
              </Form>
            )}
          </Formik>

          {/* 기타 메뉴 */}
          <div className="flex">
            <HeaderMenuItems />
            {/* 반응형 메뉴들 */}
            <button className="focus:outline-none  md:hidden">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  // TODO: 클릭하면 닫기 버튼으로 이미지 바꾸기
                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button id="headerMenuBtn" onClick={toggleSubHeaderHandler}>
              <svg
                className="w-6 md:hidden"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 반응형 메뉴들 */}
      {isSubHeaderOpen && (
        <div
          className={classNames` w-full fixed  pr-4 top-header h-header flex items-center justify-end shadow-sm
        bg-gray-100 md:hidden
        `}
        >
          <HeaderMenuItems sub />
        </div>
      )}
    </header>
  );
};
export default Header;
// ${BGCOLOR_VARIANT_MAPS[layoutContext.layoutColor].bg}
