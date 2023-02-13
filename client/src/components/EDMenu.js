import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const EDMenu = ({ anchorEl, open, onClose }) => {
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
      <MenuItem onClick={onClose} sx={{ width: 200 }}>
        <ListItemIcon>
          <FiEdit fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <AiOutlineDelete fontSize="small" color="#FF0033" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ color: "#FF0033" }}>
          Delete
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default EDMenu;
