import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
}));

const InsightPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Insights</h1>
    </div>
  )
}

export default InsightPage;
