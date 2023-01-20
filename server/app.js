const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const PORT = 5000;

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
    
});

io.on("connection", (socket) =>{
  console.log("Connected :" + socket.id);

  socket.on("message_send", (data)=> {
    console.log(data);
    io.emit("message_receive", data);
  })

  socket.on('disconnect', ()=>{
    console.log("client has disconnected: " + socket.id);
  });

});


server.listen(PORT, () => console.log("Server running in PORT: "+PORT));