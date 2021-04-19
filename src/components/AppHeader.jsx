import {AppBar, Avatar, Toolbar, Typography, Grid} from "@material-ui/core";
import logo from "../twilio-logo.png";
import React from "react";

const styles = {
centered: {
    margin: '0 auto'
},
    title: {
    padding:'10px'
    }
}
const AppHeader = () => (
    <AppBar position="static" color={'primary'}>
    <Toolbar style ={styles.centered}>

        <Avatar src={logo} className="App-logo" alt="logo" />
        <Typography variant={'h3'} style={styles.title}>Appointments Demo</Typography>
            <Avatar src={logo} className="App-logo" alt="logo" />

    </Toolbar>
</AppBar>
)

export default AppHeader