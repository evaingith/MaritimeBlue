import React, { Component }  from "react";
import LandingPage from "./landing-page";
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="App">
        <LandingPage />
      </div>
    )
  }
}

export default App;
