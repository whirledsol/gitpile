import React from 'react';
import { Box,Icon,Typography } from '@material-ui/core';

const computeQuickStatus = (data)=>{
	const {
		compareBranch,
		isGit,
		current,
		uncommitted,
		behind,
		ahead,
		tracking,
		compare_behind,
		compare_ahead
	} = data;

	if(!isGit){
		return [(<span className="fa-stack fa-2x">
					<i className="fas fa-ban fa-stack-2x"></i>
					<i className="fab fa-github fa-stack-1x fa-inverse"></i>
				</span>),
				`Not a git repo.`];
	}
	if(!tracking){
		return [<Icon className="fas fa-cloud" color='danger'></Icon>, `Not tracked remotely`];
	}
	if(behind > 0){
		return [<Icon className="fas fa-arrow-alt-circle-down" color='danger'></Icon>, `your ${current} is behind`];
	}
	if(uncommitted+ahead > 0){
		return [<Icon className="fas fa-arrow-alt-circle-up" color='danger'></Icon>, `your ${current} is ahead`];
	}
	if(compare_behind > 0){
		return [<Icon className="fas fa-arrow-alt-circle-down" color='warning'></Icon>, `your ${compareBranch} is behind `];
	}
	if(uncommitted+compare_ahead > 0){
		return [<Icon className="fas fa-arrow-alt-circle-up" color='warning'></Icon>, `your ${compareBranch} is ahead`];
	}
	return [<Icon className="fas fa-check-circle" color='success'></Icon>, `Synced`]
};


const QuickStatusIcon = (props) => {

	const [icon,status] = computeQuickStatus(props.data);

	return (<Box display="flex" alignItems='center'>
		<Box>{icon}</Box>
		<Box mx={3}>
			<Typography variant="overline">STATUS</Typography>
			<Typography variant="body1">{status}</Typography>
		</Box>
	</Box>)
};

export default QuickStatusIcon;