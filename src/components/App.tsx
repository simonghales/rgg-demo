import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { GlobalStyle } from '../ui/global';
import Main from "../screens/Main";

function App() {
  return (
      <>
          <GlobalStyle/>
          <Router>
              <Switch>
                  <Route path="/play">
                      <Main playOnly/>
                  </Route>
                  <Route path="/">
                      <Main/>
                  </Route>
              </Switch>
          </Router>
      </>
  );
}

export default App;
