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
  const [errored, setErrored] = useState(false);

  const FormList = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('');
    const [term, setTerm] = useState('');
    const [cType, setCType] = useState('');
    const [gFocus, setGFocus] = useState('');
    const [iFocus, setIFocus] = useState('');
    const [endDate, setEndDate] = useState('');
    const [desc, setDesc] = useState('');
    const handleNameOnChange = (event) => {setName(event.target.value)}
    const handleEmailOnChange = (event) => {setEmail(event.target.value)}
    const handleTitleOnChange = (event) => {setTitle(event.target.value)}
    const handleDescOnChange = (event) => {setDesc(event.target.value)}
    const handleSizeOnChange = (event) => {setSize(event.target.value)}
    const handleTermOnChange = (event) => {setTerm(event.target.value)}
    const handleCTypeOnChange = (event) => {setCType(event.target.value)}
    const handleGFocusOnChange = (event) => {setGFocus(event.target.value)}
    const handleIFocusOnChange = (event) => {setIFocus(event.target.value)}
    const handleEndDateOnChange = (event) => {setEndDate(event.target.value)}
    const submitForm = () => {
      const ADD_LISTING_REQUEST = `
      mutation AddListingRequest($name: String!, $email: String!, $title: String!, $desc: String!, $size: String!, $term: String!, $cType: String!, $gFocus: String!, $iFocus: String!, $endDate: DateTime!, $postDate: DateTime!) {
        createListingRequest(data: { investorName: $name, contact: $email, investmentSize: $size, investmentTerm: $term, capitalType: $cType, geographicFocus: $gFocus, industryFocus: $iFocus, opportunityName: $title, postedDate: $postDate, endDate: $endDate, description: $desc }) {
          id
        }
      }`;
      fetch('/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: ADD_LISTING_REQUEST, variables: {name: name, email: email, title: title, desc: desc, size: size, term: term, cType: cType, gFocus: gFocus, iFocus: iFocus, endDate: new Date(endDate).toISOString(), postDate: new Date().toISOString() }})
        }).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => setSubmitted(true))
        .catch(error => {setErrored(true)});
      }

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
            value={name}
            onChange={(e) => handleNameOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Contact Email"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => handleEmailOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Title of Opportunity"
            fullWidth
            name="title"
            value={title}
            onChange={(e) => handleTitleOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Estimated size of investment"
            fullWidth
            name="investmentSize"
            value={size}
            onChange={(e) => handleSizeOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Estimated term/length of investment"
            fullWidth
            name="investmentTerm"
            value={term}
            onChange={(e) => handleTermOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Capital Type (e.g. Grant, Loan, etc)"
            fullWidth
            name="capitalType"
            value={cType}
            onChange={(e) => handleCTypeOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Geographic Focus"
            fullWidth
            name="geographicFocus"
            value={gFocus}
            onChange={(e) => handleGFocusOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Industry Focus"
            fullWidth
            name="industryFocus"
            value={iFocus}
            onChange={(e) => handleIFocusOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            type="datetime-local"
            floatingLabelText="End Date of Opportunity"
            floatingLabelFixed={true}
            fullWidth
            name="endDate"
            value={endDate}
            onChange={(e) => handleEndDateOnChange(e)}
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Oppurtunity Description"
            fullWidth
            name="description"
            value={desc}
            onChange={(e) => handleDescOnChange(e)}
           />
          <Typography variant="caption" style={{fontSize: '12pt', marginTop: '25px', display: 'block'}}>
          Note: Listings must first be manually approved before they are added and appear in the portal listings
          </Typography>
          <div style={{ marginLeft: '90%' }}>
            <Button
              onClick={() => submitForm()}
              variant="contained"
              className={classes.submit}
             >
              Submit
            </Button>
          </div>
        </div>
      )
  }

  const CurrentView = () => {
    if (!submitted) {
      return(
      <FormList key="same" />
      )
    } else if (!errored) {
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
    } else {
      return(
      <div>
        <Typography variant="h6" style={{color: '#006088', fontWeight: 'bold', paddingBottom: '20px'}}>
          Error
        </Typography>
        <Typography variant="caption" style={{fontSize: '11pt'}}>
          We were unable to process your request at this time. Please try again later...
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
