import { createContext, useContext, useState, useEffect } from "react";
import instance from "../api";

const ListContext = createContext({
  //data
  issueArr: [],
  filtedIssueArr: [],
  openEditModal: false,
  dataForEdit: {},
  accessToken: "",
  searchItem: "",
  //function
  setIssueArr: () => {},
  setFiltedIssueArr: () => {},
  setOpenEditModal: () => {},
  setDataForEdit: () => {},
  getIssue: () => {},
  setAccessToken: () => {},
  setUpdateIssue: () => {},
  setSearchItem: () => {},
});

const ListProvider = (props) => {
  //data

  const [issueArr, setIssueArr] = useState([]);
  const [filtedIssueArr, setFiltedIssueArr] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");
  const [page, setPage] = useState(1);
  const [updateIssue, setUpdateIssue] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [pageForSearch, setPageForSearch] = useState(1);
  //function
  const getUserData = async () => {
    console.log(accessToken);
    await instance
      .get("getUserData", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: useList.js:115 ~ getUserData ~ data", data);
        if (user === "") setUser(data.login);
      });
  };

  const getIssue = async () => {
    await instance
      .get("getIssue", {
        params: {
          user: user,
          page: page,
        },
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: useList.js:102 ~ getIssue ~ data", data);
        if (data.items.length === 10) setPage((prev) => prev + 1);
        if (!data.message) {
          console.log("🚀 ~ file: useList.js:65 ~ .then ~ page", page);
          if (data.total_count > issueArr.length) {
            if (page !== 1) setIssueArr((prev) => [...prev, ...data.items]);
            else setIssueArr(data.items);
          }
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: useList.js:104 ~ getIssue ~ err", err);
      });
  };
  const getIssueSearch = async () => {
    await instance
      .get("getIssue", {
        params: {
          user: user,
          page: pageForSearch,
          search: searchItem,
        },
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: useList.js:102 ~ getIssueSearch ~ data", data);
        if (data.items.length === 10) setPageForSearch((prev) => prev + 1);
        if (!data.message) {
          console.log("🚀 ~ file: useList.js:65 ~ .then ~ page", page);
          if (data.total_count > issueArr.length) {
            if (pageForSearch !== 1)
              setIssueArr((prev) => [...prev, ...data.items]);
            else setIssueArr(data.items);
          }
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: useList.js:104 ~ getIssueSearch ~ err", err);
      });
  };

  //init
  useEffect(() => {
    const urlSearch = window.location.search;
    const urlParams = new URLSearchParams(urlSearch);
    const code = urlParams.get("code");
    console.log("🚀 ~ file: useList.js:81 ~ useEffect ~ code", code);

    if (code && accessToken === "") {
      async function getAccessToken() {
        await instance
          .get("getAccessToken", {
            params: {
              code: code,
            },
          })
          .then(({ data }) => {
            console.log("🚀 ~ file: useList.js:95 ~ data", data);
            if (data.access_token) {
              setAccessToken(data.access_token);
            }
          })
          .catch((err) => {
            console.log("🚀 ~ file: useList.js:104 ~ .then ~ err", err);
          });
      }
      getAccessToken();
    }
  }, []);

  useEffect(() => {
    if (accessToken !== "") {
      getUserData();
    }
  }, [accessToken]);
  useEffect(() => {
    if (user !== "") {
      getIssue();
    }
  }, [user, updateIssue]);

  return (
    <ListContext.Provider
      value={{
        issueArr,
        filtedIssueArr,
        openEditModal,
        dataForEdit,
        accessToken,
        searchItem,
        setIssueArr,
        setFiltedIssueArr,
        setOpenEditModal,
        setDataForEdit,
        getIssue,
        setAccessToken,
        setUpdateIssue,
        setSearchItem,
      }}
      {...props}
    />
  );
};
function useList() {
  return useContext(ListContext);
}

export { ListProvider, useList };
