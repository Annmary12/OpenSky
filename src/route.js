// react libraries
import * as React from 'react';

// third party packages
import { Route, Switch } from 'react-router-dom';

// components
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/open-sky" component={HomePage} />
  </Switch>
)

export default Routes;