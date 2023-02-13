import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterMenu from "../components/FilterMenu";
import LoginIcon from "@mui/icons-material/Login";
import { useList } from "../hooks/useList";
import LogoutIcon from "@mui/icons-material/Logout";
const Header = () => {
  ///Filter
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilterMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  ////////
  const [isOpen, setIsOpen] = useState(true);
  const [isInProgress, setIsInProgress] = useState(true);
  const [isDone, setIsDone] = useState(true);

  const { filtedIssueArr, setFiltedIssueArr, issueArr, setRerender } =
    useList();

  const filterArr = () => {
    if (issueArr) {
      const newArr = issueArr.filter((element) => {
        return (
          element.status === (isOpen ? "Open" : "") ||
          element.status === (isInProgress ? "In Progress" : "") ||
          element.status === (isDone ? "Done" : "")
        );
      });
      return newArr;
    }
    return issueArr;
  };
  useEffect(() => {
    if (filtedIssueArr) setFiltedIssueArr(filterArr());
  }, [isOpen, isInProgress, isDone]);

  const loginURL = "https://github.com/login/oauth/authorize";
  const CLIENT_ID = "c30221ea25480ba9a220";
  const scope = "repo+user";
  const loginGithub = () => {
    if (!localStorage.getItem("accessToken")) {
      window.location.assign(
        loginURL + "?client_id=" + CLIENT_ID + "&scope=" + scope
      );
    } else {
      localStorage.removeItem("accessToken");
      setRerender((prev) => !prev);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={loginGithub}>
            {!localStorage.getItem("accessToken") ? (
              <LoginIcon />
            ) : (
              <LogoutIcon />
            )}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {!localStorage.getItem("accessToken") ? "Please login" : "Wellcome"}
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
            <FilterMenu
              anchorEl={anchorEl}
              open={openFilterMenu}
              onClose={handleClose}
              isOpen={isOpen}
              isInProgress={isInProgress}
              isDone={isDone}
              setIsOpen={setIsOpen}
              setIsInProgress={setIsInProgress}
              setIsDone={setIsDone}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
