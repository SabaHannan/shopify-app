import 'slick-carousel';
import React from 'react';
import Slider from 'react-slick';
import '../slick-carousel/slick.css';
import '../slick-carousel/slick-theme.css';

// Function takes in an array of image objects
export function SlickImages ({ imageObj }) {

    // 1. Loop through the image object array
    /**
     * Helper function to extract pictureData from image object array
     * @param {*} imageObj 
     * @returns array of pictureData
     */
    function getImageData(imageObj) {
        let imageData = [];
        imageObj.forEach(image => {
            // 2. Get the pictureData
            const picData = image.pictureData;
            imageData.push(picData);
        });
        // return pictureData as array
        return imageData;
    }

    // 3. Deserialize it
    function deserializeImages(imagesDataArray){
        let imageArray = [];
        // Deserialize and save in temp variable
        imagesDataArray.forEach(pictureData => {
            imageArray.push(atob(pictureData));
        })
        // return images in an array
        return imageArray;
    }

    // 4. Set it in the slider

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
  
    return (
        // Iterate through the images array and assign to <div>
        <Slider {...settings}>
            {/* {data.map((image, index) => (
                <div id="carouselWrapper" key={index}>
                    <img src={image} alt="" />
                </div>
            ))} */}
        </Slider>
    );
}