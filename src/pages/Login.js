import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import ToastMessage from '../components/ToastMessage';


import logo from '../asset/text_logo.png'
import './Login.css'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const my_theme = createMuiTheme({
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

class Login extends Component {
    state = {
        email: "",
        password: "",
        loginSucess: false,
        toastMessage: "",
        open: false
    }
    componentDidMount = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            window.location.reload();
        }
    }
    handleClick = () => {
        this.setState({ open: true });
    };
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleToastMessage = (message) => {
        this.setState({ open: true, toastMessage: message });
    }
    handleLogin = async () => {
        const { email, password } = this.state;
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/auth/login?admin`, {
                headers: {
                    'authorization': 'w6mgLXNHbPgewJtRESxh',
                    'content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    email, password
                })
            });
            const json = await res.json();
            if (res.ok) {
                sessionStorage.setItem('id', json.user_id);
                sessionStorage.setItem('token', json.token);            
                this.handleToastMessage('Login Success');
                window.location.reload();
            } else {
                this.handleToastMessage(json.message)
            }
        } catch (err) {
            console.error(err);
            this.handleToastMessage(err.message?err.message:err);
        }
    }
    render() {
        const { loginSucess } = this.state;
        if (loginSucess) {
            return <Redirect to='/'></Redirect>
        } else {
            return (
                <MuiThemeProvider theme={my_theme}>
                    <section className='login content'>
                        <form>
                            <legend>
                                <img src={logo} alt='text logo'></img>
                            </legend>
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <Button variant="contained" color="primary" onClick={this.handleLogin}>Login</Button>
                        </form>        
                        <ToastMessage
                            message={this.state.toastMessage}
                            open={this.state.open}
                            handleClose={this.handleClose}
                        />
                    </section>
                </MuiThemeProvider>
            )
        }
    }
}

export default Login;