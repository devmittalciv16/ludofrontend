import React, {Component} from 'react';
import '../mycss.css'
import Dice from './Dice';

class LudoLayout extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const LudoLayout = (
            <>
            <div className="game">
              <div className="house green">
                <div className="box">
                  <div id="g-1-home" className="homegoti square square-one green" />
                  <div id="g-2-home" className="homegoti square square-two green" />
                  <div id="g-3-home" className="homegoti square square-three green" />
                  <div id="g-4-home" className="homegoti square square-four green" />
                  <p id="gplayername" className="playername"></p>
                </div>
              </div>
              <div className="house yellow" style={{ right: 0 }}>
                
                <div className="box">
                  <div id="y-1-home" className="homegoti square square-one yellow" />
                  <div id="y-2-home" className="homegoti square square-two yellow" />
                  <div id="y-3-home" className="homegoti square square-three yellow" />
                  <div id="y-4-home" className="homegoti square square-four yellow" />
                  <p id="yplayername" className="playername"></p>
                </div>
              </div>
              <div className="house red" style={{ bottom: 0 }}>
                <div className="box">
                  <div id="r-1-home" className="homegoti square square-one red" />
                  <div id="r-2-home" className="homegoti square square-two red" />
                  <div id="r-3-home" className="homegoti square square-three red" />
                  <div id="r-4-home" className="homegoti square square-four red" />
                  <p id="rplayername" className="playername"></p>
                </div>
              </div>
              <div className="house blue" style={{ bottom: 0, right: 0 }}>
                <div className="box">
                  <div id="b-1-home" className="homegoti square square-one blue" />
                  <div id="b-2-home" className="homegoti square square-two blue" />
                  <div id="b-3-home" className="homegoti square square-three blue" />
                  <div id="b-4-home" className="homegoti square square-four blue" />
                  <p id="bplayername" className="playername"></p>
                </div>
              </div>
              <div id="dice" className="home">
                <Dice dicefunc={this.props.dicefunc}/>
              </div>
              <div id="0-cell" className="cells" style={{ top: "40%" }}>
                0
              </div>
              <div
                id="1-cell"
                className="cells g-start"
                style={{ top: "40%", left: "6.66%" }}
              >
                1
              </div>
              <div id="2-cell" className="cells" style={{ top: "40%", left: "13.32%" }}>
        
              </div>
              <div id="3-cell" className="cells" style={{ top: "40%", left: "19.98%" }}>
                
              </div>
              <div id="4-cell" className="cells" style={{ top: "40%", left: "26.64%" }}>
                
              </div>
              <div id="5-cell" className="cells" style={{ top: "40%", left: "33.3%" }}>
                
              </div>
              <div id="11-cell" className="cells" style={{ top: 0, left: "40%" }}>
                
              </div>
              <div id="10-cell" className="cells" style={{ top: "6.66%", left: "40%" }}>
                
              </div>
              <div
                id="9-cell"
                className="cells safe"
                style={{ top: "13.32%", left: "40%" }}
              >
                
              </div>
              <div id="8-cell" className="cells" style={{ top: "19.98%", left: "40%" }}>
                
              </div>
              <div id="7-cell" className="cells" style={{ top: "26.64%", left: "40%" }}>
                
              </div>
              <div id="6-cell" className="cells" style={{ top: "33.3%", left: "40%" }}>
                
              </div>
              <div id="12-cell" className="cells" style={{ top: 0, left: "46.66%" }}>
                
              </div>
              <div
                id="13-y-cell"
                className="cells yellow"
                style={{ top: "6.66%", left: "46.66%" }}
              >
                
              </div>
              <div
                id="14-y-cell"
                className="cells yellow"
                style={{ top: "13.32%", left: "46.66%" }}
              >
                
              </div>
              <div
                id="15-y-cell"
                className="cells yellow"
                style={{ top: "19.98%", left: "46.66%" }}
              >
                
              </div>
              <div
                id="16-y-cell"
                className="cells yellow"
                style={{ top: "26.64%", left: "46.66%" }}
              >
                
              </div>
              <div
                id="17-y-cell"
                className="cells yellow"
                style={{ top: "33.3%", left: "46.66%" }}
              >
              
              </div>
              <div id="13-cell" className="cells" style={{ top: 0, left: "53.32%" }}>
              
              </div>
              <div
                id="14-cell"
                className="cells y-start"
                style={{ top: "6.66%", left: "53.32%" }}
              >
              
              </div>
              <div id="15-cell" className="cells" style={{ top: "13.32%", left: "53.32%" }}>
                
              </div>
              <div id="16-cell" className="cells" style={{ top: "19.98%", left: "53.32%" }}>
                
              </div>
              <div id="17-cell" className="cells" style={{ top: "26.64%", left: "53.32%" }}>
                
              </div>
              <div id="18-cell" className="cells" style={{ top: "33.3%", left: "53.32%" }}>
                
              </div>
              <div id="19-cell" className="cells" style={{ top: "40%", right: "33.3%" }}>
              
              </div>
              <div id="20-cell" className="cells" style={{ top: "40%", right: "26.64%" }}>
                
              </div>
              <div id="21-cell" className="cells" style={{ top: "40%", right: "19.98%" }}>
                
              </div>
              <div
                id="22-cell"
                className="cells safe"
                style={{ top: "40%", right: "13.32%" }}
              >
                22
              </div>
              <div id="23-cell" className="cells" style={{ top: "40%", right: "6.66%" }}>
                23
              </div>
              <div id="24-cell" className="cells" style={{ top: "40%", right: 0 }}>
                24
              </div>
              <div
                id="30-b-cell"
                className="cells blue"
                style={{ top: "46.66%", right: "33.3%" }}
              >
                30-b
              </div>
              <div
                id="29-b-cell"
                className="cells blue"
                style={{ top: "46.66%", right: "26.64%" }}
              >
                29-b
              </div>
              <div
                id="28-b-cell"
                className="cells blue"
                style={{ top: "46.66%", right: "19.98%" }}
              >
                28-b
              </div>
              <div
                id="27-b-cell"
                className="cells blue"
                style={{ top: "46.66%", right: "13.32%" }}
              >
                27-b
              </div>
              <div
                id="26-b-cell"
                className="cells blue"
                style={{ top: "46.66%", right: "6.66%" }}
              >
                26-b
              </div>
              <div id="25-cell" className="cells" style={{ top: "46.66%", right: 0 }}>
                25
              </div>
              <div id="31-cell" className="cells" style={{ top: "53.32%", right: "33.3%" }}>
                31
              </div>
              <div
                id="30-cell"
                className="cells"
                style={{ top: "53.32%", right: "26.64%" }}
              >
                30
              </div>
              <div
                id="29-cell"
                className="cells"
                style={{ top: "53.32%", right: "19.98%" }}
              >
                29
              </div>
              <div
                id="28-cell"
                className="cells"
                style={{ top: "53.32%", right: "13.32%" }}
              >
                28
              </div>
              <div
                id="27-cell"
                className="cells b-start"
                style={{ top: "53.32%", right: "6.66%" }}
              >
                27
              </div>
              <div id="26-cell" className="cells" style={{ top: "53.32%", right: 0 }}>
                26
              </div>
              <div id="37-cell" className="cells" style={{ bottom: 0, left: "53.32%" }}>
                37
              </div>
              <div
                id="36-cell"
                className="cells"
                style={{ bottom: "6.66%", left: "53.32%" }}
              >
                36
              </div>
              <div
                id="35-cell"
                className="cells safe"
                style={{ bottom: "13.32%", left: "53.32%" }}
              >
                35
              </div>
              <div
                id="34-cell"
                className="cells"
                style={{ bottom: "19.98%", left: "53.32%" }}
              >
                34
              </div>
              <div
                id="33-cell"
                className="cells"
                style={{ bottom: "26.64%", left: "53.32%" }}
              >
                33
              </div>
              <div
                id="32-cell"
                className="cells"
                style={{ bottom: "33.3%", left: "53.32%" }}
              >
                32
              </div>
              <div id="38-cell" className="cells" style={{ bottom: 0, left: "46.66%" }}>
                38
              </div>
              <div
                id="39-r-cell"
                className="cells red "
                style={{ bottom: "6.66%", left: "46.66%" }}
              >
                39-r
              </div>
              <div
                id="40-r-cell"
                className="cells red"
                style={{ bottom: "13.32%", left: "46.66%" }}
              >
                40-r
              </div>
              <div
                id="41-r-cell"
                className="cells red"
                style={{ bottom: "19.98%", left: "46.66%" }}
              >
                41-r
              </div>
              <div
                id="42-r-cell"
                className="cells red"
                style={{ bottom: "26.64%", left: "46.66%" }}
              >
                42-r
              </div>
              <div
                id="43-r-cell"
                className="cells red"
                style={{ bottom: "33.3%", left: "46.66%" }}
              >
                43-r
              </div>
              <div id="39-cell" className="cells" style={{ bottom: 0, left: "40%" }}>
                39
              </div>
              <div
                id="40-cell"
                className="cells r-start"
                style={{ bottom: "6.66%", left: "40%" }}
              >
                40
              </div>
              <div id="41-cell" className="cells" style={{ bottom: "13.32%", left: "40%" }}>
                41
              </div>
              <div id="42-cell" className="cells" style={{ bottom: "19.98%", left: "40%" }}>
                42
              </div>
              <div id="43-cell" className="cells" style={{ bottom: "26.64%", left: "40%" }}>
                43
              </div>
              <div id="44-cell" className="cells" style={{ bottom: "33.3%", left: "40%" }}>
                44
              </div>
              <div id="45-cell" className="cells" style={{ top: "53.32%", left: "33.3%" }}>
                45
              </div>
              <div id="46-cell" className="cells" style={{ top: "53.32%", left: "26.64%" }}>
                46
              </div>
              <div id="47-cell" className="cells" style={{ top: "53.32%", left: "19.98%" }}>
                47
              </div>
              <div
                id="48-cell"
                className="cells safe"
                style={{ top: "53.32%", left: "13.32%" }}
              >
                48
              </div>
              <div id="49-cell" className="cells" style={{ top: "53.32%", left: "6.66%" }}>
                49
              </div>
              <div id="50-cell" className="cells" style={{ top: "53.32%", left: 0 }}>
                50
              </div>
              <div
                id="56-g-cell"
                className="cells green"
                style={{ top: "46.66%", left: "33.3%" }}
              >
                56-g
              </div>
              <div
                id="55-g-cell"
                className="cells green"
                style={{ top: "46.66%", left: "26.64%" }}
              >
                55-g
              </div>
              <div
                id="54-g-cell"
                className="cells green"
                style={{ top: "46.66%", left: "19.98%" }}
              >
                54-g
              </div>
              <div
                id="53-g-cell"
                className="cells green"
                style={{ top: "46.66%", left: "13.32%" }}
              >
                53-g
              </div>
              <div
                id="52-g-cell"
                className="cells green"
                style={{ top: "46.66%", left: "6.66%" }}
              >
                52-g
              </div>
              <div id="51-cell" className="cells" style={{ top: "46.66%", left: 0 }}>
                51
              </div>
            </div>

            <div>
            <div className="info">
                <div style={{display:"none"}} id="playerinfo"></div>
                <div id="turnInfo" />
                <div id="diceInfo" />
            </div>
            <div style={{display:"none"}} className="gotibox">
                <div className="gotilabel">Gotis in home</div>
                <div id="donegotis" className="donegotis" />
            </div>
            </div>
        </>
        )
        return LudoLayout;
    }
}

export default LudoLayout;
