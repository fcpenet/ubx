import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNetwork from "./components/add-network.component";
import Network from "./components/network-details.component";
import NetworksList from "./components/networks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/networks"} className="navbar-brand">
            UBX
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/networks"} className="nav-link">
                Networks
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/networks"]} component={NetworksList} />
            <Route exact path="/networks/add" component={AddNetwork} />
            <Route path="/networks/:id" component={Network} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
