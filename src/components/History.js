import { useState } from "react"
import CloseIcon from '../assets/images/close.png';

const History = () => {
    const historyData = localStorage.getItem('history')
    const [openModal, setOpenModal] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const data = JSON.parse(historyData)
    const renderModalBox = () => {

        return (
          <div
            className='modalbox'
            style={{
              display: `${openModal ? 'grid' : 'none'}`,
            }} 
          >
            <div style={{ paddingTop: '50px'}} className='modalbox-content'>
              <img
                style={{}}
                src={CloseIcon}
                alt='close modal'
                className='close-icon'
                onClick={() => setOpenModal(false)}
              />
              <img src={selectedData?.Zone} alt='zone' />
            </div>
          </div>
        )
      }
    
    return <div style={{overflow: 'scroll', maxHeight: '100vh', padding: '16px', marginTop: '80px'}}>
            <div
        className='overlay'
        style={{
          display: `${openModal ? 'block' : 'none'}`,
        }} 
        onClick={() => setOpenModal(false)}
      >
        {renderModalBox()}
      </div>
        {
            data?.map(d => 
            <div className="card-history">
                <h3>
                 SKU:   {d.SKU}
                </h3>
                <span>
                 BIN:   {d.BinCode}
                </span>
                <span style={{ cursor: 'pointer'}} onClick={() => {setOpenModal(true);
                     setSelectedData(d)}} style={{ fontWeight: 'bold', fontSize: '14px', color: 'blue'}}>
                    Lihat Denah
                </span>
            </div>
            )
        }
        {!data && <div style={{ display: 'flex', minHeight: '100vh'}}> 
            <h5 style={{ margin: 'auto', fontSize: '16px'}}>Data Kosong</h5>
        </div>}
    </div>
}

export default History