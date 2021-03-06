import { useEffect, useState } from "react";
import Link from "next/link";
import { initializeApollo } from "../../lib/apolloClient";
import { CSVLink } from "react-csv";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { I18nPage, useTranslation } from "../../i18n";
// import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { useTranslation } from "next-i18next";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

import {
  GET_USERS,
  GET_ALL_USER_COUNT_AND_USER_PAGENATED,
  GET_USER_PAGENATED,
} from "../../lib/queries/users";
import Pagination from "../../components/navigation/pagination";
import { Table, TH, TR, TD } from "../../components/table/table";
import { TheadWrapper, TbodyWrapper } from "../../components/table/table";
import Button from "../../components/form/button";

let isMonted = false;
// let totalPage;
const USER_PER_PAGE = 5;
const apolloClient = initializeApollo();

// type CsvHeader = {
//   label: string;
//   key: string;
// };

// type CsvData = {};

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
  const { t } = useTranslation("translation");

  const [users, setUsers] = useState<Array<Users>>(props.userPaginated);
  // const [csvHeaders, setCsvHeaders] = useState(
  //   Object.keys(props.userPaginated[0])
  // );
  const [csvData, setCsvData] = useState<Array<Users>>(props.userPaginated);
  const [page, setPage] = useState<number>(1); // current page
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(props.userAllCount / USER_PER_PAGE)
  );
  const [checkItems, setCheckItems] = useState<Array<string | number>>([]);

  // useEffect(() => {
  // const { loading, error, data } = useQuery(GET_USERS);
  // console.log("userQuery:", data);
  // }, []);

  const setPageHandler = (param) => {
    // console.log("setPageHandler:", param);
    // ????????? ???????????? ?????? ???????????? ?????? ??????
    if (page === param) return;
    setPage(param);
  };

  // ?????????????????? ????????? ?????? ??? ????????? ???????????? ??????
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
    setCsvData(data.userPaginated);
  };

  // pagination ?????????
  useEffect(() => {
    if (!isMonted) return;

    console.log("page: ", page);
    changePage(page);
    // ???????????? ??????????????? ?????? ????????????.
    setCheckItems([]);
  }, [page]);

  // ??? ????????? pagination?????? ????????? ????????? ??? ????????? ????????? ??? ???????????? 1????????? ????????? ?????? ?????????.
  useEffect(() => {
    if (isMonted === false) {
      // console.log("first");
      // console.log(isMonted);
      isMonted = true;
    }
    // console.log("second");
    // console.log(isMonted);
    // console.log(users);
  }, []);

  // ???????????? ?????? ??????
  const changeAllChekcedHandler = (checked) => {
    if (checked) {
      const idArray = [];
      // ?????? ?????? ????????? ?????? ?????? id??? ?????? ?????? elements??? ????????? ???????????????,
      // ?????? ?????? ?????? ??????
      users.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }

    // ????????? ?????? ?????? ?????? ?????? ?????? ??????
    else {
      setCheckItems([]);
    }
  };

  // ???????????? ?????? ?????? ?????? ??????
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      // ?????? ??????
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    console.log(t("title"));
    console.log(typeof t("test"));
  }, []);

  return (
    <section className="users-page">
      {/* <Button>{t("title")}</Button> */}
      <h1>Users page</h1>

      {/* CSV export */}
      {/* <CSVLink data={csvData} headers={csvHeaders} filename={"my-file.csv"}> */}

      <Button size="sm" bgColor="secondary">
        <CSVLink data={csvData} filename={"my-file.csv"}>
          Download me
        </CSVLink>
      </Button>

      {/* <ul>
        {users.map((user) => {
          const { id, firstName } = user;
          return (
            <Link key={id} href={`/users/${id}`}>
              <li key={id}>{`${id}. ${firstName}`}</li>
            </Link>
          );
        })}
      </ul> */}
      <Table>
        <TheadWrapper>
          <TR>
            <TH>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => changeAllChekcedHandler(e.target.checked)}
                // checkItems??? ??? ?????? ???????????? ???????????? ?????? ???, ?????? ????????? ?????????
                // ???????????? ?????? ?????? ?????? ??????
                checked={checkItems.length === USER_PER_PAGE ? true : false}
              />
            </TH>
            {Object.keys(users[0]).map((th) => {
              if (th !== "__typename") {
                return <TH title={th} key={th} />;
              }
            })}

            <TH>
              <span className="sr-only">Action</span>
            </TH>
          </TR>
        </TheadWrapper>
        <TbodyWrapper>
          {users.map((user) => {
            const { id, firstName } = user;
            return (
              <TR key={id}>
                <TD
                  value={
                    <input
                      type="checkbox"
                      id={id}
                      onChange={(e) => handleSingleCheck(e.target.checked, id)}
                      checked={checkItems.includes(id) ? true : false}
                    />
                  }
                />
                <TD value={<span>{id}</span>} />
                <TD
                  value={
                    <Link key={id} href={`/users/${id}`}>
                      <span>{`${firstName}`}</span>
                    </Link>
                  }
                />
                <TD value={null} />
              </TR>
            );
          })}
        </TbodyWrapper>
      </Table>

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
  // const { loading, error: errorTest, data: dataTest } = useQuery(GET_USERS);
  // console.log("userQuery:", dataTest);

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

  //   invalid??? url??? ?????? 404????????? ??????
  if (!data) {
    return { notFound: true };
  }

  console.log("getServerSideProps data: ", data);

  return {
    props: data,
  };
};

// export const getStaticProps = async ({ locale = "ko" }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

export default Index;
