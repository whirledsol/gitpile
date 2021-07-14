import React from 'react';
import { Container, Box, Paper, Grid, Typography, Icon, Dialog } from '@material-ui/core';
import { faces, severityColors } from '../helpers/severity';

const MessageDialog = (props) => {
  const { open, severity, message, data, handleClose } = props;

  const faceClass = (severity in faces) ? faces[severity] : faces[10];
  const colorClass = (severity in severityColors) ? severityColors[severity] : severityColors[10];
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box p={3} style={{textAlign:'center'}}>
        <Icon color={colorClass} className={`fas ${faceClass}`} style={{ fontSize: 75, marginBottom:'0.5rem' }}></Icon>
        <Typography variant="h4" color={colorClass}>{message}</Typography>
        <p>{data}</p>
      </Box>
    </Dialog>
  );
};

export default MessageDialog;