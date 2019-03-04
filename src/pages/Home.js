import React, { Component } from 'react';
import AppBar from '../components/AppBar'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    state = {
        login: false
    }
    componentDidMount = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.setState({
                login: true
            })
        }
    }
    render() {
        const { login } = this.state;
        if (login) {
            return(
                <div>
                    <AppBar title='Gamepicker'></AppBar>
                </div>
            )
        } else {
            return <Redirect to='/login'></Redirect>
        }
    }
}

export default Home;