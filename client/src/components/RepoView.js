import React from 'react';
import { Card, Box, Typography, Grid} from '@material-ui/core';
import QuickStatusIcon from './QuickStatusIcon';

const RepoView = (props) => {
	const {
		data,
		onUpdate,
		onPull,
		onCommit
	} = props;

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
		last_date
	} = data;

	console.log('data',data);


	const TitleBox = (<>
		<Typography variant="h5">{key}</Typography>
		<Typography variant="subtitle1" color='secondary'>{branch}</Typography>
	</>);
	const QuickStatusBox = (<QuickStatusIcon {...data}/>);
	const LatestBox = (<></>);
	const StatusBox = (<></>);
	const ActionBox = (<></>);

	return (
		<Card elevation={24}>
			<Grid container>
				<Grid container item md={8} lg={10}>
					<Grid item md={6}>{TitleBox}</Grid>
					<Grid item md={4}>{QuickStatusBox}</Grid>
					<Grid item md={6}>{LatestBox}</Grid>
					<Grid item md={4}>{StatusBox}</Grid>
				</Grid>
				<Grid item md={4} lg={2}>{ActionBox}</Grid>
			</Grid>

		</Card>
	);
};

export default RepoView;