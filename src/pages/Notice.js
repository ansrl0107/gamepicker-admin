import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToastMessage from '../components/ToastMessage';

//공지폼을 wysiwyg 으로, 현재 올린 공지들을 볼수잇는 리스트 추가 해야함

class Notice extends React.Component {
    state = {
        toastMessage: '',
        toastOpen: false,
        notices: [],
        notice: '',
        notice_title: ''
    }
    componentDidMount = async () => {
        try {
            const res = await fetch('http://api.gamepicker.co.kr/admin/notices', {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION
                }
            });
            const json = await res.json();
            if (res.ok) {
                this.setState({
                    notices: json.notices
                })
            } else {
                this.handleToastMessage(json.message)
            }
        } catch (err) {
            console.error(err);
        }
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
    writeNotice = async () => {
        const { notice, notice_title } = this.state;
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch('http://api.gamepicker.co.kr/admin/notices', {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                method: 'post',
                body: JSON.stringify({
                    title: notice_title,
                    value: notice
                })
            });
            if (res.ok) {
                this.handleToastMessage('작성 완료');
            } else {
                const json = await res.json();
                this.handleToastMessage(json.message)
            }
        } catch (err) {
            this.handleToastMessage(err);
        }
        
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <section className='notice content'>
                <form>
                    <TextField
                        id="outlined-notice-title"
                        label="Notice Title"
                        name="notice_title"
                        value={this.state.notice_title}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-notice"
                        label="Notice"
                        name="notice"
                        value={this.state.notice}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={this.writeNotice}>
                        Write
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

export default Notice;