import React from 'react';

class RateCounter extends React.Component {
    state = {
        game_count: 0,
        rate_count: 0
    }
    componentDidMount = async () => {
        const user_id = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/users/${user_id}/games/features`, { headers: { 'authorization': 'w6mgLXNHbPgewJtRESxh', 'x-access-token': token }});
            const json = await res.json();
            if (res.ok) {
                this.setState({ rate_count: json.games.length });
            } else {
                console.log(json.message);
            }
        } catch (err) {
            console.error(err);
        }

        try {
            const res = await fetch(`http://api.gamepicker.co.kr/games`, { headers: { 'authorization': 'w6mgLXNHbPgewJtRESxh' }});
            const json = await res.json();
            if (res.ok) {
                this.setState({ game_count: json.games.length });
            } else {
                console.log(json.message);
            }
        } catch (err) {
            console.error(err);
        }

    }
    render() {
        const { game_count, rate_count } = this.state;
        return (
            <div className='rate-counter'>
                <div>평가된 게임 개수: {rate_count}</div>
                <div>총 게임 개수: {game_count}</div>
            </div>
        );
    }
}

export default RateCounter;