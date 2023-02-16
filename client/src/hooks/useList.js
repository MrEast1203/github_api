import { createContext, useContext, useState, useEffect } from "react";
import instance from "../api";

const ListContext = createContext({
  //data
  issueArr: [],
  filtedIssueArr: [],
  openEditModal: false,
  dataForEdit: {},
  repoInfo: {},
  accessToken: "",
  //function
  setIssueArr: () => {},
  setFiltedIssueArr: () => {},
  setOpenEditModal: () => {},
  setDataForEdit: () => {},
  setRepoInfo: () => {},
  getIssue: () => {},
  setAccessToken: () => {},
  setUpdateIssue: () => {},
});

const ListProvider = (props) => {
  //data

  const [issueArr, setIssueArr] = useState([]);
  const [filtedIssueArr, setFiltedIssueArr] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});
  const [repoInfo, setRepoInfo] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState("");
  const [page, setPage] = useState(1);
  const [updateIssue, setUpdateIssue] = useState(false);
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
        if (data.total_count === 10) setPage((prev) => prev + 1);
        if (!data.message) setIssueArr(data.items);
      })
      .catch((err) => {
        console.log("🚀 ~ file: useList.js:104 ~ getIssue ~ err", err);
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
        repoInfo,
        accessToken,
        setIssueArr,
        setFiltedIssueArr,
        setOpenEditModal,
        setDataForEdit,
        setRepoInfo,
        getIssue,
        setAccessToken,
        setUpdateIssue,
      }}
      {...props}
    />
  );
};
function useList() {
  return useContext(ListContext);
}

export { ListProvider, useList };
