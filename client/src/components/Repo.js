import React, { useState, useEffect, useContext } from 'react';
import RepoView from './RepoView';
import { requestStatus, requestLogs } from '../helpers/data';
import AppContext from '../helpers/AppContext';

const Repo = (props) => {

  //props
  const { data: rawData, global={} } = props;
  const { projectKey, repoKey } = rawData;
  const { setMessage } = useContext(AppContext);

  //state
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState({});

  //methods
  const requestStatusForRepo = async _ => requestStatus({
    params: { projectKey: projectKey, repoKey: repoKey },
    setMessage: setMessage
  });

  const requestLogsForRepo = async _ => requestLogs({
    params: { projectKey: projectKey, repoKey: repoKey },
    setMessage: setMessage
  });

  //effects
  useEffect(async _ => {
    const status = await requestStatusForRepo();
    setStatus(status);
    if(status.isGit ?? true){
      setLogs(await requestLogsForRepo());
    }
  }, []);

  //computed
  const data = {
    ...rawData,
    compareBranch: rawData.compareBranch ?? rawData.mainBranch ?? global.mainBranch ?? 'main',
    ...status,
    ...(logs.latest || {}),
    isGit:status.isGit ?? true,
    uncommitted: (status.files || []).length,
    branch:status.current
  };

  //render
  return (
    <RepoView
      data={data}
    />
  );

};

export default Repo;