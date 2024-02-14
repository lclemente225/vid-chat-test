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

    function enterRoom(roomId:any){
        return navigate(`/room/${roomId}`)
    }
    
    useEffect(() => {
        const meId = uuidv4();
        const peer = new Peer(meId);
        setMe(peer)
        ws.on("room-created", enterRoom)
    }, [])
    
    return (
    <RoomContext.Provider value={{ws, me}}>
        {children}
    </RoomContext.Provider>
    )
}