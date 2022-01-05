import { useState, useEffect } from 'react';
import Title from './helpers/Title';
import MessageDialog from './helpers/MessageDialog';
import Loading from 'whirled-react/components/core/flow/Loading';
import ProjectList from './components/ProjectList';
import Project from './components/Project';
import EditConfig from './components/EditConfig';
import { requestConfig } from './util/requests';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AppContext from './util/AppContext';


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
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="project/:projectKey" element={<Project />}/>
            <Route path="edit" element={<EditConfig />}/>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Loading>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
