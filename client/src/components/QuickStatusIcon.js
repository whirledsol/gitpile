import React from 'react';
import { Icon,Typography } from '@material-ui/core';

const QuickStatusIcon = (props) => {

	const {
		key,
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

	return (<Icon className={iconClass} color={iconColor} fontSize="large"></Icon>)
};

export default QuickStatusIcon;