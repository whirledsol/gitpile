import { Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Title from './components/Title';

import Message from './components/Message';
import Loading from 'whirled-react/components/core/flow/Loading';
import ProjectList from './components/ProjectList';
import Project from './components/Project';
import {requestConfig} from './helpers/data';

import {BrowserRouter,Switch,Route} from "react-router-dom";

const App = () => {

  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(async _ => {
    requestConfig({setData:setConfig, setMessage:setMessage});
  },[]);

  return (
    <>
      <Title>gitpile</Title>
      {message != null &&
        <Message {...message}/>
      }
      <Loading enable={config == null}>
        {config &&
          <BrowserRouter>
          <Switch>
            <Route path="/project/:id"><Project config={config}/></Route>
            <Route path="/"><ProjectList config={config}/></Route>
            </Switch>
          </BrowserRouter>
        }
      </Loading>
    </>
  );
}

export default App;
