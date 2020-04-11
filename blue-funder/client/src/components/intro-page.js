import React from "react";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '80px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '70px',
      paddingTop: '30px',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #e0e0e0',
    width: '500px',
    height: '600px',
    padding: theme.spacing(2, 4, 3),
  },
  stats: {
    paddingTop: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    marginBottom: '30px',
  },
  statBox: {
    width: '350px',
    height: '330px',
    border: '2px solid #e0e0e0',
    borderTop: '3px solid #006088',
    borderRadius: '10px',
    boxShadow: '0px 3px #e0e0e0',
    textAlign: 'center',
    color: '#006088',
    paddingTop: '10px',
  },
  info: {
    marginTop: '20px',
  }
}));

const IntroPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div className={classes.content}>
      <div className={classes.heading}>
        <h1 style={{marginBottom: '30px', color: "#043464"}}>Welcome to the Blue Funder Portal</h1>
        <Typography variant="body1">
          This portal is equipped to match you with the monetary resources you need to get your
          idea up and running or to take your financial plan to the next level. The concept is simple,
          you can access our funding oppurtunity database through this portal which contains an extensive list of investment
          oppurtunities specifically for the Maritime industry. You can then find a listing that matches the
          criteria of your business needs, and then have the ability to directly connect with the investors
          who provide our listings in attain funding.
        </Typography>
      </div>
      <div className={classes.info}>
        <Typography variant="body1" style={{marginBottom: '10px'}}>
          To help you better understand the data presented to you in this portal and how to interact and
          navigate throughout the application, we have included some viewable information resources that detail three
          important aspects of our application (click on any card to view the information with more detail):
        </Typography>
      </div>
      <hr style={{width: '50%', margin: 'auto', marginBottom: '20px', marginTop: '60px', backgroundColor: '#74BBFB'}}/>
      <div className={classes.stats}>
        <div className={classes.statRow}>
          <div className={classes.statBox} onClick={handleOpen2} >
            <Typography style={{fontWeight: 'bold', fontSize: '14pt'}} variant="caption">
              Terms Overview
            </Typography>
            <div style={{ height: '130px', padding: '20px'}}>
              <Typography variant="body2" component="span">
                Deciding on what listings and oppurtunities are right for you and your needs is by
                no means a straightforward process. This is especially true for innovators and entreprenuers
                who may be part of a start-up and have less domain knowledge about finance and investments.
                We have compiled a breakdown of capital types and their descriptions along with various other
                terms used throughout the portal so that you can get a better idea of which oppurtunities best
                serve your purpose.
              </Typography>
              <Typography variant="body2" style={{marginTop: '10px'}}>
                Learn More
              </Typography>
            </div>
          </div>
          <div onClick={handleOpen1} className={classes.statBox}>
            <Typography style={{fontWeight: 'bold', fontSize: '14pt'}} variant="caption">
              Navigating the Portal
            </Typography>
            <div style={{ height: '130px', padding: '20px'}}>
              <Typography variant="body2" component="span">
                Though the application may seem straightforward, it is not always easy to make your way through a monumental
                amount of funding data by scrolling through hundreds of entries. Rather, you can make use of some
                of the functionality we have provided to search through the data for you. We provide a number of different controls
                and inputs to sort, filter, and view the massive amounts of funding data accordingly.
              </Typography>
              <Typography variant="body2" style={{marginTop: '10px'}}>
                Learn More
              </Typography>
            </div>
          </div>
          <div onClick={handleOpen} className={classes.statBox}>
            <Typography style={{fontWeight: 'bold', fontSize: '14pt'}} variant="caption">
              Applying for Funding
            </Typography>
            <div style={{ height: '130px', padding: '20px'}}>
              <Typography variant="body2" component="span">
                Applying for funding from an investor is a long process and has many intricacies.
                We have attempted to make this process simpler and easier by streamlining the process
                of discovering oppurtunities that are actually feasible for your use case.
                Making meaningful contact and telling your story is a primary goal that we hope attain
                through the functionality we have provided.
                But how exactly does the process of contacting investors work through our portal?
              </Typography>
              <Typography variant="body2" style={{marginTop: '10px'}}>
                Learn More
              </Typography>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" style={{marginBottom: '10px'}}>Applying for Funding</h2>
              <p id="transition-modal-description">
                Once you find a listing that seems to match your particular use case, you can directly apply/contact
                the investor or entity that included the listing in the portal. To do so, when you are viewing a particular
                entries detail page, you will find a button labeled 'Apply' in the top right corner. When clicked, you are
                prsented with an application form that will include a number of different fields relating to your personal
                information and business such as your name, project description, current status, and any accomanying links.
                Once your application is submitted, it will then be sent directly to the person who had listed the oppurtunity.
              </p>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open1}
          onClose={handleClose1}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          >
          <Fade in={open1}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" style={{marginBottom: '10px'}}>Navigating the Portal</h2>
              <p id="transition-modal-description">
                There are three primary view associated with the application:
              </p>
              <h4>Listings View (Portal)</h4>
              <p id="transition-modal-description">
                This page is the primary piece of the application in that it provides you with the data. There are a number of
                different filters and sorts that can be applied to the data displayed on this page to narrow down the results.
                The user is also provided with a text based search to look for entries that match a provided keyword or phrase.
              </p>
              <h4>Listing Detail View (Entry)</h4>
              <p id="transition-modal-description">
                When viewing listings on the listing view, you can click on any entry to be brought to that particular oppurtunities
                detail page. The detail page provides a more granular and robust profile of the oppurtunity listed in the database.
                This page will give you further information and details about the particular funding oppurtunity and the investor who
                provided the listing. The users can apply for an oppurtunity in this page.
              </p>
              <h4>Insights View (Insights)</h4>
              <p id="transition-modal-description">
                The insights tab in the navigation bar at the top of the screen will bring you to a insights page that gives a 
                high level overview of the current state of the data within the portal. Information such as the number of current
                active listings and the total volume of capital offered in the portal are presented here. This page also provides
                some basic visualizations that describe the distribution of capital and listings in the portal.
              </p>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          >
          <Fade in={open2}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" style={{marginBottom: '10px'}}>Terms Overview</h2>
              <h4>Series A Funding</h4>
              <p id="transition-modal-description">
                Once a startup makes it through the seed stage and they have some kind of traction
              </p>
              <h4>Series B Funding</h4>
              <p id="transition-modal-description">
                A startup that reaches the point where they’re ready to raise a Series B round has already found their product/market fit and needs help expanding.
              </p>
              <h4>Series C Funding</h4>
              <p id="transition-modal-description">
                Companies that make it to the Series C stage of funding are doing very well and are ready to expand to new markets, acquire other businesses, or develop new products.
              </p>
              <h4>Series D Funding</h4>
              <p id="transition-modal-description">
                Series D rounds are typically funded by venture capital firms. The amount raised and valuations vary widely, especially because so few startups reach this stage.
              </p>
              <h4>Crowdfunding</h4>
              <p id="transition-modal-description">
                Includes banks, angel investors, venture capital firms, etc. Crowdfunding is a method of raising capital through the collective effort of friends, family, customers, and individual investors.
              </p>
              <h4>Loans</h4>
              <p id="transition-modal-description">
                A small business startup loan is any type of loan that helps businesses with little to no business history. It’s one of many financing options for founders who are looking to either get started or improve their young companies.
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default IntroPage;
