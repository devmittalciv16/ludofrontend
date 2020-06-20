import React, {Component} from 'react';
import {Button, Input, Form} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import API from '../utils/API';
import Context from '../utils/Context';
import Cookie from 'js-cookie';

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicked : false,
            redirect:null
        }
    }
    handleMake=(e)=>{
        this.setState({clicked:true});
    }
    handleForm=(e)=>{
        e.preventDefault();
        let gamelink = "";
        for(let i=0;i<6;i++){
            let randnum = Math.floor(Math.random()*10000)%20+66;
            gamelink += String.fromCharCode(randnum);
        }   
        const username = e.target.username.value;
        const requestBody = {
            link:"/"+gamelink,
            username:username,
            admin:true,
            id:0
        }
        API.post('/newgame', requestBody).then((blah)=>{
            Cookie.set('player', {username:username, admin:true, id:0, link:"/"+gamelink});
            
            this.setState({redirect:gamelink});
        });
    }
    render(){
        const comp = (
            <Button onClick={this.handleMake} color="info">Make game</Button>
        );
        const comp1 = (
            <Form onSubmit={this.handleForm}>
                <Input name="username" placeholder="Enter your name"></Input>
                <Button color="info">Continue</Button>
            </Form>
        );
        if(this.state.redirect)return <Redirect to={this.state.redirect}/>
        if(!this.state.clicked)return comp;
        else return comp1;
    }

}

export default Homepage;