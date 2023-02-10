const express = require("express");
// var cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
// app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

io.on("connection", (socket) => {
  // with every request, there should a unit, passcode, loginAs received by server
  // initial orders
  // 
  console.log('server connected');

  socket.emit('hello', "world");

  socket.on("initial orders", (loginInfo, orders) => {
    socket.broadcast.emit("initial orders", loginInfo, orders);
  });

  socket.on("message", (loginInfo, message) => {
    socket.broadcast.emit("message", loginInfo, message);
  });
  
  socket.on("correction", (loginInfo, correction) => {
    socket.broadcast.emit("correction", loginInfo, correction);
  });
  
  socket.on("ffe", (loginInfo, ffe) => {
    socket.broadcast.emit("ffe", loginInfo, ffe);
  });
  
  socket.on("actions", (loginInfo, actions) => {
    socket.broadcast.emit("actions", loginInfo, actions);
  });


});


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

// module.exports = app;