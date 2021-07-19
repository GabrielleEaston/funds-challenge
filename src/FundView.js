import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}));

export default function FundView() {
  const classes = useStyles();
  const { id } = useParams();
  const [fund, setFund] = useState();
  useEffect(() => {
    GetOneFund(id)
  }, [])
  const GetOneFund = (id) => {
     fetch("http://132.145.210.248:8080/captain/funds/"+id)
      .then(res => res.json())
    
      .then(
        (result) => {
          setFund(result);
        }
      )
  }
  
  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Fund
        </Typography>
        <Grid container spacing={2}>
          {fund && 
            <>
            <Grid item xs={12}>
            <h3>Fund Name:{fund.fund_name}</h3>
            </Grid>
            <Grid item xs={12}>
              <h3>Fund Inception Date:{fund.fund_inception_date}</h3>
            </Grid>
            <Grid item xs={12}>
            <h3>Fund Manager: {fund.fund_manager.fund_manager_name}</h3>
            </Grid>
            <Grid item xs={12}>
            <h3>Fund Manager Phone Number: {fund.fund_manager.fund_manager_phone}</h3>
            </Grid>
            <Grid item xs={12}>
            <h3>Fund Manager Email:{fund.fund_manager.fund_manager_mail_address}</h3>
            </Grid>
            <Grid item xs={12}>
            <h3>Fund Manager Birth Date: {fund.fund_manager.fund_manager_birth_date}</h3>
            </Grid>
          </>
          }
          </Grid>
          
      </div>
    </Container>
  );
}