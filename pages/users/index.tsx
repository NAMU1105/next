import { useEffect, useState } from "react";
import Link from "next/link";
import { initializeApollo } from "../../lib/apolloClient";
// import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_USER_COUNT_AND_USER_PAGENATED,
  GET_USERS,
  GET_USER_PAGENATED,
} from "../../lib/queries/users";
import Pagination from "../../components/navigation/pagination";

let isMonted = false;
// let totalPage;
const USER_PER_PAGE = 5;
const apolloClient = initializeApollo();

type Users = {
  __typename: string;
  id: string;
  firstName: string;
};
interface USERS_PROPS {
  userPaginated: Array<Users>;
  // users: Array<Users>;
  userAllCount: number;
}

export const Index: React.FC<USERS_PROPS> = (props: USERS_PROPS) => {
  const [users, setUsers] = useState<Array<Users>>(props.userPaginated);
  const [page, setPage] = useState<number>(1); // current page
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(props.userAllCount / USER_PER_PAGE)
  );

  // const

  // console.log(props.userAllCount);

  const setPageHandler = (param) => {
    console.log("setPageHandler:", param);
    // 클릭한 페이지가 현재 페이지일 경우 리턴
    if (page === param) return;
    // TODO: 맨앞(0), 맨뒤(-1) 클릭 처리도 해주기
    // console.log("it works!");
    setPage(param);
  };

  // 페이지네이션 아이템 클릭 시 페이지 바꿔주는 함수
  const changePage = async (param) => {
    const { data, error } = await apolloClient.query({
      query: GET_USER_PAGENATED,
      variables: {
        page: param,
        per_page: USER_PER_PAGE,
      },
    });

    console.log("paging data: ", data);
    setUsers(data.userPaginated);
  };

  // pagination 페이징
  useEffect(() => {
    if (!isMonted) return;

    console.log("page: ", page);
    changePage(page);
  }, [page]);

  // 이 코드가 pagination코드 아래에 있어야 첫 페이지 렌더링 시 불필요한 1페이지 요청을 하지 않는다.
  useEffect(() => {
    if (isMonted === false) {
      // console.log("first");
      // console.log(isMonted);
      isMonted = true;
      // totalPage = Math.ceil(props.userAllCount / USER_PER_PAGE);
      console.log(totalPage);
    }
    // console.log("second");
    // console.log(isMonted);
  }, []);

  // // if (isMonted) {
  // const { loading, error, data } = useQuery(GET_PEOPLE);
  // console.log(`data!: `, data);
  // // }

  return (
    <section className="users-page">
      <h1>Users page</h1>
      <ul>
        {users.map((user) => {
          const { id, firstName } = user;
          return (
            <Link key={id} href={`/users/${id}`}>
              <li key={id}>{`${id}. ${firstName}`}</li>
            </Link>
          );
        })}
      </ul>

      {/* <p>pagination</p> */}
      <Pagination
        // currentPage={page}
        totalPage={totalPage}
        itemsPerPage={USER_PER_PAGE}
        pagesPerBlock={5}
        onClick={setPageHandler}
      />
    </section>
  );
};

export const getServerSideProps = async (ctx) => {
  const { data, error } = await apolloClient.query(
    {
      query: GET_ALL_USER_COUNT_AND_USER_PAGENATED,
      variables: {
        page: 1,
        per_page: USER_PER_PAGE,
      },
    }
    // query: GET_USERS
  );

  //   invalid한 url일 경우 404페이지 띄움
  if (!data) {
    return { notFound: true };
  }

  console.log("getServerSideProps data: ", data);

  return {
    props: data,
  };
};

export default Index;
