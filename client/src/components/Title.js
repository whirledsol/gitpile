import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Icon } from '@material-ui/core';
import { Link } from "react-router-dom";
const Title = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Icon className="fa fa-bars" />
        </IconButton>
        </Link>
        <Typography variant="h6" >
          gitpile
        </Typography>
        <IconButton color="inherit"><Icon className="fa fa-edit" /></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Title;