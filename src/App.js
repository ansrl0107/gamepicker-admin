import React, { Component } from 'react';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Games } from './pages'
import './app.css'

class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <SideBar />
                    <section className='main-section'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/games' component={Games} />
                        </Switch>
                    </section>
                </React.Fragment>
            </Router>
        )
    }
}

export default App;