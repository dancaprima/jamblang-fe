import { useState } from 'react';
import axios from 'axios';
import SkeletonLoading from 'react-loading-skeleton';
import BarcodeImage from '../assets/images/barcode.png';
import CloseIcon from '../assets/images/close.png';
import ImageUploading from 'react-images-uploading';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [previewDimension, setPreviewDimension] = useState({});
  const [isModalBoxActive, setIsModalBoxActive] = useState(false);
  const [modalBoxData, setModalBoxData] = useState({});
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleSubmitImage = () => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('barcode_image', images[0].file);

    axios({
      method: 'post',
      url: 'https://agfo64wl93.execute-api.us-east-1.amazonaws.com/v1/api/barcode/upload',
      data: formData,
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
    })
      .then((response) => {
        setResultData(response)
        setIsLoading(false);
        const historyData = localStorage.getItem('history') ? [...JSON.parse(localStorage.getItem('history')), ...response.data] : response.data
        const stringify = JSON.stringify(historyData)
        localStorage.setItem('history',stringify)
        const box = document.getElementById('preview-image');
        const width = box.offsetWidth;
        const height = box.offsetHeight;

        setPreviewDimension({
          width,
          height
        });

      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  const handleOpenModal = (aBin, aSku, aZone) => {
    setModalBoxData({
      binData: aBin,
      skuData: aSku,
      zoneData: aZone
    });

    setIsModalBoxActive(true);
  };

  const renderModalBox = () => {

    return (
      <div
        className='modalbox'
        style={{
          display: `${isModalBoxActive ? 'grid' : 'none'}`,
        }} 
      >
        <div className='modalbox-content'>
          <img
            src={CloseIcon}
            alt='close modal'
            className='close-icon'
            onClick={() => setIsModalBoxActive(false)}
          />
          <div className='modalbox-data'>
            <div>{`SKU: ${modalBoxData?.skuData}`}</div>
            <div>{`BIN: ${modalBoxData?.binData}`}</div>
          </div>
          <img src={modalBoxData?.zoneData} alt='zone' />
        </div>
      </div>
    )
  }

  return (
    <div className='upload'>
      <div
        className='overlay'
        style={{
          display: `${isModalBoxActive ? 'block' : 'none'}`,
        }} 
        onClick={() => setIsModalBoxActive(false)}
      >
        {renderModalBox()}
      </div>
      <ImageUploading
        multiple={true}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className='upload-wrapper'>
            {
              images.length > 0 ? null : (
                <div className='upload-btn'>
                  <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <img src={BarcodeImage} alt='' />
                  </button>
                </div>
              )
            }
            <div className='image-preview-wrapper'>
              {imageList.map((image, index) => {
                
                return (
                  <div key={index}>
                    {
                      isLoading ? <SkeletonLoading height={500} width={300} /> : (
                        <div>
                          <div className='image-preview'>
                            {
                              resultData?.data?.length > 0 ? (
                                <img
                                  src={image['data_url']}
                                  alt=''
                                  id='preview-image'
                                />
                              ) : (
                                <img
                                  src={image['data_url']}
                                  alt=''
                                  onClick={() => onImageUpdate(index)}
                                  id='preview-image'
                                />
                              )
                            }
                            {
                              resultData?.data?.map((box, index) => {
                                const { BinCode, Geometry, SKU, Zone } = box;
                                const coodinateLeft = Geometry?.BoundingBox?.Left;
                                const coordinateTop = Geometry?.BoundingBox?.Top;
                                const coodinateWidth = Geometry?.BoundingBox?.Width;
                                const coordinateHeight = Geometry?.BoundingBox?.Height;
                                const styleTop = coordinateTop * previewDimension?.height;
                                const styleLeft = coodinateLeft * previewDimension?.width;
                                const styleWidth = coodinateWidth * previewDimension?.width;
                                const styleHeight = coordinateHeight * previewDimension?.height;

                                return (
                                  <div
                                    key={index}
                                    className='popup-btn'
                                    onClick={() => handleOpenModal(BinCode, SKU, Zone)}
                                  >
                                    <div
                                      className='box'
                                      style={{
                                        top: styleTop + 20,
                                        left: styleLeft + 20,
                                        width: styleWidth + 5,
                                        height: styleHeight + 5,
                                      }}
                                    /> 
                                    <div
                                      className='bin'
                                      style={{
                                      top: styleTop + 35,
                                      left: styleLeft - 30,
                                    }}>
                                      {BinCode ? `Bin: ${BinCode}` : 'SKU Tidak ditemukan'}
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div className='image-preview-btn'>
                            <div>
                              <button
                                onClick={() => { 
                                  onImageRemove(index);
                                  setPreviewDimension({});
                                  setResultData([]);
                                }}
                                className='btn btn-secondary'
                              >Hapus</button>
                            </div>
                            <div>
                              <button onClick={handleSubmitImage} className='btn btn-primary'>Proses</button>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );

}

export default ImageUploader;
