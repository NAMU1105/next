import { useEffect, useState } from "react";
import Link from "next/link";
import { initializeApollo } from "../../lib/apolloClient";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_PEOPLE_PAGENATED } from "../../lib/queries/users";

let isMonted = false;
const USER_PER_PAGE = 5;
const apolloClient = initializeApollo();

type Users = {
  __typename: string;
  id: string;
  firstName: string;
};
interface USERS_PROPS {
  userPaginated: Array<Users>;
}

export const Index: React.FC<USERS_PROPS> = (props: USERS_PROPS) => {
  const [users, setUsers] = useState<Array<Users>>(props.userPaginated);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  // const

  const setPageHandler = (param) => {
    setPage(param);
  };

  // 페이지네이션 아이템 클릭 시 페이지 바꿔주는 함수
  const changePage = async (param) => {
    const { data, error } = await apolloClient.query({
      query: GET_PEOPLE_PAGENATED,
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

      <p>pagination</p>
      <ul>
        <li onClick={() => setPageHandler(1)}>1</li>
        <li onClick={() => setPageHandler(2)}>2</li>
        <li onClick={() => setPageHandler(3)}>3</li>
        <li onClick={() => setPageHandler(4)}>4</li>
        <li onClick={() => setPageHandler(5)}>5</li>

        {/* {props.userPaginated.map((user) => {
          const { id, firstName } = user;
          return <li key={id} onClick={setPageHandler}></li>;
        })} */}
      </ul>
    </section>
  );
};

export const getServerSideProps = async (ctx) => {
  const { data, error } = await apolloClient.query({
    query: GET_PEOPLE_PAGENATED,
    variables: {
      page: 1,
      per_page: USER_PER_PAGE,
    },
  });

  //   invalid한 url일 경우 404페이지 띄움
  if (!data) {
    return { notFound: true };
  }

  // console.log("getServerSideProps data: ", data.userPaginated);

  return {
    props: data,
  };
};
// export const getStaticProps = async () => {
//   const apolloClient = initializeApollo();

//   const { data, error } = await apolloClient.query({
//     query: GET_PEOPLE,
//   });

//   //   invalid한 url일 경우 404페이지 띄움
//   if (!data) {
//     return { notFound: true };
//   }

//   // console.log("data: ", data);

//   return {
//     props: {
//       loadedUser: data,
//     },
//     revalidate: 1, // 단위: 초
//   };
// };

export default Index;
