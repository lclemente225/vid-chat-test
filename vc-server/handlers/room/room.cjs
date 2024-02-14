const { Socket } = require('socket.io');
const { v4 } = require("uuid");

const roomHandler = (socket = Socket) => {

    socket.on('create-room', () => {
        const roomId = v4();
        socket.join(roomId)
        //emit event to client
        socket.emit("room-created", roomId)
        console.log("user created room", roomId)
    })
    
    socket.on('join-room', (roomIdFromClient) => {
        console.log("user connected from client", roomIdFromClient)
    })

}

module.exports = {
    roomHandler
}