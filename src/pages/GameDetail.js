import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './GameForm.css';
import IconDelete from '@material-ui/icons/Delete';
import IconAdd from '@material-ui/icons/Add';
import ToastMessage from '../components/ToastMessage';

class GameCreate extends React.Component {
    state = {
        all_platforms: [],
        new_image: "",
        new_video: "",
        toastMessage: "",
        toastOpen: false,
        game: {
            title: '',
            developer: '',
            publisher: '',
            age_rate: '',
            summary: '',
            images: [],
            videos: [],
            platforms: []
        },
        game_features: {
            게임성: undefined,
            조작성: undefined,
            난이도: undefined,
            스토리: undefined,
            몰입도: undefined,
            BGM: undefined,
            공포성: undefined,
            과금유도: undefined,
            노가다성: undefined,
            진입장벽: undefined,
            필요성능: undefined,
            플레이타임: undefined,
            가격: undefined,
            DLC: undefined,
            버그: undefined,
            그래픽: undefined
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ toastOpen: false });
    };
    componentDidMount = async () => {
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/platforms`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION
                }
            });
            const json = await res.json();
            const all_platforms = json.platforms;
            this.setState({
                all_platforms
            });
        } catch (err) {
            console.error(err);
        }        
        const game_id = window.location.pathname.split('/')[2];
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/games/${game_id}`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                }
            });
            const json = await res.json();
            const game = json.game;            
            this.setState({ game });
        } catch (err) {
            console.error(err);
        }
        try {
            const token = sessionStorage.getItem('token');
            const user_id = sessionStorage.getItem('id');
            const res = await fetch(`http://api.gamepicker.co.kr/users/${user_id}/games/features`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'x-access-token': token,
                }
            });
            const json = await res.json();
            const features = json.games.filter(item => item.id === Number(game_id))[0].features;
            
            if (res.ok) {
                if (features) {
                    this.setState({
                        game_features: features
                    })
                }                
            }  else {
                throw json.message;
            }
        } catch (err) {
            console.error(err);
        }
 
    }
    handleChange = (e) => {
        if (this.state.hasOwnProperty(e.target.name)) {
            this.setState({
                [e.target.name]: e.target.value
            })
        } else {
            this.setState({
                game: {
                    ...this.state.game,
                    [e.target.name]: e.target.value
                }
            });
        }
    }
    handleAddPlatform = (e) => {
        const { platforms } = this.state.game;
        platforms.push(e.target.textContent);        
        this.setState({
            platforms
        })
    }
    handleToastMessage = (message) => {
        this.setState({
            toastMessage: message,
            toastOpen: true
        })
    }
    updateGame = async () => {
        const token = sessionStorage.getItem('token');
        const game_id = window.location.pathname.split('/')[2];
        try {
            const res = await fetch(`http://api.gamepicker.co.kr/games/${game_id}`, {
                headers: {
                    'x-access-token': token,
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify(this.state.game)
            });
            if (!res.ok) {
                const json = await res.json();
                throw json.message;
            }
            const res2 = await fetch(`http://api.gamepicker.co.kr/games/${game_id}/features`, {
                headers: {
                    'x-access-token': token,
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(this.state.game_features)
            });
            if (res2.ok) {
                this.handleToastMessage('Update complete')
            } else {
                const json = await res2.json();
                throw json.message
            }
        } catch (err) {
            this.handleToastMessage(err);
        }
    }
    handleDeletePlatform = (e) => {
        const { platforms } = this.state.game;
        const value = e.target.textContent;        
        const index = platforms.indexOf(value);
        platforms.splice(index, 1);
        this.setState({ 
            game: {
                ...this.state.game,
                platforms
            } 
        });
    }
    handleAddImage = () => {
        const { images } = this.state.game;
        const { new_image } = this.state
        if (new_image === '') {
            this.handleToastMessage('Image links are not allowed blanks');
        } else if (!new_image.includes('http://') && !new_image.includes('https://')) {
            this.handleToastMessage('Please put the correct link')
        } else {
            images.push(new_image);
            this.setState({
                game: {
                    ...this.state.game,
                    images
                }
            });
        }
        this.setState({ new_image: '' })
    }
    handleDeleteImage = (e) => {
        let parentNode = e.target.parentElement;
        while (parentNode.getAttribute('class') !== 'input-wrapper') {
            parentNode = parentNode.parentElement;
        }
        const index = parentNode.children[0].dataset.id;
        const { images } = this.state.game;
        images.splice(index, 1);
        this.setState({
            game: {
                ...this.state.game,
                images
            }
        });
    }
    handleAddVideo = () => {
        const { videos } = this.state.game;
        const { new_video } = this.state;
        if (new_video.includes('http://') || new_video.includes('https://')) {
            videos.push(new_video);
            this.setState({
                game: {
                    ...this.state.game,
                    videos
                },
                new_video: ''
            });
        }
    }
    handleDeleteVideo = (e) => {
        let parentNode = e.target.parentElement;
        while (parentNode.getAttribute('class') !== 'input-wrapper') {
            parentNode = parentNode.parentElement;
        }
        const index = parentNode.children[0].dataset.id;
        const { videos } = this.state.game;
        videos.splice(index, 1);
        this.setState({
            game: {
                ...this.state.game,
                videos
            }
        });
    }
    handleTest = (e) => {
        const score = Number(e.target.value);
        const name = e.target.name;
        const { game_features } = this.state; 
        this.setState({
            game_features: {
                ...this.state.game_features,
                [name]: game_features[name] === score?undefined:score
            }
        })
    }
    render() {
        const { title, developer, publisher, age_rate, images, videos, summary, platforms } = this.state.game;
        const { all_platforms, game_features } = this.state;
        const features = [ '게임성', '조작성', '난이도', '스토리', '몰입도', 'BGM', '공포성', '과금유도', '노가다성', '진입장벽', '필요성능', '플레이타임', '가격', 'DLC', '버그', '그래픽' ];
        
        return (
            <section className='game-form content'>
                <form>
                    <TextField
                        id="outlined-name"
                        label="title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-developer"
                        label="developer"
                        name="developer"
                        value={developer}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="publisher"
                        name="publisher"
                        value={publisher}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="age rate"
                        name="age_rate"
                        value={age_rate}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="summary"
                        name="summary"
                        value={summary}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                    <h1>images</h1>
                    <div className='images'>
                        {images.map((image, index) => {
                            return (
                                <div key={index}  className='input-wrapper'>
                                    <input type='text' disabled value={image} data-id={index}></input>
                                    <Button variant='text' color='primary' onClick={this.handleDeleteImage}>
                                        <IconDelete></IconDelete>
                                    </Button>
                                </div>
                            )
                        })}
                        <div className='input-wrapper'>
                            <input type='text' value={this.state.new_image} name='new_image' onChange={this.handleChange}></input>
                            <Button variant='text' color='primary' onClick={this.handleAddImage}>
                                <IconAdd></IconAdd>
                            </Button>
                        </div>
                    </div>
                    <h1>videos</h1>
                    <div className='videos'>
                        {videos.map((video, index) => {
                            return (
                                <div key={index}  className='input-wrapper'>
                                    <input type='text' disabled value={video} data-id={index}></input>
                                    <Button variant='text' color='primary' onClick={this.handleDeleteVideo}>
                                        <IconDelete></IconDelete>
                                    </Button>
                                </div>
                            )
                        })}
                        <div className='input-wrapper'>
                            <input type='text' value={this.state.new_video} name='new_video' onChange={this.handleChange}></input>
                            <Button variant='text' color='primary' onClick={this.handleAddVideo}>
                                <IconAdd></IconAdd>
                            </Button>
                        </div>
                    </div>
                    <h1>platforms</h1>
                    <div className='platforms'>
                        {all_platforms.map((platform, index) => {
                            if (platforms.includes(platform.value)) {
                                return <div key={index} className='platform selected' data-id={platform.id} onClick={this.handleDeletePlatform}>{platform.value}</div>
                            } else {
                                return <div key={index} className='platform' data-id={platform.id} onClick={this.handleAddPlatform}>{platform.value}</div>                          
                            }
                        })}
                    </div>
                    <h1>Features</h1>
                    <div className='features'>
                        <table>
                            <tbody>
                                {features.map((feature, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{feature}</td>
                                            {[1,2,3,4,5].map((score, index) => {
                                                return (
                                                    <td key={index}>
                                                        <input type='button' className={game_features[feature]===score?"feature_button active":"feature_button"} name={feature} value={score} onClick={this.handleTest}></input>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Button variant="contained" color="primary" fullWidth onClick={this.updateGame}>
                        Update
                    </Button>
                </form>
                <ToastMessage
                    message={this.state.toastMessage}
                    open={this.state.toastOpen}
                    handleClose={this.handleClose}
                />
            </section>
        )
    }
}

export default GameCreate;