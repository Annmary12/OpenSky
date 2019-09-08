// react libraries
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

/**
 * Redirect users to the auth page if they are unauthenticated
 * and show a toast asking them to login to continue
 *
 * @param {Component} Component
 *
 * @returns {Function}
 */
const handleRender = Component => (props) => {
  const isAuthenticated =  Boolean(localStorage.getItem('isAuthenticated'));

  if (!isAuthenticated) {

    return (
      <React.Fragment>
        <Redirect to="/login" />
      </React.Fragment>
    );
  }

  return <Component { ...props } />;
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => ((
  <Route { ...rest } render={handleRender(Component)} />
));

export default AuthenticatedRoute;
