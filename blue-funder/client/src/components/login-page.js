import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

/*
    LOGIN COMPONENT STYLES
*/
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

const LoginPage = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)

  }
  const classes = useStyles();

  const submitLogin = (event) => {
     fetch('/signin', {
       method: 'POST',
       body: JSON.stringify({'username': username, 'password': password }),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then(res => {
       if (res.status === 200) {
         history.push('/MaritimeBlue/portal');
       } else {
         const error = new Error(res.error);
         throw error;
       }
     })
     .catch(err => {
       alert('Invalid username or password, please try again...');
     });
  }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={5} className={classes.image} />
        <Grid item xs={12} sm={8} md={7} className={classes.backdrop} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.logo}>
                </div>
                <Typography className={classes.heading} align="left" variant="h6">
                  ALREADY A MEMBER?
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    InputLabelProps={{ required: false }}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username} onChange={handleUsernameChange}
                  />
                  <TextField
                    margin="normal"
                    InputLabelProps={{ required: false }}
                    required
                    label="Password"
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password} onChange={handlePasswordChange}
                  />
                  <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2" color="textSecondary">
                        {"Forgot Password?"}
                      </Link>
                    </Grid>
                  </Grid>
                    <Button
                      onClick={() => submitLogin()}
                      variant="contained"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                </form>
              </CardContent>
            </Card>
            <Typography className={classes.extra} variant="body2" color="textSecondary" align="center">
              {"Don't have an account yet?"}
            </Typography>
            <Link align="center" href="#" variant="body2" style={{color: "white", fontWeight: "bold"}}>
            <Linker to="/MaritimeBlue/access">
              {"Contact us"}
            </Linker>
            </Link>
          </div>
        </Grid>
      </Grid>
    )
}

export default LoginPage;
