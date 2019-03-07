import React, { Component } from 'react';
import './Games.css'
import Card from '../components/Card';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


class Games extends Component {
    state = {
        games: [],
        rated_games: [],
        search: '',
        checked_feature: false
    }
    componentDidMount = async () => {       
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/games`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION
                }
            });
            const json = await res.json();      
            if (res.ok) {
                const games = json.games;
                this.setState({ games });
            } else {
                throw json.message;
            }
        } catch (err) {
            console.error(err);
        }

        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch(`http://api.gamepicker.co.kr/me/games/features`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'x-access-token': token
                }
            });
            const json = await res.json();
            if (res.ok) {                
                const rated_games = json.games.map(game => game.id);
                this.setState({ rated_games })
            } else {
                throw json.message;
            }
        } catch (err) {
            console.error(err);
        }

    }
    handleClick = (id) => {
        this.props.history.push(`/games/${id}`);
    }
    handleFab = (e) => {
        this.props.history.push(`/games/create`);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSwitch = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    };
    renderGame = (game, index) => {
        return (
            <div key={`game-item-${index}`} className='game-item' name='dsa' game-id={game.id} onClick={this.handleClick}>
                <Card
                    title={game.title}
                    img={game.images[0]}
                    gameId={game.id}
                    handleClick={this.handleClick}
                />
            </div>
        )
    }
    render() {
        const { games, search, checked_feature, rated_games } = this.state;
        return (
            <section className='games content'>
                <div className='game-filter'>
                    <div>
                        <TextField
                            id='standard-search'
                            label='Search'
                            name='search'
                            value={search}
                            onChange={this.handleChange}
                            margin='dense'
                            fullWidth
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.checked_feature}
                                    onChange={this.handleSwitch}
                                    value="checked_feature"
                                    name='checked_feature'
                                    color='primary'
                                />
                            }
                            labelPlacement='top'
                            label="평가안됨"
                        />
                    </div>
                </div>
                <Tooltip title="Add Game"
                    aria-label="Add" 
                    onClick={this.handleFab}
                    style={{
                        bottom: 16,
                        right: 16,
                        position: 'fixed',
                        zIndex: 1
                    }}>
                    <Fab color="primary">
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <section className='game-list'>
                {
                    games.map((game, index) => {
                        if (game.title.toLowerCase().replace(/ /gi, "").includes(this.state.search.toLowerCase())) {
                            if (checked_feature) {
                                if (!rated_games.includes(game.id)) {
                                    return this.renderGame(game, index);
                                } else {
                                    return null;
                                }
                            } else {
                                return this.renderGame(game, index);
                            }
                        } else {
                            return null;
                        }
                    })
                }
                </section>
            </section>
        )
    }
}

export default Games;