import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { classNames } from "../../utils/utils";

type DropDownType = {
  left?: number;
  top?: number;
  rounded?: string;
};

const DropdownMenuWrapper = styled.div.attrs((props: DropDownType) => ({
  className: classNames`hidden group-hover:block absolute top-12 uppercase overflow-hidden flex flex-col bg-white rounded-md shadow-lg `,
}))<DropDownType>`
  & {
    > ul > li {
      ${tw`px-5 py-2 min-w-40 cursor-pointer hover:bg-gray-50`}
    }
  }
  ${(props) =>
    props.left &&
    css`
      left: ${props.left}%;
    `};
`;

// TODO: 라벨은 컴포넌트로 받기
// 언어 설정 등의 메뉴는 아이콘도 들어가야 하므로
type MenuType = {
  to?: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
interface DropDownProps {
  left?: number;
  menus: Array<MenuType>;
}
const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const [isOpen, setOpen] = useState(true);
  const menus = props.menus;

  return (
    isOpen && (
      <DropdownMenuWrapper left={props.left}>
        <ul>
          {menus.map((menu) => {
            return (
              <li
                key={menu.label}
                className={menu.className}
                onClick={menu.onClick}
              >
                {menu.to ? (
                  <Link href={menu.to}>{menu.label}</Link>
                ) : (
                  menu.label
                )}
              </li>
            );
          })}
        </ul>
      </DropdownMenuWrapper>
    )
  );
};
export default DropDown;
