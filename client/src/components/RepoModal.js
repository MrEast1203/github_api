import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useList } from "../hooks/useList";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RepoModal = ({ open, onClose }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };
  const handlRepoChange = (e) => {
    setRepo(e.target.value);
  };
  const { setRepoInfo } = useList();

  const handleEdit = () => {
    setRepoInfo({ owner: owner, repo: repo });
    //Get Issue Api
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Owner
        </Typography>
        <TextField
          required
          fullWidth
          defaultValue={owner}
          id="standard-required"
          label="Owner"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handleOwnerChange}
        />

        <Typography id="modal-modal-title" variant="h6" component="h2">
          Repo
        </Typography>
        <TextField
          fullWidth
          required
          defaultValue={repo}
          id="standard"
          label="Repo"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handlRepoChange}
        />

        <Stack
          direction="row"
          spacing={0}
          alignItems={"center"}
          justifyContent={"space-around"}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleEdit}>
            Enter
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default RepoModal;
