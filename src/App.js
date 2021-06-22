import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import AppHeader from "./components/AppHeader";
import './App.css';
import Main from './components/Main'
require('dotenv').config()

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppHeader/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}

export default App;


