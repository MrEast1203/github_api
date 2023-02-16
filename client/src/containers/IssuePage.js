import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
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
  const { title, body, state } = useLocation().state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEDMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { openEditModal, setOpenEditModal, dataForEdit } = useList();

  const Edit = ({ open, onClose, data }) => {
    return <EditModal open={open} onClose={onClose} data={data} />;
  };

  return (
    <Card sx={{ width: 600, p: "1em" }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={"80%"}>
        <Chip label={state} />
        <div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <EDMenu
            anchorEl={anchorEl}
            open={openEDMenu}
            onClose={handleClose}
            data={state}
            ToList={ToList}
          />
        </div>
      </Stack>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
        titleTypographyProps={{ fontSize: 20 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body}
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
      />
    </Card>
  );
};

export default IssuePage;
