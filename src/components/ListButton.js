import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import ListItemButton from "@mui/material/ListItemButton";

const openColor = "#808080";
const progressColor = "#FF0033";
const doneColor = "#4BB543";

const ListButton = ({ data, index, setData, setId, setIsChangePage }) => {
  return (
    <ListItemButton
      onClick={() => {
        setData(data);
        setId(index);
        setIsChangePage(true);
      }}>
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
  );
};

export default ListButton;
