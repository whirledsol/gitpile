import React, { useState, useEffect, useContext } from 'react';
import RepoView from './RepoView';
import { requestIsGit, requestStatus, requestLogs, requestPull, requestCommit } from '../helpers/data';
import AppContext from '../helpers/AppContext';

const Repo = (props) => {

  //props
  const { data: rawData, global = {} } = props;
  const { projectKey, repoKey } = rawData;
  const { setMessage } = useContext(AppContext);

  //state
  const [isGit, setIsGit] = useState(false);
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState({});

  const baseRequestProps = {
    params: { projectKey: projectKey, repoKey: repoKey },
    setMessage: setMessage
  };

  //methods
  const onUpdate = async _ => {
    const isGit = await requestIsGit(baseRequestProps);
    setIsGit(isGit);
    if (isGit) {
      setStatus(await requestStatus(baseRequestProps));
      setLogs(await requestLogs(baseRequestProps));
    }
  };

  const onPull = async _ => {
    const res = await requestPull(baseRequestProps);
    if (res.severity !== 0) {
      setMessage(res);
    }
    else{
      await onUpdate();
    }
  };

  const onCommit = async (message) => {
    const params = { ...baseRequestProps.params, message: message };
    console.log('params,',params)
    const res = await requestCommit({ ...baseRequestProps, params: params });
    if (res.severity !== 0) {
      setMessage(res);
    }
    else{
      await onUpdate();
    }
  };

  //effects
  useEffect(async _ => {
    await onUpdate();
  }, []);

  //computed
  const data = {
    isGit:isGit,
    ...rawData,
    ...status,
    ...(logs.latest || {}),
    uncommitted: (status.files || []).length,
  };

  //render
  return (
    <RepoView
      data={data}
      onUpdate={onUpdate}
      onPull={onPull}
      onCommit={onCommit}
    />
  );

};

export default Repo;