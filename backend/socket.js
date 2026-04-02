const { Server } = require('socket.io');

function setupSocketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
      socket.on('create-lobby', () => {
        console.log('Lobby created with ID: ' + socket.id);
        socket.join(socket.id);
        socket.emit('lobby-joined', { lobbyId: socket.id });
      })

      socket.on('join-lobby', (data) => {
        if (io.sockets.adapter.rooms.has(data.lobbyId)) {
          socket.join(data.lobbyId);
          socket.emit('lobby-joined', { lobbyId: data.lobbyId });
        } else {
          socket.emit('lobby-not-found');
        }
      })

      socket.on('send-message', (usr, msg, room) => {
        console.log('Message received: ' + msg + ' in room: ' + room + ' from user: ' + usr);
        io.to(room).emit('receive-message', { 'username': usr, 'message': msg });
      })

      socket.on('get-racers', (lobbyId, callback) => {
        const room = io.sockets.adapter.rooms.get(lobbyId)
        const racers = room ? Array.from(room) : []
        callback(racers)
      })
    })
}

module.exports = setupSocketServer;