import React from 'react';
import {Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
	  backgroundColor: props => props.color[800],
	  '&:hover': {
		backgroundColor: props => props.color[900],
	  },
	},
  });

const ColorButton = (p)=>{
	const classes = useStyles(p);
	return <Button {...p} color='inherit' className={classes.root}></Button>;
}

export default ColorButton;