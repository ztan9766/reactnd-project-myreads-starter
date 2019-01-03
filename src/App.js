import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import routers from "./components/router";

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            {routers.map(({ path, exact, component: Component }) => (
              <Route
                key={path}
                path={path}
                exact={exact || false}
                render={props => {
                  return <Component {...props} />;
                }}
              />
            ))}
          </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
