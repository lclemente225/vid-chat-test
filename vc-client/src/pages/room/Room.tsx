import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { RoomContext } from '../../context/RoomContext'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer.jsx'

const Room = () => {
    const { ws, me, stream } = useContext(RoomContext)
    //useParams takes parameters from the url
    const { id } = useParams()
    const [muted, setMute] = useState(true)

    useEffect(() => {
       if(me) ws.emit('join-room', {roomId: id, peerId: me._id})
    }, [id, me, ws])


  return (
    <>
      Room id: {id}
      <p>
      Your Id: {me._id}
      </p>
      <div>
        <VideoPlayer stream={stream} muted={muted}/>
        <button onClick={() => setMute((x):any => !x)}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </>
  )
}

export default Room
