import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InboundSms from "./InboundSms";
import OutboundSms from "./OutboundSms";
import AppointmentList from "./AppointmentList";

const useStyles = makeStyles({
    root: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        marginTop: 'auto',
        marginBottom: 'auto',
        padding: 10,
        height: '100%'
    },
    or: {
        marginTop: 'auto',
        marginBottom: 'auto'
    }

});

export default function Main() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify={'space-evenly'}
                  alignItems={'stretch'}
            >
                <Grid key={'left-panel'} item>
                    <Typography variant={'h2'}>Outbound
                    </Typography>

                    <OutboundSms/>

                </Grid>
                <Grid key={'appointment-list'} item>
                    <Typography variant={'h2'}>Appointments
                    </Typography>
                    <AppointmentList/>
                </Grid>
                <Grid key={'right-panel'} item>
                    <Typography variant={'h2'}>Inbound
                    </Typography>
                    <InboundSms/>
                </Grid>
            </Grid>
        </div>

    );
}