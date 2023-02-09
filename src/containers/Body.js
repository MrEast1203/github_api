import * as React from "react";
import ListItem from "@mui/material/ListItem";
import { useState, useRef, useCallback, useEffect } from "react";
import InfiniteLoadComponent from "../components/InfiniteLoadComponent";
import { useNavigate } from "react-router-dom";
import ListButton from "../components/ListButton";
// const openColor = "#808080";
// const progressColor = "#FF0033";
// const doneColor = "#4BB543";

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
  ,
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

const useDetectScrolledToBottom = (node) => {
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("reached bottom hook");
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  }, [node]);
  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => node.current.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);
  return { isBottom };
};

export default function IssueList() {
  ///scroll
  const node = useRef();
  const { isBottom } = useDetectScrolledToBottom(node);
  // console.log("isBottom:: ", isBottom);
  /////////

  ///route
  const navigate = useNavigate();
  const ToIssuePage = (id) => {
    // console.log("data", data);
    navigate(`/issue/${id}`, {
      state: data,
    });
  };
  ////////
  const [arr, setArr] = useState(testData);
  const [id, setId] = useState(0);
  const [data, setData] = useState({});
  const [isChangePage, setIsChangePage] = useState(false);

  useEffect(() => {
    setIsChangePage(false);
    if (isChangePage) ToIssuePage(id);
  }, [isChangePage]);

  const ListItemButton = ({ data, index, setData, setId, setIsChangePage }) => {
    return (
      <ListButton
        data={data}
        index={index}
        setData={setData}
        setId={setId}
        setIsChangePage={setIsChangePage}
      />
    );
  };

  return (
    <InfiniteLoadComponent
      sx={{
        width: 800,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 500,
      }}>
      {arr.map((data, index) => (
        <ListItem
          key={index}
          sx={{ pt: "4px", pb: "4px", pl: "8px", pr: "8px" }}>
          <ListItemButton
            data={data}
            index={index}
            setData={setData}
            setId={setId}
            setIsChangePage={setIsChangePage}
          />
        </ListItem>
      ))}
    </InfiniteLoadComponent>
  );
}
