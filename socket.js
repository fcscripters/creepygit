var server = require('./server.js');
var io = require('socket.io')(server);

io.on('connection', manageConnection);

function manageConnection(socket) {
  console.log('connected back to front for  a user');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
}
