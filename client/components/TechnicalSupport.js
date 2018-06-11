import React, {Component} from 'react';
import { Container, Form, Popup, Button, Header, Image, Modal,Grid } from 'semantic-ui-react'
import ReactDOM from "react-dom";
import '../css/login.css'
import axios from "axios/index";

/**
 * The public members incorporated to assist with technical support.
 * @type {{open: boolean, status: string, message: string}}
 */
let initialState = {
    open: false,
    status: "default",
    message:""
};

/**
 * The TechnicalSupport class is used to accomplish technical support functionality for users in need to support.
 * @extends {Component}
 */
class TechnicalSupport extends Component {

    /**
     * The constructor passes a props object which is a react component that can be modified for use.
     * @param {Object} props=react_component - a react component that can be modified
     */
    constructor(props) {
        super(props);

        /**
         * State is susceptible to change and variability for react components.
         * @type {{open: boolean, status: string, message: string}}
         */
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * The handleSubmit method is used for when an email request is submitted.
     * @type {Method}
     */
    handleSubmit(){
        //TODO: send message to backend
        this.setState({status: "default"});
        axios.post('/api/sendEmail', {content: this.state.message}).then((response)=> {
            alert("Success!");
            this.setState({open: false});
        });
    }

    /**
     * The render method invokes the formatted technical support window so that the user can interact the page
     * to request support or submit an email form for support.
     * @returns {*} - invokes the formatted technical support page
     * @type {Method}
     */
    render() {
        var body;
        var button;
        if(this.state.status==="default"){
            button=(
                <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
            );
            body= (
                <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <img src='/assets/contacticon.png' onClick={()=>this.setState({status: "email"})}/>
                    </Grid.Column>
                    <Grid.Column>
                        <img src='/assets/image/faq.jpg' onClick={()=>this.setState({status: "FAQ"})} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            );
        }
        else if(this.state.status==="email"){
            body=(
                <Form size='huge'>
                    <Form.TextArea fluid placeholder='Type in your message here'
                        onChange={(e, {value})=> this.setState({message: value})}
                    />
                    <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
                    <Button positive icon='checkmark' content="Submit" labelPosition='right' onClick={this.handleSubmit}/>
                </Form>
            );
        }else if(this.state.status==="FAQ"){
            button=(
                <Button color='black' icon='undo' content="Close" labelPosition='right' onClick={()=> {this.setState({status: "default"}),this.props.onClose()}} />
            );
            body=(
                <div>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                    <br/>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                    <br/>
                    Q:blablabla<br/>
                    A:blablabla<br/>
                </div>
            );
        }
        return (
            <div>
                <Modal size='small' className="scrolling" style={{height: '60%'}} dimmer="blurring"
                       open={this.props.open} onClose={()=> {this.props.onClose()}}>
                    <Modal.Header as='h2' style={{textAlign: 'center'}}>Technical Supports</Modal.Header>
                    {body}
                    <Modal.Actions>
                        {button}
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
export default TechnicalSupport;