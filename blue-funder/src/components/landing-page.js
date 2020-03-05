import React, { Component }  from "react";
import { Link } from "react-router-dom";
import '../css/landing-page.css';
import aphoto from '../img/ashley.png';
import cphoto from '../img/changyu.jpg';
import ephoto from '../img/eva.jpg';
import kphoto from '../img/keith.jpg';

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
          <img alt="blue-logo" src="https://maritimeblue.org/wp-content/uploads/2019/01/WAMarBlue_CLR_v3.1C.110717.png" />
          <nav>
              <li><a href="#overview">OVERVIEW</a></li>
              <li><a href="#features">WORK</a></li>
              <li><a href="#team">TEAM</a></li>
          </nav>
        </header>


        <section className="hero">
          <div className="background-image"></div>
          <h1>BLUE FUNDER PORTAL</h1>
          <h3>Connects Maritime entrepreneurs to a variety of investment resources</h3>
          <Link to="/MaritimeBlue/login"><a href="https://github.com/evaingith/MaritimeBlue" className="btn">Explore Blue Funder Portal</a></Link>
        </section>


        <a name="overview"></a>
        <section className="overview">
          <h3 className="title">Overview</h3>
          <p>Currently entrepreneurs in the Maritime industry are facing the problem of spending too much time searching across many different resources/avenues to find funding that supports “Blue” growth within the industry. Our <b>Blue Funder Portal</b> aims to provide one central location for <b>Maritime innovators</b> to find and search for a wide range of currently available <b>funding opportunities</b> in order to fund their projects.</p>
        </section>


        <a name="features"></a>
        <section className="features">
          <h3 className="title">How It Works</h3>
          <p>Innovators and entrepreneurs who are involved with the Maritime sector discover new ways to make the industry more "Blue" each day, encouraging values of sustainability and efficiency within their projects. Finding resources to promote these projects is a monumental task alone, but is critical to pushing the Maritime community towards more eco-friendly practices and ideas. Through this portal, innovators can be directly connected to a widely comprehensive and robust set of investment oppurtunities that match their goals in order to achieve the funding they need.</p>
          <hr></hr>
          <p>Currently this section is reserved for images and information about various features of our application, but we are still implementing those features! Check back later...</p>
        </section>


        <a name="team"></a>
        <section className="team">
          <h3 className="title">Our Team</h3>
          <div className="team-banner">
            <div className="team-card">
              <img alt="team member" src={ephoto} />
              <p className="team-name">Eva (Yuan) Yin</p>
              <p>Data Analyst, Front End Developer</p>
              <p>yin7@uw.edu</p>
            </div>
            <div className="team-card">
              <img alt="team member" src={cphoto} />
              <p className="team-name">Changyu Li</p>
              <p>Data Analyst, Front End Developer</p>
              <p>Changl28@uw.edu</p>
            </div>
            <div className="team-card">
              <img alt="team member" src={aphoto} />
              <p className="team-name">Ashley (Yufei) Zhou</p>
              <p>Data Analyst, UX Designer</p>
              <p>zhouy58@uw.edu</p>
            </div>
            <div className="team-card">
              <img alt="team member"  src={kphoto} />
              <p className="team-name">Keith Roberts</p>
              <p>Software Engineer</p>
              <p>keithrob@uw.edu</p>
            </div>
          </div>
        </section>

        <section className="sponsor">
          <h3 className="title">Our Sponsor</h3>
          <div className="sponsor-banner">
            <div>
              <img alt="sponsor logo" className="sponsor-img" src="https://maritimeblue.org/wp-content/uploads/2019/01/WAMarBlue_CLR_v3.1C.110717.png" />
            </div>
            <div>
              <p><a href="https://maritimeblue.org/">Department of Commerce - Washington State & The Maritime Blue Project</a></p>
            </div>
          </div>
        </section>

        <footer>
          <p><a href="https://ischool.uw.edu/">This project is a part of the Capstone Project course at the University of Washington Information School</a></p>
        </footer>

      </div>
    )
  }
}

export default LandingPage;
