import React, { useState } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import IntroPage from "./intro-page";
import ListingPage from "./listing-page";
import InsightPage from "./insights-page";

const useStyles = makeStyles(theme => ({
  root: {
  },

  tool: {
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#006088",
  },

  tab: {
    marginLeft: "30px",
  }
}));

const ApplicationView = () => {
  const classes = useStyles();
  const [view, setView] = useState('intro');
  const CurrentView = () => {
    if (view === 'intro') {
      return <IntroPage />;
    } else if (view === 'listing') {
      return <ListingPage />;
    } else if (view === 'insight') {
      return <InsightPage />;
    }
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <AppBar position="static" style={{ padding: 0 }}>
        <Toolbar className={classes.tool}>
          <IconButton edge="start" className={classes.logo} color="inherit">
            <img alt="blue logo" src="https://merequipment.com/wp-content/uploads/WAMarBlue-e1576537274287.png" />
          </IconButton>
          <div>
            <Button onClick={() => setView('intro')} className={classes.tab} color="inherit">Introduction</Button>
            <Button onClick={() => setView('listing')} className={classes.tab} color="inherit">Portal</Button>
            <Button onClick={() => setView('insight')} className={classes.tab} color="inherit">Insights</Button>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <CurrentView />
      </div>
    </Grid>
  )
}

export default ApplicationView;
