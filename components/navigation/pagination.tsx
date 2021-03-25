import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const Paging = styled.nav.attrs({
  className:
    "pt-5 relative z-0 inline-flex self-center rounded-md shadow-sm -space-x-px",
})``;

// TODO: 디자인 커스텀 추가하기
interface PaginationProps {
  //   hasPrev?: boolean;
  //   hasNext?: boolean;
  // 중간에 ...버튼이 있는지 여부
  //   hasEllipsis?: boolean;
  // 위 세 개는 여기서 자체적으로 결정해야 하지 않을까?
  //   children: ReactNode;
  //   currentPage: number;
  totalPage: number;
  pagesPerBlock?: number;
  itemsPerPage?: number;
  onClick: (p: number) => void;
}
let isMonted = false;

///////////////////
const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const totalBlocks = Math.ceil(props.totalPage / props.pagesPerBlock);
  //   console.log("totalBlocks: ", totalBlocks);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentBlock, setCurrentBlock] = useState<number>(1);
  const [blockStartPage, setBlockStartPage] = useState<number>(1);
  const [blockEndPage, setBlockEndPage] = useState<number>(props.pagesPerBlock);
  const [blockArray, setBlockArray] = useState<Array<number>>([
    ...Array(props.pagesPerBlock),
  ]);

  // const blockPrevStateInput = useRef<number>(1);

  // 페이지 전환
  const changePage = ({ pageTo }) => {
    console.log("changePage: ", pageTo);
    setCurrentPage(pageTo);
    props.onClick(pageTo);
  };

  const changeCurrentBlock = (direction) => {
    // 다음버튼을 눌렀을 경우
    if (direction === "next") {
      setCurrentBlock((prev) =>
        prev === totalBlocks ? totalBlocks : prev + 1
      );
    } else {
      setCurrentBlock((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };

  //   페이지 블록도 바꿔준다.
  useEffect(() => {
    const newArray = [];
    for (let index = blockStartPage; index <= blockEndPage; index++) {
      newArray.push(index);
    }

    setBlockArray(newArray);

    // // // TODO: 현재 페이지도 바꿔준다.
    // // // 전 블록값을 확인해서 전 블록값보다 커졌으면 startpage로, 작아졌으면 endpage로 바꿔준다.
    // 현재 페이지가 blockEndPage 보다 크면 전 블록으로 간 것
    // 현재 페이지가  blockStartPage보다 작으면 다음 블록으로 간 것
    if (currentPage > blockEndPage) {
      changePage({ pageTo: blockEndPage });
    } else if (currentPage < blockStartPage) {
      changePage({ pageTo: blockStartPage });
    } else {
      console.log("else");
    }
  }, [blockEndPage, blockStartPage]);

  // 페이징 블록 시작, 끝 페이지 처리
  useEffect(() => {
    // blockPrevStateInput.current = currentBlock;
    // console.log(`currentBlock: `, currentBlock);
    // console.log(`blockPrevStateInput: `, blockPrevStateInput);

    setBlockStartPage(
      currentBlock * props.pagesPerBlock - (props.pagesPerBlock - 1)
    );
    setBlockEndPage(
      currentBlock * props.pagesPerBlock >= props.totalPage
        ? props.totalPage
        : currentBlock * props.pagesPerBlock
    );

    // console.clear();
  }, [currentBlock]);

  // mount됐는지 여부 확인
  useEffect(() => {
    if (isMonted === false) {
      isMonted = true;
    }
  }, []);

  // 다음버튼
  const Next = () => {
    return (
      <button
        onClick={() => changeCurrentBlock("next")}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
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

  // 이전 버튼
  const Previous = () => {
    return (
      <button
        onClick={() => changeCurrentBlock("prev")}
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
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

  // 페이징 각 아이템
  type PageItemProps = {
    pageTo: number;
    // onClick?: (p: number) => void;
  };
  const PageItem: React.FC<PageItemProps> = (pageTo: PageItemProps) => {
    return (
      <button
        onClick={() => changePage(pageTo)}
        className={
          currentPage === pageTo.pageTo
            ? `relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-red-700 hover:bg-gray-50`
            : `relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50`
        }
      >
        {pageTo.pageTo}
      </button>
    );
  };

  return (
    <Paging aria-label="Pagination">
      {/* {[...Array(props.totalPage)].map((n, index) => {
        return <PageItem key={index} pageTo={index + 1} />;
      })} */}
      <Previous />
      {blockArray.map((n, index) => {
        return <PageItem key={index} pageTo={n} />;
      })}
      <Next />
    </Paging>
  );
};
export default Pagination;
