import React,{useContext} from 'react';
import { Container, Box } from '@material-ui/core';
import Repo from './Repo';
import { useParams } from "react-router-dom";
import AppContext from '../util/AppContext';

const Project = () => {
  const { config } = useContext(AppContext);
  const { projectKey } = useParams();
  
  return (
    <Box py={4}>
      <Container >
          {Object.entries(config.projects[projectKey]).map(([repoKey, data]) => {
            data = {...data, repoKey:repoKey, projectKey: projectKey};
            return <Repo key={repoKey} data={data} global={config.global} />;
          })}
      </Container>
    </Box>
  );
};

export default Project;