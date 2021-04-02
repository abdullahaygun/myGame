// const express=require("express");
// const http=require("http").Server(express);
// const port = process.env.PORT || 3000
// const socketio=require("socket.io")(http,{
//     cors: {
//         //  origin: "http://localhost:8080",
//         origin: '*',
         
//         credentials: true
//       }
// });

// http.listen(port,()=>{
//     console.log("port dinleniyor..");
// });

const express = require('express')
const app = require('express')()
const port = process.env.PORT || 3000
const http = require('http').Server(app)
const socketio = require('socket.io')(http)

/*
 *  Serve /dist/ folder
 */
app.use(express.static(__dirname + '/dist'))
app.get(/.*/, (req, res) => {
	res.sendFile(__dirname + '/dist/index.html')
})

http.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

// socketio.on("connection",socket=>{
// console.log("Biri bağlandıı"+socket.id);

// socketio.emit("deneme","Merhaba Dünya");
// })

//asdsd

clients=[]

socketio.on("connection", socket=>{
    function RandomSayiUret(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s)+')';
    }

    let position={
        x:RandomSayiUret(0,600),
        y:RandomSayiUret(0,600),
        gen:25,
    };
    let data={
        id:socket.id,
        x:position.x,
        y:position.y,
        h:position.gen,
        w:position.gen,
        c:random_rgba()
    };
    console.log("Biri bağlandı."+socket.id);
    
    clients.push(data);

    socketio.emit("sockets",clients);


    socket.on("disconnecting",()=>{
        console.log("Kullanıcı çıktı", socket.id);
       let exitSocket= clients.findIndex(elem =>{elem.socket === socket.id});
         clients.splice(exitSocket, 1);
         socketio.emit("sockets",clients);
    })
});

