import React, { useState } from "react";
import { assets } from "../assets/assets"; // Ensure assets are correctly imported
import "../index.css"

const PhotoeditPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(assets.tshirt);

  const images = [
    assets.c1, assets.c2, assets.c3, assets.c4, assets.c5,
    assets.c6, assets.c7, assets.c8, assets.c9, assets.c10,
    assets.c11, assets.c12, assets.c13, assets.c14, assets.c15,
    assets.c16, assets.c17, assets.c18, assets.c19, assets.c20
  ];
  
  // Background images - replace with your actual background images
  const backgroundImages = [
    assets.tshirt,
    assets.tshirt2 || assets.c1, // Fallbacks in case these don't exist in your assets
    assets.tshirt3 || assets.c2,
    assets.tshirt4 || assets.c3,
    assets.tshirt5 || assets.c4,
    assets.tshirt6 || assets.c5,
   
  ];

  return (
   <>
   {/* Background Image Selector */}
   <div className="w-full overflow-x-auto p-4 bg-white-200">
        <h2 className="text-center text-lg font-bold mb-2">Choose Color</h2>
        <div className="flex space-x-2 overflow-x-scroll">
          {backgroundImages.map((bgImage, index) => (
            <div
              key={`bg-${index}`}
              className={`cursor-pointer p-1 rounded-lg transition duration-300 flex-shrink-0 w-1/4 md:w-1/6 ${
                selectedBackground === bgImage ? "" : ""
              }`}
              onClick={() => setSelectedBackground(bgImage)}
            >
              <img src={bgImage} alt={`background-${index}`} className="w-full h-16 object-cover rounded-lg shadow-md  full-screen-width" />
            </div>
          ))}
        </div>
      </div>
    <div className="flex flex-col md:flex-row h-screen w-full p-4">
      {/* Selected Image at the top in mobile view */}
      <div
        className="w-full md:w-2.5/3 p-4 flex items-center justify-center bg-white mobile-view-height"
        style={{
          backgroundImage: `url(${selectedBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className="w-full max-w-xs rounded-lg shadow-md p-2 chooosed-image-width" />
        ) : (
          <p className="text-gray-500">Select an image</p>
        )}
      </div>

      

      {/* Horizontally Scrollable Image Gallery */}
      <div className="w-full overflow-x-auto p-4 bg-gray-100">
        <h2 className="text-center text-lg font-bold mb-2">Choose an Image</h2>
        <div className="flex space-x-2 md:grid md:grid-cols-3 md:gap-4 overflow-x-scroll md:overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer p-1 rounded-lg transition duration-300 flex-shrink-0 w-1/4 md:w-auto ${
                selectedImage === image ? "border-4 border-green-500" : "border border-gray-300"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`img-${index}`} className="w-full h-24 object-cover rounded-lg shadow-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
   </>
  );
};

export default PhotoeditPage;