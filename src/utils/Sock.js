import io from 'socket.io-client';

import Cookie from 'js-cookie';
var Sock = io("http://ludoqueer.herokuapp.com/");

Sock.on('join', (msg)=>{
    window.location.reload();
})

Sock.on('start', (msg)=>{
    console.log("start aaya");
    Cookie.set('start', msg);
    window.location.reload();
})

export default Sock;