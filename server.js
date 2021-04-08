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
	console.log(`Dinleniyor.. ${port}`)
});



oyuncular=[];
socketio.on("down",(data)=>{
    console.log(data);
})
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
        c:random_rgba(),
        LEFT:null,
        UP:null,
        RIGHT:null,
        DOWN:null
    };

    oyuncular.push(data);
    socketio.emit("AllPlayer",oyuncular);
    var index=null;

    socket.on("down",data=>{
        for (var i = 0; i < oyuncular.length; i++) {
            if (data.id == oyuncular[i].id) {
                index = i;
            }
        }
        if (data.key == "W" || data.key == "w"|| data.key == "ArrowUp") {
            oyuncular[index].UP=true;
        }
    
        if (data.key == "S" || data.key == "s"|| data.key == "ArrowDown") {
            oyuncular[index].DOWN=true;
        }
    
        if (data.key == "A" || data.key == "a"|| data.key == "ArrowLeft") {
            oyuncular[index].LEFT=true;
        }
    
        if (data.key == "D" || data.key == "d"|| data.key == "ArrowRight") {
            oyuncular[index].RIGHT=true;
        }
    });

    socket.on("up",data=>{
        for (var i = 0; i < oyuncular.length; i++) {
            if (data.id == oyuncular[i].id) {
                index = i;
            }
        }
        if (data.key == "W" || data.key == "w"|| data.key == "ArrowUp") {
          oyuncular[index].UP=false;
        }
  
        if (data.key == "S" || data.key == "s"|| data.key == "ArrowDown") {
            oyuncular[index].DOWN=false;
        }
  
        if (data.key == "A" || data.key == "a"|| data.key == "ArrowLeft") {
            oyuncular[index].LEFT=false;
        }
  
        if (data.key == "D" || data.key == "d"|| data.key == "ArrowRight") {
            oyuncular[index].RIGHT=false;
        }
    });

    socket.on("move",data=>{
        for (var i = 0; i < oyuncular.length; i++) {
            if (data.id == oyuncular[i].id) {
                index = i;
            }
        }

        if( oyuncular[index].LEFT){
            oyuncular[index].x=oyuncular[index].x-5;
        }
        if( oyuncular[index].UP){
            oyuncular[index].y=oyuncular[index].y-5;
        }
        if( oyuncular[index].RIGHT){
            oyuncular[index].x=oyuncular[index].x+5;
        }
        if( oyuncular[index].DOWN){
            oyuncular[index].y=oyuncular[index].y+5;
        }
        // console.log(oyuncular[index]);
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

})