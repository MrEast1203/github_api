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

const IssuePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ToList = () => {
    navigate("/");
  };
  const { title, body, status } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEDMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ width: 600, p: "1em" }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={"80%"}>
        <Chip label={status} />
        <div>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <EDMenu anchorEl={anchorEl} open={openEDMenu} onClose={handleClose} />
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
    </Card>
  );
};

export default IssuePage;
