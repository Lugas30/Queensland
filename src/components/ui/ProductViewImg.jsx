import React from 'react';

export const ProductViewImg = ({ imgSrc }) => {
  return (
    <div>
      {imgSrc && (
        <div className="grid grid-cols-2 gap-2">
          {/* Map through the 'gambar' properties and display the images */}
          {Object.values(imgSrc).map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};
