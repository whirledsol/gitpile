import React from 'react';
import { Container, Box } from '@material-ui/core';
import Repo from './Repo';
import { useParams } from "react-router-dom";

const Project = (props) => {
  const { config } = props;
  const { id } = useParams();
  return (
    <Box my={4}>
      <Container >
          {Object.entries(config.projects[id]).map(([key, data]) => (
            <Repo key={key} data={{...data,key:key}}  />))
          }
      </Container>
    </Box>
  );
};

export default Project;