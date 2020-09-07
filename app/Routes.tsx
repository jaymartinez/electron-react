/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';

const LazyLobbyPage = React.lazy(() =>
  import(/* webpackChunkName: "LobbyPage" */ './components/LobbyPage')
);

const LobbyPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyLobbyPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.LOBBY} component={LobbyPage} />
        <Route path={routes.REGISTER} component={RegisterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
