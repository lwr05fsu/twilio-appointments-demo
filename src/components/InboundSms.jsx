import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import qrCode from "../scheduling-demo-qr-code.png";

const useStyles = makeStyles({
    root: {
        padding:20,
        alignItems:'center',
        justifyContent: 'center'
    },
    paper:{
        marginTop:'auto',
        marginBottom:'auto',
        padding:10,
        minHeight:'300px'
    },
    or: {
        marginTop:'50px',
        marginBottom:'50px',
        padding:'30px'
    }

});

export default function Main() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                  spacing={2}
                  direction="column"
                  // justify="space-evenly"
                  // alignItems="stretch"
            >

                <Grid key={'qr-code'} item >
                    <Paper elevation={3}  className={classes.paper}>
                        <Typography variant={'h3'}>Scan the QR Code</Typography>
                        <img src={qrCode} alt="qr-code"/>
                    </Paper>
                </Grid>
                <Grid key={'or'} item className={classes.or}>
                    <Typography variant={'h1'}> -OR- </Typography>
                </Grid>
                <Grid key={'contact-info'} item >

                        <Typography variant={'h3'} >
                            Text 218-489-4052 <br/> To Get Started
                        </Typography>
                </Grid>


            </Grid>
        </div>

    );
}