const { Server } = require('socket.io');

function setupSocketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        socket.emit('test', 'Connected to Socket.IO server')

      socket.on('create-lobby', () => {
        console.log('Lobby created with ID: ' + socket.id);
        socket.join(socket.id);
        socket.emit('lobby-created', { lobbyId: socket.id, host: socket.id });
      })

      socket.on('join-lobby', (data) => {
        if (io.sockets.adapter.rooms.has(data.lobbyId)) {
          socket.join(data.lobbyId);
          socket.emit('lobby-joined', { lobbyId: data.lobbyId, player: socket.id });
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

      socket.on('start-game', ({ lobbyId }) => {
          console.log('Starting race for lobby: ' + lobbyId);
          io.to(lobbyId).emit('game-started');
      })
    })
}

module.exports = setupSocketServer;