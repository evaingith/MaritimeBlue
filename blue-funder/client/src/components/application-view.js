import React, { useState } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import IntroPage from "./intro-page";
import ListingPage from "./listing-page";
import InsightPage from "./insights-page";
import DetailPage from "./detail-page";
import ConnectForm from "./connect-form";
import ListingForm from "./listing-form";

const useStyles = makeStyles(theme => ({
  footerText: {
    width: '400px',
    color: 'white',
    paddingTop: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14pt',
      width: '300px',
    },
  },

  footer: {
    height: '250px',
    width: '100%',
    backgroundColor: '#006088',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },

  tool: {
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#006088",
  },

  tab: {
    marginLeft: "30px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },

  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const ApplicationView = () => {
  const classes = useStyles();
  const [detail, setDetail] = useState(0);
  const [view, setView] = useState('intro');
  const viewDetail = (id) => {
    setView('detail');
    setDetail(id);
  }
  const CurrentView = () => {
    if (view === 'intro') {
      return <IntroPage setView={setView} viewDetail={viewDetail} />;
    } else if (view === 'listing') {
      return <ListingPage viewDetail={viewDetail} />;
    } else if (view === 'insight') {
      return <InsightPage viewDetail={viewDetail} />;
    } else if (view === 'detail') {
      return <DetailPage setView={setView} detail={detail} />;
    } else if (view === 'connect') {
      return <ConnectForm viewDetail={viewDetail} detail={detail} />;
    } else if (view === 'addlisting') {
      return <ListingForm setView={setView}/>;
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AppBar position="static" style={{ padding: 0 }}>
        <Toolbar className={classes.tool}>
          <IconButton edge="start" onClick={() => setView('intro')}className={classes.logo} color="inherit">
            <img alt="blue logo" src="https://merequipment.com/wp-content/uploads/WAMarBlue-e1576537274287.png" />
          </IconButton>
          <div>
            <Button onClick={() => setView('intro')} className={classes.tab} color="inherit">Introduction</Button>
            <Button onClick={() => setView('listing')} className={classes.tab} color="inherit">Opportunities</Button>
            <Button onClick={() => setView('insight')} className={classes.tab} color="inherit">Insights</Button>
          </div>
        </Toolbar>
      </AppBar>
      <CurrentView />
      <div className={classes.footer}>
        <Typography variant="h4" className={classes.footerText}>
          Want to add your funding information to the portal?
        </Typography>
        <Link variant="h5" onClick={() => {setView('addlisting'); window.scrollTo(0,0);}} className={classes.footerText}>
          CONTACT US
        </Link>
      </div>
    </Grid>
  )
}

export default ApplicationView;
