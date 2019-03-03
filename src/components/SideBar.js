import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

class SideBar extends Component {
    render() {
        return (
            <aside className='side-bar'>
                <ul className='menu'>
                    <li><Link to='/games'>Game Manage</Link></li>
                    <li><Link to='/push'>Push Notification</Link></li>
                    <li><Link to='/reply'>Reply</Link></li>
                    <li><Link to='/working'>Working logs</Link></li>
                    <li><Link to='/notice'>Notice</Link></li>
                </ul>
            </aside>
        )
    }
}

export default SideBar;