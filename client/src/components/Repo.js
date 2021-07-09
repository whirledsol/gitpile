import React, { useState, useEffect } from 'react';
import ProjectView from './RepoView';


const Repo = (props) => {
  const { data:pData } = props;

  const [status, setStatus] = useState({});


  useEffect(async _ => {

  }, []);

  const data = {
    ...pData,

  }
  return (
    <ProjectView
      data={data}
    />
  );
};

export default Repo;