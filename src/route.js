// react libraries
import * as React from 'react';

// third party packages
import { Route, Switch } from 'react-router-dom';

// components
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import AuthenticatedRoute from './components/AuthRoute';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <AuthenticatedRoute path="/" component={HomePage} />
  </Switch>
)

export default Routes;