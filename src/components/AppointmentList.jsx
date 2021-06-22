import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from '@material-ui/core/Avatar';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EventAvailable from '@material-ui/icons/EventAvailable';
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

export default function AppointmentList() {
    const classes = useStyles();
    const [state, setState] = useState([])


    useEffect(() => {
        let repeat;

        async function fetchAppointments() {
            fetch(`${process.env.REACT_APP_SERVERLESS_DOMAIN}/fetch-appointments`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(resp => resp.json())
                .then(appointments => {
                    console.log('appointments', appointments)
                    setState(appointments || [])
                    repeat = setTimeout(fetchAppointments, 3000);

                })
                .catch(e => {
                    console.log(e)
                    window.alert(e)
                    setState([])
                })
        }
        fetchAppointments();

        return () => {
            if (repeat) {
                clearTimeout(repeat);
            }
        }
    }, [])

    const deleteAppointment = (sid) => {
        const params = new URLSearchParams({contactNumber: sid})
        console.log('delete sid', sid)
        fetch(`${process.env.REACT_APP_SERVERLESS_DOMAIN}/delete-appointment`, {
            method: 'POST',
            body: params,
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).catch(e => {
                console.log(e)
                window.alert(e)
                setState([])
            })
    }

    console.log('state', state)
    if (state.length == 0 || !state)
        return (
            <div className={classes.container}>
                <Typography>No Scheduled Appointments</Typography>
            </div>
        )
    else
        return (
            <div className={classes.container}>
                <List className={classes.root}>
                    {state.map((appt, i) =>
                        <ListItem key={'appointment-'+i}>
                            <ListItemAvatar>

                                <Avatar>
                                    {appt.data.confirmed ? <EventAvailable color={'secondary'}/> : <CalendarToday/> }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={appt.data.name} secondary={`Tomorrow ${appt.data.time}`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments" onClick={() => deleteAppointment(appt.sid)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </div>

        );
}