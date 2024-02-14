import { useContext } from 'react'
import './joinButton.css'
import { RoomContext } from '../../context/RoomContext'

const Join = () => {
    const {ws} = useContext(RoomContext)
    function createRoom(){
        //emit event to server side
        ws.emit("create-room")
    }

    return (
        <button onClick={createRoom} className="start-button">
            Start new Meeting
        </button>
    )
}

export default Join