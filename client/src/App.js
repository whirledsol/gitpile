import { Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Title from './components/Title';

import MessageDialog from './components/MessageDialog';
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
  const {PUBLIC_URL} = process.env;

  //effects
  useEffect(async _ => {
    setConfig(await requestConfig({ setMessage: setMessage }));
  }, []);

  //computed
  const contextValue = {
    setMessage: setMessage,
    config: config
  };

  const backgroundStyle = {
    height:'100%',
    minHeight:'95vh',
    backgroundImage: `url(${PUBLIC_URL}/images/hero-glow.svg)`,
    backgroundRepeat: 'repeat',
    backgroundSize: '100%',
    backgroundAttachment: 'fixed',
    width: '100%'
  };

  //render
  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Title>gitpile</Title>
        <div style={backgroundStyle}>
        <MessageDialog {...message} open={message != null}/>
        <Loading enable={config == null}>
          <Switch>
            <Route path="/project/:projectKey"><Project /></Route>
            <Route path="/"><ProjectList /></Route>
          </Switch>
        </Loading>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
