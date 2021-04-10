import { useState } from 'react';
import BarcodeImage from '../assets/images/barcode.png';
import ImageUploading from 'react-images-uploading';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
                  <img
                    src={image['data_url']}
                    alt=''
                    className='image-preview'
                    onClick={() => onImageUpdate(index)}
                  />
                  <div>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
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
