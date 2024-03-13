const { Socket } = require('socket.io');
const { v4 } = require("uuid");
let rooms = {}

const roomHandler = (socket = Socket) => {
    socket.on('create-room', () => {
        const roomId = v4();

        rooms[roomId] = []  

        socket.join(roomId)
        //emit event to client
        socket.emit("room-created", roomId)
        console.log("user created room", roomId)
    })

    socket.on('join-room', ({roomId, peerId}) => {
        console.log("user connected from client", roomId)
        
        if(rooms[roomId]){
            rooms[roomId].push(peerId)
            socket.join(roomId)
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            }) 
        }

        socket.emit('user-joined', {peerId})
        
        socket.on('disconnect', () => {
            console.log('user left the room: ', peerId)
            leaveRoom({roomId, peerId})
        }) 
    })

 
    function leaveRoom({roomId, peerId}){
        rooms[roomId] = rooms[roomId].filter((id) => {
            return id !== peerId
        })
        socket.to(roomId).emit('user-disconnected', peerId)
    } 
 
}
 
module.exports = { 
    roomHandler 
}