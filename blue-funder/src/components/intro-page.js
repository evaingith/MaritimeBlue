import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
}));

const IntroPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Introduction</h1>
    </div>
  )
}

export default IntroPage;
