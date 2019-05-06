import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToastMessage from '../components/ToastMessage';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

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
            if (notice === '' || notice_title === '')
                throw Error('빈칸을 채워주세요');         
            const res = await fetch('http://api.gamepicker.co.kr/posts', {
                headers: {
                    'authorization': process.env.REACT_APP_AUTHORIZATION,
                    'content-type': 'application/json',
                    'x-access-token': token
                },
                method: 'post',
                body: JSON.stringify({
                    title: notice_title,
                    value: notice,
                    category: 'news'
                })
            });
            if (res.ok) {
                this.setState({
                    notice: '',
                    notice_title: ''
                });
                this.handleToastMessage('작성 완료');
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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditor = (data) => {
        this.setState({ notice: data });
    }
    modules = {
        toolbar: {
            container: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                        {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video']
            ],
            // container:  [['bold', 'italic', 'underline', 'blockquote'],
            // [{'list': 'ordered'}, {'list': 'bullet'}],
            // ['formula','link', 'image'],
            // ['clean']],
            // handlers: { 'image' : this.handleImage }
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        //imageDrop: true, // imageDrop 등록
        // imageResize: {} // imageResize 등록
    }
    render() {
        return (
            <section className='notice content'>
                <form>
                    <TextField
                        id="outlined-notice-title"
                        label="News Title"
                        name="notice_title"
                        value={this.state.notice_title}
                        onChange={this.handleChange}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <ReactQuill
                        value = {this.state.notice}
                        onChange = {this.handleEditor}
                        modules = {this.modules}
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