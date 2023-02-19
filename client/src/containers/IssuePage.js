import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack } from "@mui/system";
import Chip from "@mui/material/Chip";
import { useNavigate, useLocation } from "react-router-dom";
import EDMenu from "../components/EDMenu";
import EditModal from "../components/EditModal";
import { useList } from "../hooks/useList";

const IssuePage = () => {
  const navigate = useNavigate();
  // const { state } = useLocation();
  const ToList = () => {
    navigate("/");
  };
  const { title, body, labels, user } = useLocation().state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEDMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [useTitle, setUseTitle] = React.useState(title);
  const [useBody, setUseBody] = React.useState(body);
  const [useLabels, setUseLabels] = React.useState(
    labels.length === 0 ? "Open" : labels[0].name
  );

  const { openEditModal, setOpenEditModal, dataForEdit } = useList();

  const Edit = ({
    open,
    onClose,
    data,
    setUseTitle,
    setUseBody,
    setUseLabels,
  }) => {
    return (
      <EditModal
        open={open}
        onClose={onClose}
        data={data}
        setUseTitle={setUseTitle}
        setUseBody={setUseBody}
        setUseLabels={setUseLabels}
      />
    );
  };

  return (
    <Card sx={{ width: 600, p: "1em" }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={"80%"}>
        <Chip label={useLabels} />
        <div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <EDMenu
            anchorEl={anchorEl}
            open={openEDMenu}
            onClose={handleClose}
            data={useLocation().state}
            ToList={ToList}
          />
        </div>
      </Stack>
      <CardHeader
        avatar={<Avatar src={user.avatar_url} />}
        title={useTitle}
        titleTypographyProps={{ fontSize: 20 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {useBody}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={ToList}>
          <ArrowBackIcon />
        </IconButton>
      </CardActions>
      <Edit
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        data={dataForEdit}
        setUseTitle={setUseTitle}
        setUseBody={setUseBody}
        setUseLabels={setUseLabels}
      />
    </Card>
  );
};

export default IssuePage;
