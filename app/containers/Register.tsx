/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import routes from '../constants/routes.json';
import PokerService from '../services/pokerService';
import RegisterModel from '../models/RegisterModel';

const usernameField: React.RefObject<any> = React.createRef();
const firstNameField: React.RefObject<any> = React.createRef();
const lastNameField: React.RefObject<any> = React.createRef();
const emailField: React.RefObject<any> = React.createRef();
const passwordField: React.RefObject<any> = React.createRef();
const password2Field: React.RefObject<any> = React.createRef();
const phoneRef: React.RefObject<any> = React.createRef();
const errorLabelRef: React.RefObject<any> = React.createRef();

const useStyles = makeStyles((theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    position: 'absolute',
  },
  errorLabel: {
    color: 'red',
    fontSize: 16,
  },
}));

async function registerClicked() {
  if (
    !usernameField.current.value ||
    !firstNameField.current.value ||
    !lastNameField.current.value ||
    !emailField.current.value ||
    !passwordField.current.value ||
    !password2Field.current.value
  ) {
    errorLabelRef.current.innerText = 'You left a field blank!';
    errorLabelRef.current.hidden = false;
  } else if (password2Field.current.value !== passwordField.current.value) {
    errorLabelRef.current.innerText = 'Passwords do not match!';
    errorLabelRef.current.hidden = false;
  } else {
    errorLabelRef.current.hidden = true;

    const uname = usernameField.current.value;
    const name = `${firstNameField.current.value} ${lastNameField.current.value}`;
    const alias = firstNameField.current.value;
    const email = emailField.current.value;
    const phone = phoneRef.current.value;
    const pw = passwordField.current.value;

    const model = new RegisterModel(uname, name, alias, phone, email, pw);
    const ps = new PokerService();
    ps.registerUser(model);
  }
}

export default function Register(): JSX.Element {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                inputRef={usernameField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={firstNameField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lastNameField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="lphone"
                inputRef={phoneRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                inputRef={password2Field}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerClicked}
          >
            Sign Up
          </Button>
          <Typography
            component="h1"
            variant="h5"
            innerRef={errorLabelRef}
            className={classes.errorLabel}
            hidden
          >
            An error occurred!
          </Typography>
        </form>
      </div>
    </Container>
  );
}
