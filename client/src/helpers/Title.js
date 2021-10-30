import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Icon } from '@material-ui/core';
import { Link } from "react-router-dom";

const HomeButton = _ => {
  const {PUBLIC_URL} = process.env;

  return (<Link to="/" style={{display:'flex', alignItems:'center', color:'black', textDecoration:'none'}}>
    <img src={`${PUBLIC_URL}/images/logo.png`} style={{ width: '2.5rem', marginRight:'0.5rem' }} />
        <Typography variant="h5" >
          gitpile
        </Typography>
  </Link>);
};

const Title = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <HomeButton />
        <Link to="/edit">
          <IconButton color="inherit"><Icon className="fas fa-edit" /></IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Title;