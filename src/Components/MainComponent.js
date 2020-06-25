import React, {Component} from 'react';
import Homepage from './Homepage';
import WaitingLobby from './WaitingLobby';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Button} from 'reactstrap';
import Cookie from 'js-cookie';
import Ludo from './Ludo';
import Chat from './Chat';

class MainComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Homepage/>
                    </Route>
                    <Route path="/:gamelink">
                    {Cookie.get('start') && Cookie.get('start')==window.location.pathname?<><Ludo/><Chat/></>:<WaitingLobby/>}
                    </Route>

                </Switch>
            </BrowserRouter>
        )
    }
}

export default MainComponent;