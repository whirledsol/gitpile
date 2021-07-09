import React from 'react';
import { Container, Box, Paper, Grid, Typography,Icon } from '@material-ui/core';
import { faces, colorStatusClass } from '../helpers/status';

const Message = (props) => {
  const { severity, message, data } = props;

  const faceClass = (severity in faces) ? faces[severity] : faces[0];
  const colorClass = (severity in colorStatusClass) ? colorStatusClass[severity] : colorStatusClass[0];
  return (
    <Box my={4}>
    <Container >
      <Paper>
        <Grid container spacing={3} display="flex" direction="row" justify="space-evenly" alignItems="center">
          <Grid item md={3} style={{textAlign:'center'}}>
      
            <Icon color={colorClass} className={`fas ${faceClass}`} style={{fontSize:75}}></Icon>
           
          </Grid>
          <Grid item md={9}>
            <Typography variant="h4" color={colorClass}>{message}</Typography>
            <p>{data}</p>
          </Grid>
        </Grid>
      </Paper>
      </Container>
      </Box>
  );
};

export default Message;