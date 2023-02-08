import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import { useState, useRef, useCallback, useEffect } from "react";
import InfiniteLoadComponent from "../components/InfiniteLoadComponent";
import { useNavigate } from "react-router-dom";
const openColor = "#808080";
const progressColor = "#FF0033";
const doneColor = "#4BB543";

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
  console.log("isBottom:: ", isBottom);
  /////////

  ///route
  const navigate = useNavigate();
  const ToIssuePage = () => {
    navigate("/issue");
  };
  ////////
  const [arr, setArr] = useState(testData);
  const addData = () => {
    const data = {
      title: "Problem 11",
      body: "The Body of Problem 3",
      status: "Done",
    };
    setArr((prev) => [...prev, data]);
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
          <ListItemButton onClick={ToIssuePage}>
            <ListItemText
              primary={
                <div style={{ display: "flex" }}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {data.title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Typography variant="body2" component="div">
                      {data.status}
                    </Typography>
                    <SquareIcon
                      fontSize="small"
                      sx={{
                        color:
                          data.status === "Open"
                            ? openColor
                            : data.status === "In Progress"
                            ? progressColor
                            : doneColor,
                      }}
                    />
                  </div>
                </div>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </InfiniteLoadComponent>
  );
}
