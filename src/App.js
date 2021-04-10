import {useState} from 'react'
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import VideoStream from './components/VideoStream';
import IconScanner from './components/IconScanner'
import IconGallery from './components/IconGallery'
function App() {
  const [type, setType] = useState(null)
  return (
    <div className="App">
      <Header />
      {type === null && <>
        <div className="home-container">
          <span>
          <button onClick={() => setType('image')}><div style={{ marginRight: '5px'}}>
            <IconGallery /></div><div>Pilih File</div></button>            <button onClick={() => setType('video')}><div style={{ marginRight: '5px'}}>
            <IconScanner /></div><div>Scan Barcode</div></button>
          </span>
        </div>
      </>}
    
      {type === 'image' && <ImageUploader />}
      {type === 'video' && <VideoStream />  }
    </div>
  );
}

export default App;
