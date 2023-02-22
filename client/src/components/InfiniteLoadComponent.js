import React from "react";
import List from "@mui/material/List";
import { useRef, useCallback, useEffect } from "react";
import { useList } from "../hooks/useList";

const InfiniteLoadComponent = (props) => {
  const { setUpdateIssue } = useList();
  const node = useRef();
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      // console.log("reached bottom hook in scroll component");
      setUpdateIssue((prev) => !prev);
    } else {
    }
  }, [node]);
  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      //   return () => node.current.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);
  return (
    <List
      {...props}
      sx={{
        width: 800,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 500,
      }}
      ref={node}>
      {props.children}
    </List>
  );
};

export default InfiniteLoadComponent;
