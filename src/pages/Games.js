import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Games.css'

import AppBar from '@material-ui/core/AppBar'

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
        console.log(games);
        this.setState({ games });
        
    }
    render() {
        const renderGames = () => {
            const res = this.state.games.map(game => {
                return (
                    <article key={game.id} className='game'>
                        <Link to={`/games/${game.id}`}>
                            <img src={game.images[0]} alt={game.title}></img>
                            {game.title}
                        </Link>
                    </article>
                )
            });            
            return res;
        }
        return (
            <React.Fragment>
                {renderGames()}
                <AppBar></AppBar>
            </React.Fragment>
        )
    }
}

export default Games;