import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainComponent from './Components/MainComponent';
import Dice from './Components/Dice';
import Ludo from './Components/Ludo'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      admin : false,
      userEntered: false
    }
  }
  
  render(){
    return(
      <MainComponent/>
    )
  }
}

export default App;
