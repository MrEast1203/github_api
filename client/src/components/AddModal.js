import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useList } from "../hooks/useList";
import instance from "../api";

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

const AddModal = ({ open, onClose }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [isOwnerEmpty, setIsOwnerEmpty] = useState(false);
  const [isRepoEmpty, setIsRepoEmpty] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isBody30, setIsBody30] = useState(false);

  const { accessToken, setIssueArr } = useList();

  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };
  const handlRepoChange = (e) => {
    setRepo(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleAdd = () => {
    if (title === "" || body.length < 30 || repo === "" || owner === "") {
      title === "" ? setIsTitleEmpty(true) : setIsTitleEmpty(false);
      repo === "" ? setIsRepoEmpty(true) : setIsRepoEmpty(false);
      owner === "" ? setIsOwnerEmpty(true) : setIsOwnerEmpty(false);
      body.length < 30 ? setIsBody30(true) : setIsBody30(false);

      return;
    } else {
      setIsTitleEmpty(false);
      setIsBody30(false);
      setIsRepoEmpty(false);
      setIsOwnerEmpty(false);
    }
    const addIssue = async () => {
      await instance
        .get("addIssue", {
          params: {
            owner: owner,
            repo: repo,
            title: title,
            body: body,
          },
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(({ data }) => {
          // console.log("🚀 ~ file: AddModal.js:75 ~ addIssue ~ data", data);
          if (data.message) console.log("Wrong Repo");
          else {
            setIssueArr((prev) => [data, ...prev]);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ file: AddModal.js:79 ~ addIssue ~ err", err);
        });
    };
    //add api
    addIssue();
    onClose();
  };

  const handleClose = () => {
    setIsTitleEmpty(false);
    setIsBody30(false);
    setIsRepoEmpty(false);
    setIsOwnerEmpty(false);
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
          fullWidth
          required
          defaultValue={owner}
          error={isOwnerEmpty}
          id="standard"
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
          error={isRepoEmpty}
          id="standard"
          label="Repo"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handlRepoChange}
        />

        <Typography id="modal-modal-title" variant="h6" component="h2">
          Title
        </Typography>
        <TextField
          fullWidth
          required
          error={isTitleEmpty}
          defaultValue={title}
          id="standard"
          label="Title"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handleTitleChange}
        />

        <Typography id="modal-modal-title" variant="h6" component="h2">
          Body
        </Typography>
        <TextField
          fullWidth
          required
          multiline
          error={isBody30}
          defaultValue={body}
          id="standard"
          label="Body"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handleBodyChange}
        />

        <Stack
          direction="row"
          spacing={0}
          alignItems={"center"}
          justifyContent={"space-around"}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleAdd}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddModal;
