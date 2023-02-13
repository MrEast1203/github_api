import { createContext, useContext, useState } from "react";

const ListContext = createContext({
  //data
  issueArr: [],
  filtedIssueArr: [],
  openEditModal: false,
  dataForEdit: {},
  //function
  setIssueArr: () => {},
  setFiltedIssueArr: () => {},
  setOpenEditModal: () => {},
  setDataForEdit: () => {},
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
  //function

  return (
    <ListContext.Provider
      value={{
        issueArr,
        filtedIssueArr,
        openEditModal,
        dataForEdit,
        setIssueArr,
        setFiltedIssueArr,
        setOpenEditModal,
        setDataForEdit,
      }}
      {...props}
    />
  );
};
function useList() {
  return useContext(ListContext);
}

export { ListProvider, useList };
