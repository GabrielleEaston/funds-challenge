import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  
}));

export default function FundView() {
  const classes = useStyles();
  const { id } = useParams();
  const [fund, setFund] = useState();
  useEffect(() => {
    GetOneFund(id)
  }, [id])
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
              <List className={classes.root}>
                <ListItem>
                  <ListItemText primary="Fund name" secondary={fund.fund_name}></ListItemText>
              </ListItem>
              <Divider />
                <ListItem>
                  <ListItemText primary="Fund Inception Date" secondary={fund.fund_inception_date}></ListItemText>
              </ListItem>
              <Divider></Divider>
                <ListItem>
                  <ListItemText primary="Fund Manager" secondary={fund.fund_manager.fund_manager_name}>{fund.fund_inception_date}</ListItemText>
              </ListItem>
              <Divider component="li" variant="inset" />
              <li>
                <Typography
                className={classes.dividerInset}
                color="textSecondary"
                display="block"
                variant="caption">
                Contact Info
                </Typography>
              </li>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ContactMailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={fund.fund_manager.fund_manager_mail_address} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ContactPhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Phone Number" secondary={fund.fund_manager.fund_manager_phone} />
              </ListItem>
            </List>
          </>
          }
          </Grid>
      </div>
    </Container>
  );
}