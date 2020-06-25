import React, {Component} from 'react';
import Cookie from 'js-cookie';
import io from 'socket.io-client';
import {Row, Col, Form, Input, FormGroup, Button} from 'reactstrap';

var Sock = null;
var chats = null;

class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"null"
        }
        this.message = React.createRef();
        
    }
    handleMessage=(e)=>{
        var message = this.message.current.value;
        this.message.current.value = "";
        var pathname = window.location.pathname;
        var temp = {
            "pathname":pathname,
            "username":this.state.username,
            "message":message
        }
        
        Sock.emit('chat', temp)
    }

    componentDidMount=()=>{
        this.setState({username:JSON.parse(Cookie.get('player')).username})
        Sock = io("http://ludoqueer.herokuapp.com/");
        Sock.emit('joinroom', window.location.pathname);
        chats = document.getElementById("chats");
        Sock.on('chat', (msg)=>{
            console.log("messages");
            var name = msg.username;
            var message = msg.message;
            chats.innerHTML += "<li class='message-class '><strong>"+name +"</strong> : "+message+"</li>"
            if(document.getElementById("chats").childElementCount>5){
                document.getElementById("chats").removeChild(document.getElementById("chats").childNodes[0]);
            }
        })

    }
    render(){
        const chatForm = (
            <div className="container">
                <Row className="justify-content-center">
                    <Col xs="10" sm="6">
                        <ul className="list-class" id="chats">
                        </ul>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="10" sm="6" className="text-center">
                        <Row className="justify-content-center">
                        <Col xs="12">
                            <FormGroup>
                                <Input classname="" innerRef={this.message} type="text" placeholder="type message">
                                </Input>
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row className="justify-content-center ">
                        <Col xs={{size:2}} className="align-items-center">
                            <Button color="info" className="button-class" onClick={this.handleMessage} >Send</Button>
                        </Col>
                        </Row>
                            

                        
                    </Col>
                </Row>
                

            </div>
        )
        return chatForm;
    }
}
export default Chat;