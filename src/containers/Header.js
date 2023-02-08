import React from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Issue List
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu">
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
