import * as React from "react";
import ListItem from "@mui/material/ListItem";
import { useState, useEffect } from "react";
import InfiniteLoadComponent from "../components/InfiniteLoadComponent";
import { useNavigate } from "react-router-dom";
import ListButton from "../components/ListButton";
import { useList } from "../hooks/useList";
// const openColor = "#808080";
// const progressColor = "#FF0033";
// const doneColor = "#4BB543";

export default function IssueList() {
  ///route
  const navigate = useNavigate();
  const ToIssuePage = (id) => {
    // console.log("data", data);
    navigate(`/issue/${id}`, {
      state: data,
    });
  };
  ////////

  ///useList
  const { filtedIssueArr } = useList();
  ////////

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
      {filtedIssueArr.map((data, index) => (
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
