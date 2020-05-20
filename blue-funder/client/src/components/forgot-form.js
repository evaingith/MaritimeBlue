import React,  { useState, useEffect }  from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Link as Linker } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  // *
  root: {
    height: '100vh',
  },
  // Logo piece
  image: {
    backgroundImage: 'url(https://maritimeblue.org/wp-content/uploads/2019/01/WAMarBlue_CLR_v3.1C.110717.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: '350px 230px',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundSize: '200px 140px',
    },
  },
  // Login piece
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#006088',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(6, 6),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(18, 8),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(18, 18),
    },
  },
  // Input form
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  // Submit button
  submit: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: "#006088",
    color: "white",
    borderRadius: 16,
    width: '40%',
  },
  // Contact text
  extra: {
    marginTop: "50px",
    color: "white",
    fontWeight: "bold",
  },
  // Login heading
  heading: {
    color: "#006088",
    fontWeight: "bold",
    margin: theme.spacing(1, 0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(4, 0, 2),
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
  },
  // Login card
  card: {
    borderRadius: 16,
    textAlign: "center",
  },
  // Background
  backdrop: {
    backgroundColor: "#006088",
  },
  // Logo on smaller screens
  logo: {
    backgroundImage: 'url(https://maritimeblue.org/wp-content/uploads/2019/01/WAMarBlue_CLR_v3.1C.110717.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '150px 100px',
    backgroundPosition: 'cover',
    width: '150px',
    height: '100px',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
}));

const ForgotForm = () => {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [errored, setErrored] = useState(false);

  const FormList = () => {
    const [email, setEmail] = useState('');
    const handleEmailOnChange = (event) => {setEmail(event.target.value)}
    const submitForgotForm = () => {
      const ADD_FORGOT_REQUEST = `
        mutation AddForgottenPasswordRequest($email: String!) {
          createForgottenPasswordRequest(data: { email: $email}) {
            id
          }
        }`;
      fetch('/admin/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: ADD_FORGOT_REQUEST, variables: {email: email}})
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
              <CardContent>
                <div className={classes.logo}>
                </div>
              <form className={classes.form} noValidate>
                <Typography className={classes.heading} align="left" variant="h6">
                  FORGOTTEN PASSWORD
                </Typography>
                  <TextField
                    margin="normal"
                    InputLabelProps={{ required: false }}
                    required
                    label="Contact Email"
                    fullWidth
                    name="contactEmail"
                    id="contactEmail"
                    value={email}
                    onChange={(e) => handleEmailOnChange(e)}
                  />
                    <Button
                      variant="contained"
                      className={classes.submit}
                      onClick={() => {submitForgotForm()}}
                    >
                      Submit
                    </Button>
                </form>
              </CardContent>
      )
  }

  const CurrentView = () => {
    if (!submitted) {
      return (
        <FormList key="same"/>
      )
    } else if (!errored) {
      return(
              <CardContent>
                <div className={classes.logo}>
                </div>
                <Typography className={classes.heading} align="left" variant="h6">
                  THANK YOU
                </Typography>
                <Typography style={{marginBottom: '120px', display: 'block'}}align="left" variant="body">
                  Expect to be emailed shortly with instructions on how to reset your password...
                </Typography>
              </CardContent>
      )
    } else {
      return(
              <CardContent>
                <div className={classes.logo}>
                </div>
                <Typography className={classes.heading} align="left" variant="h6">
                  ERROR
                </Typography>
                <Typography style={{marginBottom: '120px', display: 'block'}}align="left" variant="body">
                  We were unable to process your request, please try again later...
                </Typography>
              </CardContent>
      )
    }
  }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={5} className={classes.image} />
        <Grid item xs={12} sm={8} md={7} className={classes.backdrop} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Card className={classes.card}>
              <CurrentView />
            </Card>
            <Link className={classes.extra} variant="body2" color="textSecondary" align="center">
              <Linker to="/MaritimeBlue/login">
              {"Return to Login"}
              </Linker>
            </Link>
          </div>
        </Grid>
      </Grid>
    )
}

export default ForgotForm;
