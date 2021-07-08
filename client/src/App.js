import { Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Title from './components/Title';
import { dbSecure } from 'whirled-react/util/db';
import Message from './components/Message';
import Loading from 'whirled-react/components/core/flow/Loading';
import ProjectList from './components/ProjectList';

console.log(process.env);
const { REACT_APP_SERVER_ROOT } = process.env;

const App = () => {

  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(async _ => {
    try {
      const res = await dbSecure.get(`${REACT_APP_SERVER_ROOT}/git/info`);
      setConfig(res);
    }
    catch (ex) {
      console.error(ex);
      setMessage({ severity: 0, message: "Whoops. Your config.js file might not be setup." });
    }
  },[]);

  return (
    <>
      <Title>gitpile</Title>
      {message != null &&
        <Message {...message}/>
      }
      <Loading enable={config == null}>
        {config &&
          <ProjectList config={config}/>
        }
      </Loading>
    </>
  );
}

export default App;
