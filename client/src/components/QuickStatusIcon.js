import React from 'react';
import { Box,Icon,Typography } from '@material-ui/core';

const QuickStatusIcon = (props) => {

	const {
		repoKey,
		path,
		isGit,
		branch,
		uncommitted,
		behind,
		ahead,
		last_commit,
		last_message,
		last_author,
		last_date,
		message
	} = props;

	const iconColor = 'success';
	const iconClass = 'fas fa-check-circle';
	
	//TODO

	return (<Box><Icon className={iconClass} color={iconColor} fontSize="large"></Icon></Box>)
};

export default QuickStatusIcon;