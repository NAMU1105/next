import React, { ReactNode } from "react";
import styled from "styled-components";

const Paging = styled.nav.attrs({
  className:
    "pt-5 relative z-0 inline-flex self-center rounded-md shadow-sm -space-x-px",
})``;

interface PaginationProps {
  //   hasPrev?: boolean;
  //   hasNext?: boolean;
  // 중간에 ...버튼이 있는지 여부
  //   hasEllipsis?: boolean;
  // 위 세 개는 여기서 자체적으로 결정해야 하지 않을까?
  //   children: ReactNode;
  startPage: number;
  endPage: number;
  onClick: (p: number) => void;
}

const Previous = () => {
  return (
    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
      <span className="sr-only">Previous</span>
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

const Next = () => {
  return (
    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
      <span className="sr-only">Next</span>
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

///////////////////
const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  // const {classStyle} = props;
  const test = ({ pageTo }) => {
    console.log("test: ", pageTo);
    props.onClick(pageTo);
  };

  type PageItemProps = {
    pageTo: number;
    // onClick?: (p: number) => void;
  };
  const PageItem: React.FC<PageItemProps> = (pageTo: PageItemProps) => {
    return (
      <button
        onClick={() => test(pageTo)}
        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {pageTo.pageTo}
      </button>
    );
  };

  return (
    <Paging aria-label="Pagination">
      {/* {props.hasPrev && <Previous />} */}
      {/* {props.children} */}
      <Previous />
      {/* <PageItem pageTo={1} /> */}
      {/* <button onClick={() => test(1)}>here</button>
      <button onClick={() => test(2)}>2</button>
      <button onClick={() => test(3)}>3</button>
      <button onClick={() => test(4)}>4</button> */}

      <PageItem pageTo={2} />
      <PageItem pageTo={3} />

      <Next />
      {/* {props.hasNext && <Next />} */}
    </Paging>
  );
};
export default Pagination;
