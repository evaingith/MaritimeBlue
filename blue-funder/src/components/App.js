import React, { Component }  from "react";
import LandingPage from "./landing-page";
import LoginPage from "./login-page";
import '../css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/MaritimeBlue/">
              <LandingPage />
            </Route>
            <Route path="/MaritimeBlue/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
