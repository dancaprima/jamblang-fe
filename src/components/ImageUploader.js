import { useState } from 'react';
import BarcodeImage from '../assets/images/barcode.png';
import ImageUploading from 'react-images-uploading';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleSubmitImage = () => {
    console.log(images)
  }

  return (
    <div className='upload'>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
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
              {imageList.map((image, index) => (
                <div key={index}>
                  <div className='image-preview'>
                    <img
                      src={image['data_url']}
                      alt=''
                      onClick={() => onImageUpdate(index)}
                    />
                  </div>
                  <div className='image-preview-btn'>
                    <div>
                      <button onClick={() => onImageRemove(index)} className='btn btn-secondary'>Hapus</button>
                    </div>
                    <div>
                      <button onClick={handleSubmitImage} className='btn btn-primary'>Proses</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );

}

export default ImageUploader;
