import 'slick-carousel';
import React, { useEffect, useState } from 'react';
// import React from 'react';
import Slider from 'react-slick';
import '../slick-carousel/slick.css';
import '../slick-carousel/slick-theme.css';
import { createdCarousel } from '../pages/carousel/carouselSettings.jsx';

// Function takes in an array of image objects
export function SlickImages ({ imageObj }) {

    console.log('slick-images: ', createdCarousel);

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const loadImageUrls = async () => {
            const urls = await Promise.all(
                imageObj.map((image) => createImageFromObjectUrl(image))
            );
            setImageUrls(urls);
        };

        loadImageUrls();
  }, [imageObj]);

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
            {imageUrls.map((image, index) => (
                <div id="carouselWrapper" key={index}>
                    <img src={image} alt="" />
                </div>
            ))}
            {/* <div className="carouselWrapper">
                <img src='../assets/1.jpg'></img>
            </div>
            <div className="carouselWrapper">
                <img src='../assets/2.jpg'></img>
            </div> */}
        </Slider>
    );
}

async function createImageFromObjectUrl(fileObject) {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const imageUrl = reader.result;
        resolve(imageUrl);
      };
  
      reader.readAsDataURL(fileObject);
    });
  }