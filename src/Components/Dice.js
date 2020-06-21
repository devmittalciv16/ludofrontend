import React, {Component} from 'react';
import '../mycss.css';
import {Col, Row} from 'reactstrap';

let interval = null;
class Dice extends Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.last = "1"
        this.rolltime = 0;
    }
    myfunc=()=>{
        let chalCount = (parseInt(10000*Math.random()))%6+1;
        document.getElementById(this.last).style.display="none";
        document.getElementById(chalCount).style.display="inline";
        this.last = chalCount;
        this.rolltime += 1;
        if(this.rolltime>8){
            clearInterval(interval);
            this.rolltime = 0
            this.props.dicefunc(chalCount);
            
            this.last = chalCount;
        }
    }
    diceClick=()=>{
        let chalCount = (parseInt(10000*Math.random()))%6+1;
        this.props.dicefunc(chalCount);
    }
    render(){
        const comp = (
            <Row className="">
                <Col className="die justify-content-center" onClick={this.diceClick}>
                    <p id="1" className="dieface" style={{display:"inline-block"}}>&#x2680;</p>
                    <p id="2" className="dieface">&#9857;</p>
                    <p id="3" className="dieface">&#9858;</p>
                    <p id="4" className="dieface">&#9859;</p>
                    <p id="5" className="dieface">&#9860;</p>
                    <p id="6" className="dieface">&#9861;</p>
                </Col>
            </Row>
        )
        return <h3 onClick={this.diceClick}>Roll</h3>;
    }
}

export default Dice;