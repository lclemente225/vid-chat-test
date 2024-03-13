import React, {useEffect, useRef} from 'react'

const VideoPlayer = ({stream, muted}) => {
    const videoRef = useRef(null)

    useEffect(() => {
        if(videoRef.current){
            videoRef.current.srcObject = stream;
        }
    }, [stream])

    return (
    <>
        <video ref={videoRef} autoPlay muted={muted} controls={true}/>
    </>
    )
}

export default VideoPlayer
