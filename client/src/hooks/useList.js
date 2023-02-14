import { createContext, useContext, useState, useEffect } from "react";
import instance from "../api";

const ListContext = createContext({
  //data
  issueArr: [],
  filtedIssueArr: [],
  openEditModal: false,
  dataForEdit: {},
  repoInfo: {},
  //function
  setIssueArr: () => {},
  setFiltedIssueArr: () => {},
  setOpenEditModal: () => {},
  setDataForEdit: () => {},
  setRerender: () => {},
  setRepoInfo: () => {},
  getIssue: () => {},
});

const ListProvider = (props) => {
  //data
  const testData = [
    {
      title: "Problem 1",
      body: "The Body of Problem 1",
      status: "Open",
    },
    {
      title: "Problem 2",
      body: "The Body of Problem 2",
      status: "In Progress",
    },
    {
      title: "Problem 3",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 4",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 5",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 6",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 7",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 8",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 9",
      body: "The Body of Problem 3",
      status: "Done",
    },
    {
      title: "Problem 10",
      body: "The Body of Problem 3",
      status: "Done",
    },
  ];
  const [issueArr, setIssueArr] = useState(testData);
  const [filtedIssueArr, setFiltedIssueArr] = useState(testData);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});
  const [repoInfo, setRepoInfo] = useState({});
  //function
  const getUserData = async () => {
    await instance
      .get("getUserData", {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: useList.js:115 ~ getUserData ~ data", data);
      });
  };

  const getIssue = async () => {
    await instance
      .get("getIssue", {
        params: {
          owner: repoInfo.owner,
          repo: repoInfo.repo,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: useList.js:102 ~ getIssue ~ data", data);
      })
      .catch((err) => {
        console.log("🚀 ~ file: useList.js:104 ~ getIssue ~ err", err);
      });
  };

  //init
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const urlSearch = window.location.search;
    const urlParams = new URLSearchParams(urlSearch);
    const code = urlParams.get("code");
    console.log("🚀 ~ file: useList.js:81 ~ useEffect ~ code", code);

    // local storage
    if (code && localStorage.getItem("accessToken") === null) {
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
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          })
          .catch((err) => {
            console.log("🚀 ~ file: useList.js:104 ~ .then ~ err", err);
          });
      }
      getAccessToken();
    }
  }, []);

  return (
    <ListContext.Provider
      value={{
        issueArr,
        filtedIssueArr,
        openEditModal,
        dataForEdit,
        repoInfo,
        setIssueArr,
        setFiltedIssueArr,
        setOpenEditModal,
        setDataForEdit,
        setRerender,
        setRepoInfo,
        getIssue,
      }}
      {...props}
    />
  );
};
function useList() {
  return useContext(ListContext);
}

export { ListProvider, useList };
