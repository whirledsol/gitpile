import React,{useContext} from 'react';
import { Container, Box, Grid,Card,Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import AppContext from '../helpers/AppContext';

const ProjectList = () => {

  const { config } = useContext(AppContext);

  return (
    <Box my={4}>
      <Container >
        <Grid container>
          {Object.keys(config.projects).map(key => {
            const numRepos = Object.keys(config.projects[key]).length;
            return (<Grid item md={4}>
              <Link to={`/project/${key}`}>
                <Card>
                  <Box mb={8}><Typography variant="h4">{key}</Typography></Box>
                  <Typography variant="h3">{numRepos} repo{numRepos == 1 ? '' : 's'}</Typography>
                </Card>
              </Link>
            </Grid>);
          })
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectList;