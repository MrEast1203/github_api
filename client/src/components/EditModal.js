import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import instance from "../api";
import { useList } from "../hooks/useList";
import { useParams } from "react-router-dom";

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

const EditModal = ({
  open,
  onClose,
  data,
  setUseTitle,
  setUseBody,
  setUseLabels,
}) => {
  const [title, setTitle] = useState(data.title ?? "");
  const [body, setBody] = useState(data.body ?? "");
  const [state, setState] = useState(
    data.labels
      ? data.labels.length === 0
        ? "Open"
        : data.labels[0].name
      : "Open"
  );

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isBody30, setIsBody30] = useState(false);
  const url = data.url ?? "https://api.github.com/users/OWNER/REPO/";
  const owner = new URL(url).pathname.split("/")[2];
  const repo = new URL(url).pathname.split("/")[3];

  const { accessToken, setIssueArr, issueArr } = useList();
  const { id } = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleEdit = () => {
    if (title === "" || body.length < 30) {
      title === "" ? setIsTitleEmpty(true) : setIsTitleEmpty(false);
      body.length < 30 ? setIsBody30(true) : setIsBody30(false);
      return;
    } else {
      setIsTitleEmpty(false);
      setIsBody30(false);
    }
    //edit api
    const editIssue = async () => {
      await instance
        .get("editIssue", {
          params: {
            owner: owner,
            repo: repo,
            title: title,
            body: body,
            issue_number: data.number,
            labels: [state],
          },
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(({ data }) => {
          // console.log("🚀 ~ file: AddModal.js:75 ~ addIssue ~ data", data);
          if (data.message) console.log("Wrong Repo");
          else {
            const newArr = [...issueArr];
            newArr[id] = data;
            setUseTitle(data.title);
            setUseBody(data.body);
            setUseLabels(
              data.labels.length === 0 ? "Open" : data.labels[0].name
            );
            setIssueArr(newArr);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ file: AddModal.js:79 ~ addIssue ~ err", err);
        });
    };
    editIssue();
    onClose();
  };
  const handleClose = () => {
    setIsTitleEmpty(false);
    setIsBody30(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Title
        </Typography>
        <TextField
          required
          fullWidth
          error={isTitleEmpty}
          defaultValue={title}
          id="standard-required"
          label="Title"
          variant="standard"
          sx={{ mb: 2 }}
          onChange={handleTitleChange}
        />

        <FormControl sx={{ mb: 2 }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            State
          </InputLabel>
          <NativeSelect
            defaultValue={state}
            inputProps={{
              name: "State",
              id: "uncontrolled-native",
            }}
            onChange={handleStateChange}>
            <option value={"Open"}>Open</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Done"}>Done</option>
          </NativeSelect>
        </FormControl>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          Body
        </Typography>
        <TextField
          fullWidth
          multiline
          defaultValue={body}
          error={isBody30}
          id="standard"
          label="At least 30 words"
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
          <Button variant="contained" color="success" onClick={handleEdit}>
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
