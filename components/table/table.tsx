import React, { ReactChildren } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

// CSS
// TODO: CSS 파일 나누기
const TableWrapper = styled.table.attrs({
  className:
    "min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white ",
})``;

const ThWrapper = styled.th.attrs({
  className:
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ",
})``;
const TrWrapper = styled.tr.attrs({
  className: "w-full border-b border-gray-200",
})``;

const TDWrapper = styled.td.attrs({
  className: "px-6 py-4 whitespace-nowrap border-b border-gray-200",
})`
  & {
    > div {
      ${tw`text-sm text-gray-900`}
    }
  }
`;

export const TbodyWrapper = styled.tbody.attrs({
  className: "bg-white divide-y divide-gray-200",
})``;

export const TheadWrapper = styled.thead<any>`
  background-color: rgba(249, 250, 251, 1);
  ${(props: any) => props.bgColor && `background-color: ${props.bgColor}`};
`;
/* ${(props: any) => props.color && `color: ${props.color}`}; */

//////////// end of css

// th
interface ThProps {
  title?: string;
  children?: React.ReactNode | React.FC | ReactChildren;
}
export const TH: React.FC<ThProps> = (props: ThProps) => {
  return (
    <ThWrapper scope="col">
      {props.children ? props.children : props.title}
    </ThWrapper>
  );
};

// tr
interface TrProps {
  id?: string;
  children?: React.ReactNode | React.FC | ReactChildren;
}
export const TR: React.FC<TrProps> = (props: TrProps) => {
  return <TrWrapper>{props.children}</TrWrapper>;
};

// td
interface TdProps {
  id?: string;
  title?: string;
  isHalf?: boolean;
  children?: React.ReactNode | React.FC | ReactChildren;
  value: React.ReactNode | React.FC | ReactChildren;
}
export const TD: React.FC<TdProps> = (props: TdProps) => {
  return <TDWrapper>{props.value}</TDWrapper>;
};

/////////////////////////////////////////////////////////////

export const Table: React.FC<WithChildren> = ({ children }: WithChildren) => {
  return (
    <>
      <TableWrapper>{children}</TableWrapper>
    </>
  );
};
// export default Table;
