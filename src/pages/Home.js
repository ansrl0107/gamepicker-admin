import React, { Component } from 'react';
import RateCounter from '../components/RateCounter';

class Home extends Component {
    componentDidMount = () => {        
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push('/login');
        }
    }
    render() {
        return(
            <section className='home content'>
                <RateCounter />
            </section>
        )
    }
}

export default Home;