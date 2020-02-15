import React, { Component }  from "react";
import '../css/landing-page.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>

        <header>
          <img src="https://maritimeblue.org/wp-content/uploads/2019/01/WAMarBlue_CLR_v3.1C.110717.png" />
          <nav>
              <li><a href="#">OVERVIEW</a></li>
              <li><a href="#">WORK</a></li>
              <li><a href="#">TEAM</a></li>
          </nav>
        </header>


        <section className="hero">
          <div className="background-image"></div>
          <h1>BLUE FUNDER PORTAL</h1>
          <h3>Connects Maritime entrepreneurs to a variety of investment resources</h3>
          <a href="#" className="btn">Explore Blue Funder Portal</a>
        </section>


        <section className="overview">
          <h3 className="title">Overview</h3>
          <p>Currently entrepreneurs in the Maritime industry are facing the problem of spending too much time searching across many different resources/avenues to find funding that supports “Blue” growth within the industry. Our Blue Funder Portal aims to provide one central location for Maritime innovators to find and search for a wide range of currently available funding opportunities in order to fund their projects.</p>
        </section>


        <section className="features">
          <h3 className="title">How It Works</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <hr></hr>
        </section>


        <section className="team">
          <h3 className="title">Our Team</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <hr></hr>
        </section>

        <section className="sponsor">
          <h3 className="title">Our Sponsor</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
          <hr></hr>
        </section>

        <footer>
          <p>This project is a part of the Capstone Project course at the University of Washington Information School</p>
        </footer>

      </div>
    )
  }
}

export default LandingPage;
