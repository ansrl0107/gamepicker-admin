import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Games, Login } from './pages'
import './App.css'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light:'#eb4387',
        main: '#E71469',
        dark: '#a10e49',
        contrastText: '#FFFFFF'
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      typography: {
        useNextVariants: true,
      },
      // error: will use the default color
    },
  });

class App extends Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route path='/games' component={Games} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        )
    }
}

export default App;