import React,  { useState }  from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    padding: '30px',
    backgroundColor: '#006088',
  },
  submit: {
    backgroundColor: "#006088",
    color: "white",
    marginTop: '120px',
    marginBottom: '20px',
  },

  form: {
    backgroundColor: 'white',
    margin: 'auto',
    width: '80%',
    marginTop: '20px',
    padding: '50px',
    borderRadius: '15px',
  },
}));

const ConnectForm = (props) => {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);

  const CurrentView = () => {
    if (!submitted) {
      return(
        <div>
          <Typography variant="h6" style={{color: '#006088', fontWeight: 'bold', paddingBottom: '20px'}}>
            Tell us a bit about you and your project
          </Typography>
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Contact Name"
            fullWidth
            name="name"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Contact Email"
            fullWidth
            name="email"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Location"
            fullWidth
            name="location"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Project Description"
            fullWidth
            name="description"
           />
          <div style={{ marginLeft: '90%' }}>
            <Button
              onClick={() => setSubmitted(true)}
              variant="contained"
              className={classes.submit}
             >
              Submit
            </Button>
          </div>
        </div>
      )
    } else {
      return(
      <div>
        <Typography variant="h6" style={{color: '#006088', fontWeight: 'bold', paddingBottom: '20px'}}>
          You have successfully applied for this oppurtunity!
        </Typography>
        <Typography variant="caption" style={{fontSize: '11pt'}}>
          Expect to be contacted by the poster of this listing  shortly for further details...
        </Typography>
        <div style={{ marginLeft: '80%' }}>
            <Button
              onClick={() => props.viewDetail(props.detail)}
              variant="contained"
              className={classes.submit}
             >
              Return to listing
            </Button>
        </div>
      </div>
      )
    }
  }
  return(
    <div className={classes.content}>
        <IconButton onClick={() => props.viewDetail(props.detail)}>
          <ArrowBackIosIcon style={{color: 'white'}} />
        </IconButton>
        <div className={classes.form}>
          <CurrentView />
        </div>
    </div>
  )
}

export default ConnectForm;
