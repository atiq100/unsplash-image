import React from 'react';

const PhotoList = ({photo}) => {
    console.log(photo);
    return (
        <div>
             <img src={photo.urls?.regular} alt={photo.alt_description} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">{photo.description || photo.alt_description}</h2>
              <p className="text-gray-600 text-sm mb-2">By {photo.user.name}</p>
              <a href={photo.links.html} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on Unsplash</a>
            </div>
        </div>
    );
};

export default PhotoList;