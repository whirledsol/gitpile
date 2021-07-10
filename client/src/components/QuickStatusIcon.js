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
		compare_uncommitted,
		compare_behind,
		compare_ahead
	} = data;

	if(!isGit){
		return [(<span class="fa-stack fa-2x">
					<i class="fas fa-ban fa-stack-2x"></i>
					<i class="fab fa-github fa-stack-1x fa-inverse"></i>
				</span>),
				`Not a git repo.`];
	}
	if(!tracking){
		return [<Icon className="fas fa-cloud" color='danger'></Icon>, `Not tracked remotely`];
	}
	if(behind > 0){
		return [<Icon className="fas fa-arrow-alt-circle-down" color='danger'></Icon>, `Behind ${current}`];
	}
	if(uncommitted+ahead > 0){
		return [<Icon className="fas fa-arrow-alt-circle-up" color='danger'></Icon>, `Ahead ${current}`];
	}
	if(compare_behind > 0){
		return [<Icon className="fas fa-arrow-alt-circle-down" color='warning'></Icon>, `Behind ${compareBranch}`];
	}
	if(compare_uncommitted+compare_ahead > 0){
		return [<Icon className="fas fa-arrow-alt-circle-up" color='warning'></Icon>, `Ahead ${compareBranch}`];
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