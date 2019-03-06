import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ToastMessage from '../components/ToastMessage';

class Reply extends React.Component {
    state = {
        reply: '',
        questions: [],
        selectedQuestionIndex: 0,
        question: '',
        toastMessage: '',
        toastOpen: false
    }
    componentDidMount = async () => {
        try {
            const res = await fetch('http://api.gamepicker.co.kr/admin/questions', {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION
                }
            });
            const json = await res.json();
            if (res.ok) {                
                this.setState({
                    questions: json.questions
                })
            } else {
                console.error(json)
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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleReply = async () => {
        const { questions, selectedQuestionIndex } = this.state;
        const token = sessionStorage.getItem('token');
        try {
            if (!questions[selectedQuestionIndex])
                this.handleToastMessage('답변할 질문을 선택해주세요');
            else {
                const question_id = questions[selectedQuestionIndex].id;
                const res = await fetch(`http://api.gamepicker.co.kr/admin/questions/${question_id}/reply`, {
                    headers: {
                        'authorization': process.env.REACT_APP_AUTHORIZATION,
                        'content-type': 'application/json',
                        'x-access-token': token
                    },
                    method: 'post',
                    body: JSON.stringify({
                        reply: this.state.reply
                    })
                });
                if (res.ok) {
                    this.handleToastMessage('답변 완료');
                } else {
                    const json = await res.json();
                    this.handleToastMessage(json.message);
                }
            }
        } catch (err) {
            console.error(err);
        }

    }
    render() {
        return (
            <section className='reply content'>
                <form>
                    <Select
                        value={this.state.selectedQuestionIndex}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'selectedQuestionIndex',
                            id: 'selectedQuestionIndex',
                        }}
                        fullWidth
                    >
                        {this.state.questions.map((question, index) => {
                            return <MenuItem key={index} value={index}>{question.title}</MenuItem>
                        })}
                    </Select>
                    <TextField
                        id='standart-question'
                        label='question'
                        name='question'
                        multiline
                        value={this.state.questions[this.state.selectedQuestionIndex]?this.state.questions[this.state.selectedQuestionIndex].value:''}
                        fullWidth
                        disabled
                        variant='outlined'
                        margin='normal'
                    />
                    <TextField
                        id="outlined-reply"
                        label="reply"
                        name="reply"
                        value={this.state.reply}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={this.handleReply}>
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

export default Reply;