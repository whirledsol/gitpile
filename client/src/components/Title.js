import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Icon } from '@material-ui/core';

const Title = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Icon className="fa fa-bars" />
        </IconButton>
        <Typography variant="h6" >
          gitpile
        </Typography>
        <IconButton color="inherit"><Icon className="fa fa-edit" /></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Title;