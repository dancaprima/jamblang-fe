import {useState} from 'react'
import Header from './components/Header';
import History from './components/History';
import ImageUploader from './components/ImageUploader';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
function App() {
  return (
    <div className="App">
     {/* {type === null && <>
        <div className="home-container">
          <span>
          <button onClick={() => setType('image')}><div style={{ marginRight: '5px'}}>
            <IconGallery /></div><div>Pilih File</div></button>            <button onClick={() => setType('video')}><div style={{ marginRight: '5px'}}>
            <IconScanner /></div><div>Scan Barcode</div></button>
          </span>
        </div>
      </>} */}
       <Router>
        <Header />
        <Switch>
          <Route exact path="/" children={<ImageUploader />} />
          <Route exact path="/history" children={<History />} />
        </Switch>

       </Router>
    {/* {type === 'video' && <VideoStream />  } */}
    </div>
  );
}

export default App;
