import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './GameForm.css';
import IconDelete from '@material-ui/icons/Delete';
import IconAdd from '@material-ui/icons/Add';
import ToastMessage from '../components/ToastMessage';

class GameCreate extends React.Component {
    state = {
        title: '',
        developer: '',
        publisher: '',
        age_rate: '',
        summary: '',
        images: [],
        videos: [],
        platforms: [],
        name: [],
        all_platforms: [],
        new_image: "",
        new_video: "",
        toastMessage: "",
        toastOpen: false
    }
    handleToastMessage = (message) => {
        this.setState({
            toastMessage: message,
            toastOpen: true
        })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ toastOpen: false });
    };
    componentDidMount = async () => {
        try {
            const platform_res = await fetch(`http://api.gamepicker.co.kr/platforms`, {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION
                }
            });
            const json = await platform_res.json();
            const all_platforms = json.platforms;
            this.setState({
                all_platforms
            });
        } catch (err) {
            console.error(err);
        }        
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSelect = (e) => {
        const { platforms } = this.state;
        platforms.push(Number(e.target.dataset.id));
        this.setState({
            platforms
        })
    }
    handleCreate = async (e) => {
        const { title, developer, publisher, age_rate, images, videos, summary, platforms } = this.state;
        const body = { title, developer, publisher, age_rate, images, videos, summary, platforms };
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch('http://api.gamepicker.co.kr/games', {
                headers: {
                    'x-access-token': token,
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify(body)
            });
            const json = await res.json();
            if (res.ok) {
                this.props.history.push('/games');
            } else {
                this.handleToastMessage(json.message);
            }
        } catch (err) {
            console.error(err);
            this.handleToastMessage(err);
        }
    }
    handleDeletePlatform = (e) => {
        const { platforms } = this.state;
        const id = Number(e.target.dataset.id);
        const index = platforms.indexOf(id);
        platforms.splice(index, 1);
        this.setState({ platforms });
    }
    handleAddImage = () => {
        const { images, new_image } = this.state;
        if (new_image.includes('http://') || new_image.includes('https://')) {
            images.push(new_image);
            this.setState({ images, new_image: "" });
        }
    }
    handleDeleteImage = (e) => {
        let parentNode = e.target.parentElement;
        while (parentNode.getAttribute('class') !== 'input-wrapper') {
            parentNode = parentNode.parentElement;
        }
        const index = parentNode.children[0].dataset.id;
        const { images } = this.state;
        images.splice(index, 1);
        this.setState({ images });
    }
    handleAddVideo = () => {
        const { videos, new_video } = this.state;
        if (new_video.includes('http://') || new_video.includes('https://')) {
            videos.push(new_video);
            this.setState({ videos, new_video: "" });
        }
    }
    handleDeleteVideo = (e) => {
        let parentNode = e.target.parentElement;
        while (parentNode.getAttribute('class') !== 'input-wrapper') {
            parentNode = parentNode.parentElement;
        }
        const index = parentNode.children[0].dataset.id;
        const { videos } = this.state;
        videos.splice(index, 1);
        this.setState({ videos });
    }
    render() {
        const { all_platforms, images, videos } = this.state;
        return (
            <section className='game-form content'>
                <form>
                    <TextField
                        id="outlined-name"
                        label="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-developer"
                        label="developer"
                        name="developer"
                        value={this.state.developer}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="publisher"
                        name="publisher"
                        value={this.state.publisher}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="age rate"
                        name="age_rate"
                        value={this.state.age_rate}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-name"
                        label="summary"
                        name="summary"
                        value={this.state.summary}
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
                            if (this.state.platforms.includes(platform.id)) {
                                return <div key={index} className='platform selected' data-id={platform.id} onClick={this.handleDeletePlatform}>{platform.value}</div>
                            } else {
                                return <div key={index} className='platform' data-id={platform.id} onClick={this.handleSelect}>{platform.value}</div>                          
                            }
                        })}
                    </div>
                    <Button variant="contained" color="primary" fullWidth onClick={this.handleCreate}>
                        Create
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