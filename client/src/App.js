import { Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Title from './components/Title';

import Message from './components/Message';
import Loading from 'whirled-react/components/core/flow/Loading';
import ProjectList from './components/ProjectList';
import Project from './components/Project';
import { requestConfig } from './helpers/data';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppContext from './helpers/AppContext';


const App = () => {

  //state
  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState(null);


  //effects
  useEffect(async _ => {
    setConfig(await requestConfig({ setMessage: setMessage }));
  }, []);

  //computed
  const contextValue = {
    setMessage: setMessage,
    config: config
  };

  //render
  return (
    <>



      <AppContext.Provider value={contextValue}>
        <BrowserRouter>
          <Title>gitpile</Title>
          {message != null &&
            <Message {...message} />
          }
          <Loading enable={config == null}>
            <Switch>
              <Route path="/project/:projectKey"><Project /></Route>
              <Route path="/"><ProjectList /></Route>
            </Switch>
          </Loading>
        </BrowserRouter>
      </AppContext.Provider>


    </>
  );
}

export default App;
