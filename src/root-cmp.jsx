import React from 'react'
import { Switch, Route } from 'react-router'

import routes from './routes'


import { AppFooter } from "./cmps/app-footer";
import { AppHeader } from "./cmps/app-header";

function RootCmp() {
  return (
    <section>

      <AppHeader />

      <main className="main-container">
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
      </main>

      <AppFooter />

    </section>
  );
}

export default RootCmp;
