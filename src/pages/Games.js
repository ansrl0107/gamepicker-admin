import React, { Component } from 'react';
import './Games.css'
import Card from '../components/Card';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

class Games extends Component {
    state = {
        games: []
    }
    componentDidMount = async () => {        
        const res = await fetch(`http://api.gamepicker.co.kr/games`, {
            headers: {
                'authorization': process.env.REACT_APP_AUTHORIZATION
            }
        });
        const json = await res.json();        
        const games = json.games;
        this.setState({ games });
    }
    handleClick = (id) => {
        this.props.history.push(`/games/${id}`);
    }
    handleFab = (e) => {
        this.props.history.push(`/games/create`);
    }
    render() {
        const { games } = this.state;
        return (
            <section className='games'>
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
                    })
                }
                </section>
            </section>
        )
    }
}

export default Games;