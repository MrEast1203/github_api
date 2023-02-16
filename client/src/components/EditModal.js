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

const EditModal = ({ open, onClose, data }) => {
  const [title, setTitle] = useState(data.title ?? "");
  const [body, setBody] = useState(data.body ?? "");
  const [state, setState] = useState(data.state ?? "");

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isBody30, setIsBody30] = useState(false);

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
            <option value={"open"}>Open</option>
            <option value={"in progress"}>In Progress</option>
            <option value={"done"}>Done</option>
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
