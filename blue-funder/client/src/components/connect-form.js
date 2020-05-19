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
  const [errored, setErrored] = useState(false);

  const FormList = () => {
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [email, setEmail] = useState('');
      const [locate, setLocate] = useState('');
      const handleNameOnChange = (event) => {setName(event.target.value)}
      const handleDescriptionOnChange = (event) => {setDescription(event.target.value)}
      const handleEmailOnChange = (event) => {setEmail(event.target.value)}
      const handleLocateOnChange = (event) => {setLocate(event.target.value)}
      const submitForm = () => {
      const ADD_CONNECT_REQUEST = `
        mutation AddConnetRequest($name: String!, $email: String!, $description: String!, $locate: String!, $contact: String!, $title: String!) {
          createConnectRequest(data: { applicantName: $name, applicantEmail: $email, applicantLocation: $locate, description: $description, investorContact: $contact, opportunityName: $title }) {
            id
          }
        }`;
      fetch('/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: ADD_CONNECT_REQUEST, variables: {name: name, email: email, description: description, locate: locate, contact: props.contact, title: props.title }})
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
            Tell us a bit about you and your project
          </Typography>
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Contact Name"
            fullWidth
            value={name}
            onChange={(e) => handleNameOnChange(e)}
            name="name"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Contact Email"
            fullWidth
            value={email}
            onChange={(e) => handleEmailOnChange(e)}
            name="email"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Location"
            fullWidth
            value={locate}
            onChange={(e) => handleLocateOnChange(e)}
            name="location"
           />
          <TextField
            margin="normal"
            InputLabelProps={{ required: false }}
            required
            label="Project Description"
            fullWidth
            value={description}
            onChange={(e) => handleDescriptionOnChange(e)}
            name="description"
           />
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
      return (
        <FormList key="same"/>
      )
    } else if (!errored) {
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
    } else {
      return(
      <div>
        <Typography variant="h6" style={{color: '#006088', fontWeight: 'bold', paddingBottom: '20px'}}>
          Error
        </Typography>
        <Typography variant="caption" style={{fontSize: '11pt'}}>
          We could not process your request at this time, please try again later...
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
