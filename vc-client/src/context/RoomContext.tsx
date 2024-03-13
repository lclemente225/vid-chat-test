import { useState, useEffect, createContext } from "react";
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Peer from "peerjs";
import { v4 as uuidv4} from "uuid"
const WS = "http://localhost:5000";
//@ts-nocheck

export const RoomContext = createContext<null | any>(null);

//you are using ws as a prop to give to all children
const ws = socketIOClient(WS);

//set the type after the variable declaration, not the arguments
export const RoomProvider:React.FC<{ children: React.ReactNode }> = ({children}) => {
    const navigate = useNavigate()
    const [me, setMe] = useState<string | any>('')
    const [stream, setStream] = useState<MediaStream>()

    function enterRoom(roomId:any){
        return navigate(`/room/${roomId}`)
    }
    
    function getUsers(x:{}){
        console.log("checking users", x)
    }

    useEffect(() => {
        const meId = uuidv4();
        const peer = new Peer(meId);
        setMe(peer)

        try{
            navigator.mediaDevices
            .getUserMedia({video:true, audio:true})
            .then((stream) => {
                setStream(stream)
            })
        }catch (err){
            console.error("Error in retrieving video: ", err)
        }

        ws.on("room-created", enterRoom)
        ws.on("get-users", getUsers)
    }, [])

    useEffect(() => {
        if(!me || !stream){
            return
        }else{
            ws.on('user-joined', ({peerId}) => {
                const call = me.call(peerId, stream)
            })

            me.on('call', (call) => {
                call.answer(stream)
            })
        }

    }, [me, stream])
    
    return (
    <RoomContext.Provider value={{ws, me, stream}}>
        {children}
    </RoomContext.Provider>
    )
}