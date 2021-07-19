import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function FundList() {
  const classes = useStyles();

  const [funds, setFunds] = useState([]);
  useEffect(() => {
    FundsGet()
  }, [])
  
  const FundsGet = () => {
    fetch("http://132.145.210.248:8080/captain/funds")
      .then(res => res.json())
      .then(
        (result) => {
          setFunds(result)
        }
      )
  }
  
  const ViewFund = id => {
    window.location = '/view/'+id
  }

  const FundDelete = (id) => {
    // let data =
    // {
    //   "fund_id": 50
    //   // "fund_name": "Fund ThreeThousand",
    //   // "fund_inception_date": "2021-07-16",
    //   // "fund_manager": {
    //   //   "fund_manager_id": "mjones@thefundone.com",
    //   //   "fund_manager_name": "Mick Jones",
    //   //   "fund_manager_phone": "555-555-5555",
    //   //   "fund_manager_mail_address": "mjones@thefundone.com",
    //   //   "fund_manager_birth_date": "1970-01-01"
    //   // }
    // }
    //  fetch('http://132.145.210.248:8080/captain/funds/50', {
    //   method: "DELETE"
      // headers: {
      //   Accept: 'application/form-data',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(data)
    // })
    // .then(res => console.log(res))

    fetch("http://132.145.210.248:8080/captain/funds/43", {
      // headers: {
      //   // Accept: "application/json",
      //   "Access-Control-Allow-Methods": "DELETE"
      // },
      method: "DELETE",
      
    })

    // .then(
    //   (result) => {
    //     alert(result['message'])
    //     if (result['status'] === 'ok') {
    //       FundsGet();
    //     }
    //   }
    // )
  }

  
  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                FUNDS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="left">Fund Name</TableCell>
                <TableCell align="left">Fund Inception Date</TableCell>
                <TableCell align="left">Fund Manager</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Birth Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
            
              {funds.map((fund, idx) => (
                <TableRow key={idx}>
                  <TableCell align="right">{idx + 1}</TableCell>
                  <TableCell align="left">{fund.fund_name}</TableCell>
                  <TableCell align="left">{fund.fund_inception_date}</TableCell>
                  <TableCell align="left">{fund.fund_manager.fund_manager_name}</TableCell>
                  <TableCell align="left">{fund.fund_manager.fund_manager_phone}</TableCell>
                  <TableCell align="left">{fund.fund_manager.fund_manager_mail_address}</TableCell>
                  <TableCell align="left">{fund.fund_manager.fund_manager_birth_date}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => FundDelete(fund.fund_id)}>Delete</Button>
                      <Button onClick={() => ViewFund(fund.fund_id)}>View</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}