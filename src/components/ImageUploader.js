import { useState } from 'react';
import axios from 'axios';
import SkeletonLoading from 'react-loading-skeleton';
import BarcodeImage from '../assets/images/barcode.png';
import ImageUploading from 'react-images-uploading';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      .then(function (response) {
        //handle success
        console.log(response);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        setIsLoading(false);
      });
  }

  console.log(isLoading);

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
              {imageList.map((image, index) => {
                
                return (
                  <div key={index}>
                    {
                      isLoading ? <SkeletonLoading height={500} width={300} /> : (
                        <div>
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
