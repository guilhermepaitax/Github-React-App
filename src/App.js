import ReactGA from 'react-ga';
import React from 'react';

import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyles />
    </>
  );
}

function initializeReactGA() {
  ReactGA.initialize('UA-156664944-1');
  ReactGA.pageview('/homepage');
}

export default App;
