import React, { Component } from 'react';

class Home extends Component {
    componentDidMount = () => {        
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }
    }
    render() {
        return(
            <div>
                <div>dsadas</div>
            </div>
        )
    }
}

export default Home;