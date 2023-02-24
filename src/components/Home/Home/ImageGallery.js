import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FiThumbsUp } from "react-icons/fi";
const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const clientKey = process.env.REACT_APP_apiKey
  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos?client_id=${clientKey}`)
      .then((response) => {
        setImages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="overflow-hidden rounded-lg shadow-lg">
          <img
            className="object-cover object-center w-full h-48"
            src={image?.urls?.thumb}
            alt={image?.alt_description}
          />
          <div className="p-4 flex justify-between items-center ">
            <img src={image.user?.profile_image?.small} alt="" className='rounded-full w-9' />
            <h2 className="mb-2 text-lg font-medium text-gray-900  ">{image?.user?.name}</h2>
            <div className='flex items-center'>
                <FiThumbsUp></FiThumbsUp><span>{image?.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
};

export default ImageGallery;