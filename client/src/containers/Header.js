import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterMenu from "../components/FilterMenu";
import LoginIcon from "@mui/icons-material/Login";
import { useList } from "../hooks/useList";
import LogoutIcon from "@mui/icons-material/Logout";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddModal from "../components/AddModal";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../components/SearchBar";
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
  const [isOpen, setIsOpen] = useState(true);
  const [isInProgress, setIsInProgress] = useState(true);
  const [isDone, setIsDone] = useState(true);

  const {
    setFiltedIssueArr,
    issueArr,
    getIssue,
    accessToken,
    setAccessToken,
    searchItem,
  } = useList();

  const filterArr = () => {
    // console.log("🚀 ~ file: Header.js:42 ~ filterArr ~ issueArr", issueArr);
    if (issueArr) {
      const newArr = issueArr.filter((element) => {
        return element.labels.length === 0
          ? isOpen
          : element.labels[0].name === (isOpen ? "Open" : "") ||
            element.labels.length === 0
          ? true
          : element.labels[0].name === (isInProgress ? "In Progress" : "") ||
            element.labels.length === 0
          ? true
          : element.labels[0].name === (isDone ? "Done" : "");
      });
      if (searchItem === "") return newArr;
      else {
        const newArr2 = newArr.filter((element) => {
          return (
            element.title.includes(searchItem) ||
            element.body.includes(searchItem)
          );
        });
        return newArr2;
      }
    }
    return issueArr;
  };
  useEffect(() => {
    setFiltedIssueArr(filterArr());
  }, [isOpen, isInProgress, isDone, issueArr, searchItem]);
  ////////

  const loginURL = "https://github.com/login/oauth/authorize";
  const CLIENT_ID = "c30221ea25480ba9a220";
  const scope = "repo+read:user";
  const loginGithub = () => {
    if (accessToken === "") {
      window.location.assign(
        loginURL + "?client_id=" + CLIENT_ID + "&scope=" + scope
      );
    } else {
      setAccessToken("");
    }
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };
  const handleAddModalClose = () => {
    setOpenAddModal(false);
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
            {accessToken === "" ? <LoginIcon /> : <LogoutIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {accessToken === "" ? "Please login" : "Wellcome"}
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={getIssue}>
            <GetAppIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleAddModalOpen}>
            <AddIcon />
          </IconButton>
          <AddModal open={openAddModal} onClose={handleAddModalClose} />
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
          <SearchBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
