import * as React from "react";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import SquareIcon from "@mui/icons-material/Square";
import ListItem from "@mui/material/ListItem";

const openColor = "#808080";
const progressColor = "#FF0033";
const doneColor = "#4BB543";

const FilterMenu = ({
  anchorEl,
  open,
  onClose,
  isOpen,
  isInProgress,
  isDone,
  setIsOpen,
  setIsInProgress,
  setIsDone,
}) => {
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleInProgress = () => {
    setIsInProgress((prev) => !prev);
  };
  const handleDone = () => {
    setIsDone((prev) => !prev);
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <ListItem>
        <Checkbox checked={isOpen} onChange={handleOpen} />

        <SquareIcon fontSize="small" sx={{ color: openColor }} />
        <ListItemText>Open</ListItemText>
      </ListItem>
      <ListItem>
        <Checkbox checked={isInProgress} onChange={handleInProgress} />

        <SquareIcon fontSize="small" sx={{ color: progressColor }} />
        <ListItemText>In Progress</ListItemText>
      </ListItem>
      <ListItem>
        <Checkbox checked={isDone} onChange={handleDone} />
        <SquareIcon fontSize="small" sx={{ color: doneColor }} />
        <ListItemText>Done</ListItemText>
      </ListItem>
    </Menu>
  );
};

export default FilterMenu;
