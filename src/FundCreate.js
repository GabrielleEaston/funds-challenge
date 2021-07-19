import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function FundCreate() {
  const classes = useStyles();
  
  
  const handleSubmit = async (event) => {
  event.preventDefault();
  let data = {
    'fund_name': fundName,
    'fund_inception_date': fundDate,
    'fund_manager': {
      'fund_manager_id': managerId,
    }
  }
  await fetch('http://132.145.210.248:8080/captain/funds', {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        alert("New Fund Created Succesfully!");
        window.location.href = '/';
      } else {
        alert("Error", response.status)
      }
    })
  }

  

  const [fundName, setFundName] = useState('');
  const [fundDate, setFundInceptionDate] = useState('');
  const [managerId, setManagerId] = useState('');
    
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          FUND
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fundName"
                name="fundName"
                variant="outlined"
                required
                fullWidth
                id="fundName"
                label="Fund Name"
                onChange={(e) => setFundName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fundDate"
                label="Fund Inception Date"
                onChange={(e) => setFundInceptionDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="managerId"
                label="Manager ID"
                onChange={(e) => setManagerId(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            CREATE
          </Button>
        </form>
      </div>
    </Container>
  );
}