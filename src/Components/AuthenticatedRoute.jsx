import React from "react";
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        sessionStorage.getItem('UserData') ?
          <Component {...props} /> :
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
      }
    />
  )
}

export default AuthenticatedRoute