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


clients=[]

socketio.on("connection", socket=>{
    console.log("Biri bağlandı."+socket.id);
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
    
  
    clients.push(data);
    socketio.emit("sockets",clients);

    socket.on("position",data=>{
        for (var i = 0; i < clients.length; i++) {
            if (data[2] == clients[i].id) {
              
                clients[i].x=data[0];
                clients[i].y=data[1];
                socketio.emit("sockets",clients);
                console.log(clients[i].x+" : "+clients[i].y+" : "+clients[i].id);
            }
          }
    })
    


    socket.on("disconnecting",()=>{
        console.log("Kullanıcı çıktı", socket.id);
       for(var i = 0; i<clients.length; i++){
        if (socket.id == clients[i].id){
            clients.splice(i, 1);
        }
       }
         socketio.emit("sockets",clients);
    })
    
});
