import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useList } from "../hooks/useList";
import instance from "../api";
import { useParams } from "react-router-dom";

const EDMenu = ({ anchorEl, open, onClose, data, ToList }) => {
  const {
    setOpenEditModal,
    setDataForEdit,
    accessToken,
    issueArr,
    setIssueArr,
  } = useList();
  const url = data.url ?? "https://api.github.com/users/OWNER/REPO/";
  const owner = new URL(url).pathname.split("/")[2];
  const repo = new URL(url).pathname.split("/")[3];
  const { id } = useParams();
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
      <MenuItem
        onClick={() => {
          setDataForEdit(data);
          setOpenEditModal(true);
          onClose();
        }}
        sx={{ width: 200 }}>
        <ListItemIcon>
          <FiEdit fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onClose();
          //delete api
          const deleteIssue = async () => {
            await instance
              .get("deleteIssue", {
                params: {
                  owner: owner,
                  repo: repo,
                  issue_number: data.number,
                },
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              })
              .then(({ data }) => {
                console.log(
                  "🚀 ~ file: AddModal.js:75 ~ addIssue ~ data",
                  data
                );
                if (data.message) console.log("Wrong Repo");
                else {
                  const newArr = [...issueArr];
                  newArr.splice(id, 1);
                  setIssueArr(newArr);
                }
              })
              .catch((err) => {
                console.log("🚀 ~ file: AddModal.js:79 ~ addIssue ~ err", err);
              });
          };
          deleteIssue();
          ToList();
        }}>
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
