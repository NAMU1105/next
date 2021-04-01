import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { LayoutContext } from "../../context/layout-context";
import { classNames } from "../../utils/utils";
import { Input } from "../form/input";
import { Avatar } from "../UI/avatar";
import DropDown from "../UI/dropdown";
import Logo from "../UI/logo";

type Values = {
  searchBar: string;
};

// 컴포넌트가 마운트 됐는지 여부
let isMounted = false;

// 드롭다운 메뉴들
const SETTING_DROPDOWN_MENUS = [
  { to: "/users", label: "users", className: null, onclick: null },
  {
    to: "/componentSample",
    label: "components",
    className: null,
    onclick: null,
  },
  // { to: "/settings", label: "settings", className: null, onclick: null },
  // { to: null, label: "log out", className: "border-t-2", onclick: logout },
];

const HeaderMenuItems = (props) => {
  return (
    <>
      {/* 1. alarm */}
      <div className="group ">
        <button
          className={`${
            !props.sub && `hidden md:block`
          } mr-2 focus:outline-none  transform hover:scale-125 `}
        >
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
        <DropDown menus={SETTING_DROPDOWN_MENUS} />
      </div>
      {/* 2. language setting */}
      <div className="group">
        <button
          className={` ${
            !props.sub && `hidden md:block`
          } mr-2 focus:outline-none  transform hover:scale-125`}
        >
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
        <DropDown menus={SETTING_DROPDOWN_MENUS} />
      </div>
      {/* 3. setting */}
      <div className="group">
        <button
          className={` ${
            !props.sub && `hidden md:block`
          } mr-2 focus:outline-none transform hover:scale-125`}
        >
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
        <DropDown menus={SETTING_DROPDOWN_MENUS} />
      </div>
      {/* 4. profile */}
      <div className="group">
        <Avatar
          customstyle={`${!props.sub && `hidden md:inline-block`} mr-2 `}
          src="data:image/jpeg;base64,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"
          // badge="active"
        />
        <DropDown menus={SETTING_DROPDOWN_MENUS} />
      </div>
    </>
  );
};

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
interface IF {}

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
    // if (window.innerWidth <= parseInt(process.env.md)) {
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
          <button
            className="mr-2  -mt-1.5"
            onClick={layoutContext.ToggleNavHandler}
          >
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
          {/* LOGO */}
          {/* <Link href="/">
            <a>
              <Image
                className="cursor-pointer"
                src="/image/logo/Horizontal_Light.png"
                alt="site logo"
                width={140}
                height={20}
              />
            </a>
          </Link> */}
          <Logo withLink type="LogoHorizontalLight" />
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
                <Input
                  type="text"
                  placeholder="Search..."
                  name="searchBar"
                  label="search bar"
                  fieldsize="full"
                  ringcolor="transprent"
                  inputtype="searchBar"
                  autoComplete="off"
                  customstyle="hidden md:inline-block"
                />
              </Form>
            )}
          </Formik>

          {/* 기타 메뉴 */}
          <div className="flex items-center">
            <HeaderMenuItems />
            {/* 반응형 메뉴들 */}
            <button className="focus:outline-none  md:hidden ">
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
            <button
              className="focus:outline-none"
              id="headerMenuBtn"
              onClick={toggleSubHeaderHandler}
            >
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
          className={classNames`focus:outline-none w-full fixed  pr-4 top-header h-header flex items-center justify-end shadow-sm
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
