import React, {Component} from 'react';
import '../mycss.css'
import LudoLayout from './LudoLayout';
import io from 'socket.io-client';
import Cookie from 'js-cookie';
import API from '../utils/API';

var Sock = null;

class Ludo extends Component{
    constructor(props){
        super(props);
        this.dice = null;
        this.chalArray = ["green", "yellow", "blue", "red"];
        this.currentPlayer = 0;
        this.chalPlayer = this.chalArray[this.currentPlayer];
        this.globalChalCount=0;
        this.chalProcess = false;
        this.nativePosition = {
          g1:"g-1-home",
          g2:"g-2-home",
          g3:"g-3-home",
          g4:"g-4-home",
          b1:"b-1-home",
          b2:"b-2-home",
          b3:"b-3-home",
          b4:"b-4-home",
          r1:"r-1-home",
          r2:"r-2-home",
          r3:"r-3-home",
          r4:"r-4-home",
          y1:"y-1-home",
          y2:"y-2-home",
          y3:"y-3-home",
          y4:"y-4-home"
        }
        this.gotiPosition = {
          g1:["55-g-cell", false],
          g2:["54-g-cell", true],
          g3:["55-g-cell", true],
          g4:["54-g-cell", true],
          b1:["28-b-cell", true],
          b2:["29-b-cell", false],
          b3:["27-b-cell", true],
          b4:["28-b-cell", true],
          r1:["40-r-cell", true],
          r2:["39-r-cell", true],
          r3:["40-r-cell", true],
          r4:["39-r-cell", true],
          y1:["15-y-cell", true],
          y2:["14-y-cell", true],
          y3:["14-y-cell", true],
          y4:["13-y-cell", true]
        }
        this.thisPlayer = 0;
    }

    isSafe = (gotiBlock)=>{
        let classList = gotiBlock.classList;
        for(let i=0;i<classList.length;i++){
            let temp = classList[i];
            if(temp=="safe")return true;
            if(temp=="r-start")return true;
            if(temp=="g-start")return true;
            if(temp=="b-start")return true;
            if(temp=="y-start")return true;
        }
        return false;
    }
    allBlock = (player)=>{
        for(let i=1;i<=4;i++){
            if(this.gotiPosition[player[0]+i][1])return false;
        }
        return true;
    }
    allDone = (player)=>{
        let allDone = true;
        for(let i=1;i<=4;i++){
            if(this.gotiPosition[player + i][0] != "donegotis"){
                allDone = false;
                break;
            }
        }
        if(allDone){
            for(let i=0;i<4;i++){
                if(this.chalArray[i][0]==player){
                    this.chalArray.splice(i, 1);
                    break;
                }
            }
            this.currentPlayer--;
            this.turnChal();
        }
        
    }
    turnChal=()=>{
        let players = this.chalArray.length;
        if(this.currentPlayer>=players-1)this.currentPlayer=0;
        else this.currentPlayer++;
        this.chalPlayer = this.chalArray[this.currentPlayer];
        console.log(this.chalPlayer);
    }
    rollProcess = (chalCount)=>{
      this.globalChalCount = chalCount;
      document.getElementById("diceInfo").innerHTML = this.chalPlayer+" got " + chalCount;
      this.chalProcess = true;
      if(chalCount<6 && this.allBlock(this.chalPlayer)){
          this.chalProcess = false;
          this.turnChal();
          document.getElementById("turnInfo").innerText = this.chalPlayer + " 's turn";
      }
      if(this.chalPlayer=="green")this.chalGreen(chalCount);
      if(this.chalPlayer=="yellow")this.chalYellow(chalCount);
      if(this.chalPlayer=="blue")this.chalBlue(chalCount);
      if(this.chalPlayer=="red")this.chalRed(chalCount);
    }
    makeBlanks =()=>{
      for(let i=0;i<=51;i++){
          let pos = i+"-cell";
          document.getElementById(pos).innerHTML = "";
      }
      for(let i=52;i<=56;i++){
          let pos = i+"-g-cell";
          document.getElementById(pos).innerHTML = "";
      }
      for(let i=13;i<=17;i++){
          let pos = i+"-y-cell";
          document.getElementById(pos).innerHTML = "";
      }
      for(let i=26;i<=30;i++){
          let pos = i+"-b-cell";
          document.getElementById(pos).innerHTML = "";
      }
      for(let i=39;i<=43;i++){
          let pos = i+"-r-cell";
          document.getElementById(pos).innerHTML = "";
      }
      Object.keys(this.gotiPosition).forEach((goti)=>{
          this.gotiPosition[goti][0] = this.nativePosition[goti];
          this.gotiPosition[goti][1] = false;
      })
    }
    updateGotis=()=>{
        Object.keys(this.gotiPosition).forEach((goti)=>{
            this.updateGoti(goti);
        })
    }
    updateGoti = (goti)=>{
        if(this.gotiPosition[goti][0] != "donegotis"){
            if(goti[0]=='g')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkgreen"></div>'
            if(goti[0]=='b')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkblue"></div>'
            if(goti[0]=='r')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkred"></div>'
            if(goti[0]=='y')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="goti darkyellow"></div>'
        }else{
            if(goti[0]=='g')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkgreen"></div>'
            if(goti[0]=='b')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkblue"></div>'
            if(goti[0]=='r')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkred"></div>'
            if(goti[0]=='y')document.getElementById(this.gotiPosition[goti][0]).innerHTML += '<div key="dhol'+goti[1]+'"class="donegoti darkyellow"></div>'       
        }
        document.getElementById("turnInfo").innerHTML = this.chalPlayer + " 's turn";
        document.getElementById("diceInfo").innerHTML = this.chalPlayer+" got: " ;
    }
    kaatDaalo = (gotiBlock, goti)=>{
        let katta = false;
        let parts = gotiBlock.innerHTML.split("goti ");
        let keyparts = gotiBlock.innerHTML.split("dhol");
        for(let i=parts.length-1;i>0;i--){
            let gotiColor = parts[i][4];
            let gotiNum = keyparts[i][0];
            if(gotiColor!=goti[0]){
                katta = true;
                this.gotiPosition[gotiColor+gotiNum][0] = gotiColor+"-"+gotiNum+"-home";
                this.gotiPosition[gotiColor+gotiNum][1] = false;
                gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                this.updateGoti(gotiColor+gotiNum);
            }
        }
        return katta;
    }
    
    doesExist = (gotiBlock, goti)=>{
        let parts = gotiBlock.innerHTML.split("goti ");
        for(let i=1;i<parts.length;i++){
            if(parts[i][4]==goti[0]){
                return true;
            }
        }
        return false;
    }
    
    findAndDelete = (gotiBlock, goti)=>{
        let parts = gotiBlock.innerHTML.split("goti ");
    
        if(goti[0] == 'g'){
            for(let i=1;i<parts.length;i++){
                if(parts[i][4]=='g'){
                    gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                    return;
                }
            }
        }else if(goti[0] == 'r'){
            for(let i=1;i<parts.length;i++){
                if(parts[i][4]=='r'){
                    gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                    return;
                }
            }
        }else if(goti[0] == 'b'){
            for(let i=1;i<parts.length;i++){
                if(parts[i][4]=='b'){
                    gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                    return;
                }
            }
        }else if(goti[0] == 'y'){
            
            for(let i=1;i<parts.length;i++){
                if(parts[i][4]=='y'){
                    console.log("find delete")
                    gotiBlock.removeChild(gotiBlock.childNodes[i-1]);
                    return;
                }
            }
        }
    }
    gchalfProcess = (gotiBlockid, goti, chalCount)=>{
        console.log("aya re");
        let gotiBlock = document.getElementById(gotiBlockid);
        let katta = false;
        let ghar = false;
        if(!gotiBlock || !this.chalProcess || this.chalPlayer !="green")return;
        if(!this.doesExist(gotiBlock, goti))return;
        let prev = this.gotiPosition[goti][0].split('-');
        if(prev.length == 2){
            if(parseInt(prev[0])+chalCount <= 51){
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-cell";
                if(this.isSafe(document.getElementById(newPos+"-cell"))){
                    console.log("safe hai ye to");
                }else{
                    console.log("katega");
                    katta = this.kaatDaalo(document.getElementById(newPos+"-cell"), goti);
                }
            }else{
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-g-cell";                      
            }
        }else{
            if(parseInt(prev[0])+chalCount <= 56){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-g-cell";
            }else if(parseInt(prev[0])+chalCount >= 57){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = "donegotis";
                this.gotiPosition[goti][1] = false;
                console.log("green home"); 
                ghar = true;
                this.allDone(goti[0]);                 
            } 
        }
        if(chalCount!=6 && !katta && !ghar)this.turnChal();
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    gchalsProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        if(gotiBlock == null || this.globalChalCount<6 || this.chalPlayer!="green" || !this.chalProcess)return;
        if(!this.doesExist(gotiBlock, goti))return;
        gotiBlock = this.findAndDelete(gotiBlock, goti);
        this.gotiPosition[goti][0] = "1-cell";
        this.gotiPosition[goti][1] = true;
        
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    
    ychalfProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        let katta = false;
        let ghar = false;
        if(!this.chalProcess || this.chalPlayer!="yellow")return;
        if(!this.doesExist(gotiBlock, goti))return;
        let prev = this.gotiPosition[goti][0].split('-');
        if(prev.length == 2){
            if(parseInt(prev[0])<=12 && parseInt(prev[0])+chalCount>12){
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-y-cell";                      
            }else{
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                if(newPos<=51){
                    this.gotiPosition[goti][0] = newPos+"-cell";
                }
                else{
                    this.gotiPosition[goti][0] = newPos-52+"-cell";
                    newPos = newPos-52;
                }
                if(this.isSafe(document.getElementById(newPos+"-cell"))){
                    console.log("safe hai ye to");
                }else{
                    console.log("katega");
                    katta = this.kaatDaalo(document.getElementById(newPos+"-cell"), goti);
                }
            }
        }else{
            if(parseInt(prev[0])+chalCount <= 17){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-y-cell";
            }else if(parseInt(prev[0])+chalCount >= 18){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = "donegotis";
                this.gotiPosition[goti][1] = false;
                console.log("yellow home");  
                ghar = true;
                this.allDone(goti[0])                
            } 
        }
        if(chalCount!=6 && !katta && !ghar)this.turnChal();
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    ychalsProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        if(gotiBlock == null || this.globalChalCount<6 ||this.chalPlayer!="yellow" || !this.chalProcess)return;
        if(!this.doesExist(gotiBlock, goti))return;
        gotiBlock = this.findAndDelete(gotiBlock, goti);
        this.gotiPosition[goti][0] = "14-cell";
        this.gotiPosition[goti][1] = true;
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    bchalfProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        let katta = false;
        let ghar = false;
        if(!this.chalProcess || this.chalPlayer!="blue")return;
        if(!this.doesExist(gotiBlock, goti))return;
        let prev = this.gotiPosition[goti][0].split('-');
        if(prev.length == 2){
            if(parseInt(prev[0])<=25 && parseInt(prev[0])+chalCount>25){
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-b-cell";                      
            }else{
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                if(newPos<=51){
                    this.gotiPosition[goti][0] = newPos+"-cell";
                }
                else{
                    this.gotiPosition[goti][0] = newPos-52+"-cell";
                    newPos = newPos-52;
                }
                if(this.isSafe(document.getElementById(newPos+"-cell"))){
                    console.log("safe hai ye to");
                }else{
                    console.log("katega");
                    katta = this.kaatDaalo(document.getElementById(newPos+"-cell"), goti);
                }
            }
        }else{
            if(parseInt(prev[0])+chalCount <= 30){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-b-cell";
            }else if(parseInt(prev[0])+chalCount >= 30){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = "donegotis";
                this.gotiPosition[goti][1] = false;
                console.log("blue home");        
                ghar = true;
                this.allDone(goti[0]);          
            } 
        }
        if(chalCount!=6 && !katta && !ghar)this.turnChal();
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    bchalsProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        if(gotiBlock == null || this.globalChalCount<6 ||this.chalPlayer!="blue" || !this.chalProcess)return;
        if(!this.doesExist(gotiBlock, goti))return;
        gotiBlock = this.findAndDelete(gotiBlock, goti);
        this.gotiPosition[goti][0] = "27-cell";
        this.gotiPosition[goti][1] = true;
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    rchalfProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        let katta = false;
        let ghar = false;
        if(!this.chalProcess || this.chalPlayer!="red")return;
        if(!this.doesExist(gotiBlock, goti))return;
        let prev = this.gotiPosition[goti][0].split('-');
        if(prev.length == 2){
            if(parseInt(prev[0])<=38 && parseInt(prev[0])+chalCount>38){
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-r-cell";                      
            }else{
                this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                if(newPos<=51){
                    this.gotiPosition[goti][0] = newPos+"-cell";
                }
                else{
                    this.gotiPosition[goti][0] = newPos-52+"-cell";
                    newPos = newPos-52;
                }
                if(this.isSafe(document.getElementById(newPos+"-cell"))){
                    console.log("safe hai ye to");
                }else{
                    console.log("katega");
                    katta = this.kaatDaalo(document.getElementById(newPos+"-cell"), goti);
                }
            }
        }else{
            if(parseInt(prev[0])+chalCount <= 43){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = newPos+"-r-cell";
            }else if(parseInt(prev[0])+chalCount >= 43){
                gotiBlock = this.findAndDelete(gotiBlock, goti);
                let newPos = parseInt(prev[0])+chalCount;
                this.gotiPosition[goti][0] = "donegotis";
                this.gotiPosition[goti][1] = false;
                console.log("red home");       
                ghar = true;
                this.allDone(goti[0]);           
            } 
        }
        if(chalCount!=6 && !katta && !ghar)this.turnChal();
        this.chalProcess = false;
        this.updateGoti(goti);
        return;
    }
    rchalsProcess = (gotiBlockid, goti, chalCount)=>{
        let gotiBlock = document.getElementById(gotiBlockid);
        if(gotiBlock == null || this.globalChalCount<6 || this.chalPlayer!="red" || !this.chalProcess)return;
        if(!this.doesExist(gotiBlock, goti))return;
        gotiBlock = this.findAndDelete(gotiBlock, goti);
        this.gotiPosition[goti][0] = "40-cell";
        this.gotiPosition[goti][1] = true;
        this.chalProcess = false;
        this.updateGoti(goti);
        return;  
    }
    chalGreen = (chalCount)=>{
        Object.keys(this.gotiPosition).forEach((goti)=>{
            
            if(goti[0]=='g' && this.gotiPosition[goti][1]){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick =()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('gchalf', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
            }else if(goti[0]=='g' && !this.gotiPosition[goti][1] && chalCount==6){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick = ()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('gchals', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
                return;
            }
        })   
    }
    
    chalYellow = (chalCount)=>{
        Object.keys(this.gotiPosition).forEach((goti)=>{
            if(goti[0]=='y' && this.gotiPosition[goti][1]){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick =()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('ychalf', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);  
                }
            }else if(goti[0]=='y' && !this.gotiPosition[goti][1] && chalCount==6){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick =()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('ychals', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]); 
                }
            }
        })   
    }
    
    chalBlue = (chalCount)=>{
        Object.keys(this.gotiPosition).forEach((goti)=>{
            if(goti[0]=='b' && this.gotiPosition[goti][1]){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick = ()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('bchalf', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
            }else if(goti[0]=='b' && !this.gotiPosition[goti][1] && chalCount==6){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick = ()=>{
                    if(this.currentPlayer!=this.thisPlayer)return;
                    Sock.emit('bchals', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
            }
        })   
    }
    
    chalRed = (chalCount)=>{
        Object.keys(this.gotiPosition).forEach((goti)=>{
            if(goti[0]=='r' && this.gotiPosition[goti][1]){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick = ()=>{
                    Sock.emit('rchalf', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
            }else if(goti[0]=='r' && !this.gotiPosition[goti][1] && chalCount==6){
                let gotiBlock = document.getElementById(this.gotiPosition[goti][0]);
                gotiBlock.onclick = ()=>{
                    Sock.emit('rchals', [this.gotiPosition[goti][0], goti, chalCount, window.location.pathname]);
                }
            }
        })   
    }
    getChalCount=(chalCount)=>{
        
        if(this.chalProcess || this.currentPlayer!=this.thisPlayer)return;
        var body = {
            chalCount:chalCount,
            link:window.location.pathname
        }
        Sock.emit('roll', body);
        
    }
    componentDidMount=()=>{
        this.thisPlayer = JSON.parse(Cookie.get('player')).id;
        Sock = io("http://ludoqueer.herokuapp.com/");
        Sock.emit('joinroom', window.location.pathname);
        document.getElementById("playerinfo").innerHTML = "you are " + this.chalArray[this.thisPlayer];
        this.chalArray.length = Cookie.get('players');
        this.makeBlanks();
        this.updateGotis();
        API.post('/getplayers', {link:window.location.pathname}).then((data)=>{
            var numPlayers = data.data.length;
            for(var i=0;i<numPlayers;i++){
                if(data.data[i].id==0){
                    document.getElementById("gplayername").innerHTML = data.data[i].username;
                }
                if(data.data[i].id==1){
                    document.getElementById("yplayername").innerHTML = data.data[i].username;
                }
                if(data.data[i].id==2){
                    document.getElementById("bplayername").innerHTML = data.data[i].username;
                }
                if(data.data[i].id==3){
                    document.getElementById("rplayername").innerHTML = data.data[i].username;
                }  
            }
            
        })
    
        Sock.on('roll', (msg)=>{
            console.log(msg);
            this.rollProcess(msg.chalCount);
        })
        Sock.on('gchalf', (msg)=>{
            this.gchalfProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('gchals', (msg)=>{
            this.gchalsProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('bchalf', (msg)=>{
            this.bchalfProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('bchals', (msg)=>{
            this.bchalsProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('ychalf', (msg)=>{
            this.ychalfProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('ychals', (msg)=>{
            this.ychalsProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('rchalf', (msg)=>{
            this.rchalfProcess(msg[0], msg[1], msg[2]);
        })
        Sock.on('rchals', (msg)=>{
            this.rchalsProcess(msg[0], msg[1], msg[2]);
        })
    }
    
    render(){
        return <LudoLayout dicefunc={this.getChalCount}/>;
    }
}

export default Ludo;