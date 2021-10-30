import React,{useState, useEffect} from 'react';
import { Container, Box, Typography, Button, Icon, TextareaAutosize } from '@material-ui/core';
import AppContext from '../util/AppContext';

const EditConfig = () => {
  const status = 'Under Construction. Please edit manually.';
  const [json,setJson] = useState(JSON.stringify({"Status":status}));

  useEffect(_=>{
	//TODO: get json
  },[]);

  const onSave = _=> {
	alert(status);
  };

  return (
    <Box py={4}>
      <Container >
		  <Typography variant='h4'>Edit Configuration</Typography>
          <Box py={4}><TextareaAutosize  onChange={e=>{setJson(e.target.value)}} style={{width:'100%'}}>{json}</TextareaAutosize ></Box>
		  <Button variant="contained" color="primary" startIcon={<Icon className='fas fa-save' />} onClick={onSave}>Save Configuration</Button>
      </Container>
    </Box>
  );
};

export default EditConfig;