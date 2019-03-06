import React from 'react';
import { Redirect } from 'react-router-dom';

class NotMatch extends React.Component {
    render() {
        return <Redirect to='/'/>
    }
}

export default NotMatch;