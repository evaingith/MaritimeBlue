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

const ListingForm = (props) => {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);

  const CurrentView = () => {
    if (!submitted) {
      return(
        <div>
          <Typography variant="h6" style={{color: '#006088', fontWeight: 'bold', paddingBottom: '20px'}}>
            Request a Listing: Please Enter Your Information
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
            label="Estimated size of investment"
            fullWidth
            name="investmentSize"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Estimated term/length of investment"
            fullWidth
            name="investmentTerm"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Capital Type (e.g. Grant, Loan, etc)"
            fullWidth
            name="capitalType"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Geographic Focus"
            fullWidth
            name="geographicFocus"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Industry Focus"
            fullWidth
            name="industryFocus"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="End Date of Opportunity"
            fullWidth
            name="endDate"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Oppurtunity Description"
            fullWidth
            name="description"
           />
          <Typography variant="caption" style={{fontSize: '12pt', marginTop: '25px', display: 'block'}}>
          Note: Listings must first be manually approved before they are added and appear in the portal listings
          </Typography>
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
          Thank you for providing your invesment opportunity!!
        </Typography>
        <Typography variant="caption" style={{fontSize: '11pt'}}>
          We will reach out to you if your listing is approved and added to the portal...
        </Typography>
        <div style={{ marginLeft: '80%' }}>
            <Button
              onClick={() => props.setView('listing')}
              variant="contained"
              className={classes.submit}
             >
              Return to portal
            </Button>
        </div>
      </div>
      )
    }
  }
  return(
    <div className={classes.content}>
        <IconButton onClick={() => props.setView('listing')}>
          <ArrowBackIosIcon style={{color: 'white'}} />
        </IconButton>
        <div className={classes.form}>
          <CurrentView />
        </div>
    </div>
  )
}

export default ListingForm;
