import React,{useState} from 'react';
import { Card, Box, Typography, Grid, Divider, Icon, Button, Link,Popover,Tooltip } from '@material-ui/core';
import QuickStatusIcon from './QuickStatusIcon';
import moment from 'moment';

const RepoView = (props) => {

	//props
	const {
		data,
		onUpdate,
		onPull,
		onCommit
	} = props;

	const {
		repoKey,
		path,
		compareBranch,
		isGit,
		current,
		uncommitted,
		behind,
		ahead,
		files,
		diff,
		tracking,
		message,
		hash,
		author_name,
		author_email,
		date
	} = data;

	//state
	const [commitBtnEl, setCommitBtnEl] = useState(null);
	const [commitMessage, setCommitMessage] = useState('');

	//renders
	const TitleBox = _ => (<Grid container>
		<Grid item xs={6}><Link href={`file:${path}`}><Typography variant="h5">{repoKey}</Typography></Link></Grid>
		<Grid item xs={6} style={{ textAlign: 'right' }}>
			<Tooltip title={`Tracking: ${tracking || 'None'}`}><Typography variant="subtitle1" color='secondary'>{current}</Typography></Tooltip>
		</Grid>
	</Grid>);


	const QuickStatusBox = _ => (<QuickStatusIcon data={data} />);


	const LatestBox = _ => (<Box>
		<Grid container>
			<Grid item xs={6}><Typography variant="overline">Last Commit</Typography></Grid>
			<Grid item xs={6} style={{ textAlign: 'right' }}><Typography variant="subtitle2">{(hash ?? '').substring(0, 7)}</Typography></Grid>
		</Grid>

		<Box borderLeft={3} pl={1} my={1}>
			<Typography variant="body1">{message}</Typography>
		</Box>

		<Grid container>
			<Grid item xs={6}><Typography variant="subtitle2">{author_name}</Typography></Grid>
			<Grid item xs={6} style={{ textAlign: 'right' }}><Typography variant="subtitle2">{author_email}</Typography></Grid>
			<Grid item xs={6}><Typography variant="subtitle2">{moment(date).format('dddd MM/DD/YYYY hh:mm a')}</Typography></Grid>
			<Grid item xs={6} style={{ textAlign: 'right' }}><Typography variant="subtitle2">{moment(date).fromNow()}</Typography></Grid>
		</Grid>
	</Box>);


	const StatusBox = _ => (<Box display="flex">
		<Box style={{ textAlign: 'right' }}>
			<Typography variant="overline">Behind</Typography>
			<Typography variant="h5">{behind}</Typography>
		</Box>
		<Divider orientation="vertical" flexItem />
		<Box>
			<Typography variant="overline">Ahead</Typography>
			<Typography variant="h5">{ahead}</Typography>
		</Box>
		<Box display="flex" alignItems='end' mx={1} py={1}><Icon className="fas fa-plus" style={{ fontSize: 12 }}></Icon></Box>
		<Box>
			<Typography variant="overline">Uncomitted</Typography>
			<Box display="flex" alignItems='end'><Typography variant="h5">{uncommitted}</Typography>&nbsp;files</Box>
		</Box>
	</Box>);


	const ActionBox = _ => {
		const enableCommit = (files ?? []).length > 0 && diff;
		return (<>
			<Box my={1}><Button fullWidth onClick={onUpdate} variant="contained" color="default" startIcon={<Icon className='fas fa-sync' />}>Update</Button></Box>
			<Box my={1}><Button fullWidth onClick={onPull} variant="contained" color="secondary" startIcon={<Icon className='fas fa-arrow-alt-circle-down' />}>Pull &amp; Merge</Button></Box>
			<Box my={1}><Button fullWidth onClick={e => (enableCommit && setCommitBtnEl(e.currentTarget))} variant="contained" color="primary" startIcon={<Icon className='fas fa-arrow-alt-circle-up' />}>Commit &amp; Push</Button></Box>
		</>);
	};

	const CommitPopover = _ => {
		if(!diff) return null;
		const displayCount = 10;
		const byteLineFactor = 100;
		const diffList = diff.slice(0,displayCount);
		const overflowCount = diff.length - displayCount;
		return (
			<Popover
				id='commit-popover'
				open={Boolean(commitBtnEl)}
				anchorEl={commitBtnEl}
				onClose={_ => setCommitBtnEl(null)}
				anchorOrigin={{vertical: 'top',horizontal: 'left'}}
				transformOrigin={{vertical: 'top',horizontal: 'right'}}
			>
				<Box p={3}>
				<Typography variant='overline'>File Changes Uncommitted</Typography>
					<Box pl={2}>
					{diffList.map(item=>(
						<Typography variant="body1">{item.file} ({item.changes} {item.binary ?'kb': 'lines'})</Typography>
					))}
					{overflowCount > 0 && <Typography variant='caption'>+ {} file{overflowCount > 1 ? 's' : ''}</Typography>}
					</Box>
					<textarea value={commitMessage} onChange={e=>setCommitMessage(e.value)} style={{margin:'1rem 0', width:'100%'}} placeholder='Commit Message'></textarea>
					<Button fullWidth variant="contained" color="primary" startIcon={<Icon className='fas fa-arrow-alt-circle-up' />} onClick={_=>{onCommit(commitMessage)}}>Commit &amp; Push</Button>
				</Box>
			</Popover>
		);
	};
	return (
		<Card elevation={24}>
			<Grid container spacing={4}>
				<Grid item md={4} lg={5}>
					{TitleBox()}
					{isGit && hash && LatestBox()}
				</Grid>
				<Grid item md={4} lg={5} container direction="column" justifyContent="space-between">
					{QuickStatusBox()}
					{isGit && StatusBox()}
				</Grid>
				{isGit && <Grid item md={4} lg={2}>
					{ActionBox()}
					{CommitPopover()}
				</Grid>}
			</Grid>

		</Card>
	);
};

export default RepoView;