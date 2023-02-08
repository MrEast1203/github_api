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

const IssuePage = () => {
  return (
    <Card sx={{ width: 600, p: "1em" }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={"80%"}>
        <Chip label="Open" />
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        titleTypographyProps={{ fontSize: 20 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default IssuePage;
