import { useEffect, useState } from "react";
// import Link from "next/link";
import { initializeApollo } from "../../lib/apolloClient";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE, GET_PEOPLE_PAGENATED } from "../../lib/queries/users";
let isMonted = false;

export const Index = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState<number>(1);

  function getPeople() {
    const apolloClient = initializeApollo();
    const { data, error } = useQuery(GET_PEOPLE);
    console.log(data);
  }

  useEffect(() => {
    if (!isMonted) isMonted = true;

    // const apolloClient = initializeApollo();
    // const { data, error } = await apolloClient.query({
    //   query: GET_PEOPLE,
    // });
    // console.log(data);
    // async function getPeople() {
    //   const apolloClient = initializeApollo();
    //   const { data, error } = await apolloClient.query({
    //     query: GET_PEOPLE,
    //   });
    //   console.log(data);
    // }
    // getPeople();
    if (isMonted) {
      // getPeople();
    }
  }, []);

  return (
    <div className="users-page">
      <h1>Users page</h1>
      {/* <ul>
        {users.map((user) => {
          const { id, name, color } = user;
          return (
            <Link key={id} href={`/users/${id}`}>
              <li style={{ color }}>{`${id}. ${name}(${color})`}</li>
            </Link>
          );
        })}
      </ul> */}
    </div>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data, error } = await apolloClient.query({
    query: GET_PEOPLE,
  });

  //   invalid한 url일 경우 404페이지 띄움
  if (!data) {
    return { notFound: true };
  }

  console.log("data: ", data);

  return {
    props: {
      loadedUser: data,
    },
    revalidate: 1, // 단위: 초
  };
};

export default Index;
