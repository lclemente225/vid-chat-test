const app = require('express')()
//http server 
const server = require("http").createServer(app)
const cors = require("cors")
const callRoomHandlers = require('./handlers/room/room.cjs')
const { roomHandler } = callRoomHandlers

//socket.io server using http
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())

const PORT = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.send("Server is running")
})


io.on('connection', (socket) => {
    socket.emit('me', socket.id)

    roomHandler(socket)

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended")
    })

    socket.on("calluser", (data) => {
        const { userToCall, signalData, from, name } = data

        io.to(userToCall).emit("calluser", {signal: signalData, from , name})
    })

    socket.on("answer", (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})

server.listen(PORT, () => {
    console.log("server is running on port ", PORT)
})