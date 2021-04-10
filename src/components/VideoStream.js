import React , {useEffect, useState} from 'react';
import Webcam from "react-webcam";

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
  
 

const VideoStream = (props) => {
  const [image, setImage] = useState('')
  const videoConstraints = {
    width: { min: 320, max: 480 },
    height: { min: 480, max: 1000},
    facingMode: "environment"
  };
  const webcamRef = React.useRef(null);
  const API_URL = 'https://agfo64wl93.execute-api.us-east-1.amazonaws.com/v1/api/barcode/upload'
  useEffect(() => {
    if(!webcamRef) return;
    setInterval(() => capture(), 5000);
  }, [webcamRef])

  const capture = React.useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot();
     setImage(imageSrc)
    },
    [webcamRef]
  );

  return <div style={{
    position: 'relative',
    overflowY: 'auto',
    height: '100%',
  }}><Webcam videoConstraints={videoConstraints} ref={webcamRef} audio={false} />
       <div class="laser"></div>
       <img src={image} style={{width: '100%'}}/>
  </div>
}

export default VideoStream
   
