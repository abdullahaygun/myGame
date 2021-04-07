const express = require('express')
const app = require('express')()
const port = process.env.PORT || 3000
const http = require('http').Server(app)
const socketio = require('socket.io')(http)
app.use(express.static(__dirname + '/dist'))
app.get(/.*/, (req, res) => {
	res.sendFile(__dirname + '/dist/index.html')
})
http.listen(port, () => {
	console.log(`Listening on port ${port}`)
});



oyuncular=[];

socketio.on("connection", socket=>{
    console.log("Biri bağlandı."+socket.id);
    
    function random_rgba() {
        var o = Math.round,
          r = Math.random,
          s = 255;
        return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
      };
        function randomSayi(min,max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    
        let data={
            id:socket.id,
            x:randomSayi(30,580),
            y:randomSayi(30,580),
            gen:25,
            c:random_rgba()
        };
        oyuncular.push(data);
        socketio.emit("AllPlayer",oyuncular);

        socket.on("pos",(data)=>{
            oyuncular=data;
            socketio.emit("AllPlayer",oyuncular);
        })


        socket.on("disconnecting",()=>{
        console.log("Kullanıcı çıktı", socket.id);
        for(var i = 0; i<oyuncular.length; i++){
            if (socket.id == oyuncular[i].id){
                oyuncular.splice(i, 1);
            }
        }
        socketio.emit("AllPlayer",oyuncular);
        });
    
    });




