import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { App } from '../containers/App';
import { LoadableTop, LoadableNotFound } from './Routes';

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/" component={LoadableTop} />
      <Route component={LoadableNotFound} />
    </Switch>
  </App>
);
