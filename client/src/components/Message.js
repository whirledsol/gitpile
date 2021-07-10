import React from 'react';
import { Container, Box, Paper, Grid, Typography,Icon } from '@material-ui/core';
import { faces, feelsColorClass } from '../helpers/feels';

const Message = (props) => {
  const { feels, message, data } = props;

  const faceClass = (feels in faces) ? faces[feels] : faces[0];
  const colorClass = (feels in feelsColorClass) ? feelsColorClass[feels] : feelsColorClass[0];
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