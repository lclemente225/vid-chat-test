import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { RoomContext } from '../../context/RoomContext'

const Room = () => {
    const { ws, me } = useContext(RoomContext)
    //useParams takes parameters from the url
    const { id } = useParams()

    useEffect(() => {
        ws.emit('join-room', {roomId: id, peerId: me._id})
    }, [id, me, ws])

  return (
    <>
      Room id: {id}
    </>
  )
}

export default Room
