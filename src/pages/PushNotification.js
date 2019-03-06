import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class PushNotification extends React.Component {
    state = {
        title: '',
        message: '',
        data: {},
        checked_male: false,
        checked_female: false,
        min_age: undefined,
        max_age: undefined,
        min_date: undefined,
        max_date: undefined
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
      };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSend = (e) => {
        console.log(this.state);
    }
    handleCheck = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }
    render() {
        return (
            <section className='push-notification content'>
                <form>
                    <div className='push-notification-control'>
                        <h1>Gender</h1>
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.checked_male}
                                name='checked_male'
                                onChange={this.handleCheck}
                                value="checked_male"
                                color="primary"
                                />
                            }
                            label="male"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.checked_female}
                                name='checked_female'
                                onChange={this.handleCheck}
                                value="checked_female"
                                color="primary"
                                />
                            }
                            label="female"
                        />
                        <h1>Age</h1>
                        <TextField
                            id='oulined-min-age'
                            label='Minimum age'
                            name='min_age'
                            value={this.state.min_age}
                            onChange={this.handleChange}
                            margin="dense"
                        />
                        <TextField
                            id='oulined-max-age'
                            label='Maximum age'
                            name='min_age'
                            value={this.state.max_age}
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
            </section>
        )
    }
}

export default PushNotification;