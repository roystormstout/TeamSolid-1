import React, { Component } from 'react'
import { Container, Form, Popup, Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from "axios/index";
import App from './App';

let initialState = {
    username: "",
    password: "",
    repeat: "",
    email: "",
    message: [],
    open: false,
    dimmer: 'blurring'
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirPage = this.redirPage.bind(this);
    }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open, dimmer: false })

    handleSubmit = (event) => {
        let message = [];
        if(this.state.username === "") {
            alert("Username can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.password === "") {
            alert("Password can't be empty!");
            this.setState({message: message});
            return
        }
        if(this.state.repeat === "") {
            alert("Please enter your password again!");
            this.setState({message: message});
            return
        }
        if(this.state.password !== this.state.repeat) {
            alert("Password is not matching!");
            this.setState({message: message});
            return
        }
        axios.post(`/api/signup`, {username: this.state.username, password: this.state.password, email: this.state.email}).then((response)=> this.redirPage(response));
        this.setState({open: false});
        this.setState({dimmer: false});
    };
    redirPage(response) {
            if(JSON.parse(response.data).result==="OK"){
                this.props.onclose();
            }else{
                alert("Signup fail!");
            }
    }
    render() {
        const { dimmer } = this.state

            return (
                <div>
                    <Modal size='tiny' className="scrolling" style={{height: '60%'}} dimmer={dimmer}
                           open={this.props.open} onClose={()=> {this.setState(initialState); this.props.onClose()}}>
                        <Modal.Header as='h2' style={{textAlign: 'center'}}>Sign Up</Modal.Header>
                        <Container style={{width: '400px', marginTop: '2em', marginBottom: 'auto'}}>
                            <Form size='large'>
                                <Form.Input
                                    fluid icon='user' iconPosition='left' placeholder='Username'
                                    onChange={(e, {value})=> this.setState({username: value})}
                                />
                                <Form.Input
                                    fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                                    onChange={(e, {value})=> this.setState({password: value})}
                                />
                                <Form.Input
                                    fluid icon='ellipsis horizontal' iconPosition='left' placeholder='Repeat Password' type='password'
                                    onChange={(e, {value})=> this.setState({repeat: value})}
                                />
                                <Form.Input
                                    fluid icon='envelope' iconPosition='left' placeholder='Email'
                                    onChange={(e, {value})=> this.setState({email: value})}
                                />
                            </Form>
                        </Container>
                        <Modal.Actions>
                            <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.close(); this.props.onClose()}} />
                            <Button positive icon='checkmark' labelPosition='right' content="Sign Up" onClick={()=> {this.handleSubmit(); this.props.onClose(); }} />
                        </Modal.Actions>
                    </Modal>
                </div>
            )
    }
}

export default Signup