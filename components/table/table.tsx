import React, { ReactChildren } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";

// CSS
// TODO: CSS 파일 나누기
const TableWrapper = styled.table.attrs({
  className:
    "min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white ",
})``;
const TbodyWrapper = styled.tbody.attrs({
  className: "bg-white divide-y divide-gray-200",
})``;

const Thead = styled.thead.attrs({
  className: "bg-gray-50",
})`
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `};
`;
const ThWrapper = styled.th.attrs({
  className:
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ",
})``;
const TrWrapper = styled.tr.attrs({
  className: " ",
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

//////////// end of css
// th
interface ThProps {
  title?: string;
  children?: React.ReactNode | React.FC | ReactChildren;
}
const TH: React.FC<ThProps> = (props: ThProps) => {
  return (
    <ThWrapper scope="col">
      {props.children ? props.children : props.title}
    </ThWrapper>
  );
};

// tr
interface TrProps {
  id: string;
  children?: ReactChildren;
  // cls
}
const TR = (props) => {
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
const TD: React.FC<TdProps> = (props: TdProps) => {
  return <TDWrapper>{props.value}</TDWrapper>;
};

/////////////////////////////////////////////////////////////

interface TableProps {
  data?: Array<string>;
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  return (
    <>
      <TableWrapper>
        <Thead color="light-gray">
          <tr>
            {/* 전체 선택 체크박스 */}
            <TH>
              <input
                type="checkbox"
                name=""
                id=""
                // onChange={(e) => changeAllChekcedHandler(e.target.checked)}
                // checkItems의 갯 수와 불러오는 데이터가 같을 때, 전체 선택을 활성화
                // 하나라도 빼면 체크 박스 해제
                // checked={checkItems.length === postsPerPage ? true : false}
              />
            </TH>

            <TH title="TableHead" />
            <TH title="TableHead" />
            <TH title="TableHead" />
            <TH title="TableHead" />
            <TH>
              <span className="sr-only">Action</span>
            </TH>
          </tr>
        </Thead>

        <TbodyWrapper>
          <TR>
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  밝음
                </div>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  밝음
                </div>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <h2
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red",
                  }}
                >
                  밝음
                </h2>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <h2
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red",
                  }}
                >
                  밝음
                </h2>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <h2
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red",
                  }}
                >
                  밝음
                </h2>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <h2
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red",
                  }}
                >
                  밝음
                </h2>
              }
            />
          </TR>
          <TR>
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  밝음
                </div>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <div
                  style={{
                    width: "50%",
                    height: "100%",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  밝음
                </div>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <h2
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "red",
                  }}
                >
                  밝음
                </h2>
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <img
                  src="https://pbs.twimg.com/profile_images/1354357825355411464/kJZxEWo5_400x400.jpg"
                  style={{
                    width: "10%",
                    color: "red",
                  }}
                />
              }
            />
            <TD
              id="test"
              title="미래"
              isHalf
              value={
                <img
                  src="https://pbs.twimg.com/profile_images/1354357825355411464/kJZxEWo5_400x400.jpg"
                  style={{
                    width: "10%",
                    color: "red",
                  }}
                />
              }
            />
          </TR>

          {/* {props.data.map((el, index) => (
            <OrderItem
              key={index}
              data={el}
              index={index}
              checkItems={checkItems}
              setCheckItems={setCheckItems}
              handleSingleCheck={handleSingleCheck}
            />
          ))} */}
        </TbodyWrapper>
      </TableWrapper>
    </>
  );
};
export default Table;
