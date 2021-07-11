import React, { useState, useEffect, useContext } from 'react';
import RepoView from './RepoView';
import { requestStatus, requestLogs, requestPull, requestCommit } from '../helpers/data';
import AppContext from '../helpers/AppContext';

const Repo = (props) => {

  //props
  const { data: rawData, global = {} } = props;
  const { projectKey, repoKey } = rawData;
  const { setMessage } = useContext(AppContext);

  //state
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState({});

  const baseRequestProps = {
    params: { projectKey: projectKey, repoKey: repoKey },
    setMessage: setMessage
  };

  //methods
  const onUpdate = async _ => {
    const status = await requestStatus(baseRequestProps);
    setStatus(status);
    if (status.isGit ?? true) {
      setLogs(await requestLogs(baseRequestProps));
    }
  };

  const onPull = async _ => {
    const res = await requestPull(baseRequestProps);
    if (res.severity !== 0) {
      setMessage(res);
    }
  };

  const onCommit = async (message) => {
    const params = { ...baseRequestProps.params, message: message };
    const res = await requestCommit({ ...baseRequestProps, params: params });
    if (res.severity !== 0) {
      setMessage(res);
    }
  };

  //effects
  useEffect(async _ => {
    await onUpdate();
  }, []);

  //computed
  const data = {
    ...rawData,
    compareBranch: rawData.compareBranch ?? rawData.mainBranch ?? global.mainBranch ?? 'main',
    ...status,
    ...(logs.latest || {}),
    isGit: status.isGit ?? true,
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