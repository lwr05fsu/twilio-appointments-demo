import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 'auto',
        marginBottom: 'auto',
        padding: 10,
        minHeight: '300px'
    },
    container: {
        padding:20,
        alignItems:'center',
        justifyContent: 'center'
    },
});

export default function OutboundSms() {
    const classes = useStyles();

    let phoneNumber = React.createRef();

    const handleClick = () => {
        const params = {contactNumber: phoneNumber.current.value}
        console.log(phoneNumber.current)
        console.log('params', params)
        fetch(`/start-flow`, {
            method: 'POST',
            body: new URLSearchParams(params),
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).catch(e => {
                console.log(e)
            })
    }

    return (
        <div className={classes.container}>
        <Grid container
              spacing={2}
              direction="column"
            // justify="space-evenly"
            // alignItems="stretch"
        >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <TextField
                            name={'number'}
                            required
                            id="phone"
                            label="Phone Number"
                            variant="outlined"
                            inputRef={phoneNumber}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">+1</InputAdornment>,

                            }}

                        />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color={"secondary"} onClick={handleClick}>
                        Send Appointment Reminder
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        </div>
    );
}

