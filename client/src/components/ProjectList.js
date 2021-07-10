import React,{useContext} from 'react';
import { Container, Box, Grid,Card,Typography, Link  } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import AppContext from '../helpers/AppContext';
import AnimatedCard from './AnimatedCard';

const ProjectList = () => {

  const { config } = useContext(AppContext);

  return (
    <Box py={4}>
      <Container >
        <Grid container>
          {Object.keys(config.projects).map(key => {
            const numRepos = Object.keys(config.projects[key]).length;
            return (<Grid item md={4}>
              <Link component={RouterLink} to={`/project/${key}`} underline='none'> 
                <AnimatedCard>
                  <Box mb={8}><Typography variant="h4">{key}</Typography></Box>
                  <Box style={{textAlign:'right'}}><Typography variant="h3">{numRepos} repo{numRepos == 1 ? '' : 's'}</Typography></Box>
                </AnimatedCard>
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