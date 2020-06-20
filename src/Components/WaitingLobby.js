import React, {Component} from 'react';
import API from '../utils/API';
import Sock from '../utils/Sock';
import {Form, Input, Button} from 'reactstrap';
import Cookie from 'js-cookie';


class WaitingLobby extends Component{
    constructor(props){
        super(props);
        this.state = {
            players:[{username:"null", id:"null"}]
        }
    }
    
    componentDidMount=()=>{
        Sock.emit('joinroom', window.location.pathname);
        const requestBody = {
            link : window.location.pathname
        }
        API.post('/getplayers', requestBody).then((data)=>{
            console.log(data.data);
            Cookie.set('players', data.data.length);
            this.setState({players:data.data});
        })
    }

    handleForm=(e)=>{
        e.preventDefault();
        const username = e.target.username.value;
        const requestBody = {
            link:window.location.pathname,
            username:username,
            admin:false,
            id:"5674546"
        }
        API.post('/addplayer', requestBody).then((blah)=>{
            var cookieBody = {
                username:blah.data.username,
                admin:blah.data.admin,
                id:blah.data.id,
                link:window.location.pathname
            }
            Cookie.set('player', cookieBody);
            Sock.emit('join', cookieBody);
        });
    }
    startgame =()=>{
        Sock.emit('start', window.location.pathname);
    }
    render(){
        var startButton = <h4>only Player 1 can start the game</h4>;
        if(Cookie.get('player') && JSON.parse(Cookie.get('player')).link == window.location.pathname &&
            JSON.parse(Cookie.get('player')).admin){
                startButton=<Button onClick={this.startgame} color="info">Start Game</Button>
        }
        const playerList = (
            this.state.players.map((player)=>{
                return(
                    <h4 key={player.id}> {player.username}</h4>
                )
            })
        )
        const comp = (
            <div class="container">
                <h2>Waiting Lobby</h2>
                {playerList}
                {startButton}
            </div>
        )
        const playerForm = (
            <Form onSubmit={this.handleForm}>
                <Input name="username" placeholder="Enter your name"></Input>
                <Button color="info">Continue</Button>
            </Form>
        );
        if(!Cookie.get('player') || JSON.parse(Cookie.get('player')).link != window.location.pathname){
            return playerForm;
        }else{
            console.log(JSON.parse(Cookie.get('player')).username);
            return comp;
        }
    }
}
export default WaitingLobby;