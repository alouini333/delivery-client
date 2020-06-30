import React from "react";
import AppContainer from "./components/AppContainer";
import { Provider } from "react-redux";
import "./App.less";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import routes from "./routes";
import store from "./store";

var history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <AppContainer history={history}>
      <Router history={history}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </AppContainer>
  </Provider>
);

export default App;
