import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RadioGroup, Radio } from '@material-ui/core';
import ToastMessage from '../components/ToastMessage';

class PushNotification extends React.Component {
    state = {
        title: '',
        message: '',
        gender: 'm',
        minAge: 0,
        maxAge: 100,

    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
      };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleToastMessage = (message) => {
        this.setState({
            toastMessage: message,
            toastOpen: true
        })
    }
    handleSend = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch('http://api.gamepicker.co.kr/admin/push', {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                method: 'post',
                body: JSON.stringify(this.state)
            });
            console.log(res);
            
            if (res.ok) {
                this.handleToastMessage('success');
            } else {
                const json = await res.json();
                this.handleToastMessage(json.message)
            }
        } catch (err) {
            if (err.message) {
                this.handleToastMessage(err.message)
            } else {
                this.handleToastMessage(err);
            }
        }
    }
    handleCheck = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <section className='push-notification content'>
                <form>
                    <div className='push-notification-control'>
                        <h1>Gender</h1>
                        <RadioGroup
                            aria-label='Gender'
                            name='gender'
                            value={this.state.gender}
                            onChange={this.handleCheck}
                        >   
                            <FormControlLabel value='m' control={<Radio />} label='male' />
                            <FormControlLabel value='f' control={<Radio />} label='female' />
                        </RadioGroup>
                        <h1>Age</h1>
                        <TextField
                            id='oulined-min-age'
                            label='Minimum age'
                            name='minAge'
                            value={this.state.minAge}
                            onChange={this.handleChange}
                            margin="dense"
                        />
                        <TextField
                            id='oulined-max-age'
                            label='Maximum age'
                            name='maxAge'
                            value={this.state.maxAge}
                            onChange={this.handleChange}
                            margin="dense"
                        />
                        <h1>Last Login</h1>
                        <TextField
                            id='standard-date'
                            label='여기부터'
                            name='min_date'
                            value={this.state.min_date}
                            onChange={this.handleChange}
                            margin="dense"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id='standard-date'
                            label='여기까지'
                            name='max_date'
                            value={this.state.max_date}
                            onChange={this.handleChange}
                            margin="dense"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <TextField
                        id="outlined-title"
                        label="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-message"
                        label="message"
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={this.handleSend}>
                        Send
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

export default PushNotification;