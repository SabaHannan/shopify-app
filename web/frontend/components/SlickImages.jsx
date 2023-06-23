import 'slick-carousel';
import React from 'react';
import Slider from 'react-slick';
import '../slick-carousel/slick.css';
import '../slick-carousel/slick-theme.css';

export function SlickImages () {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
  
    return (
        <Slider {...settings}>
            <div id="carouselWrapper">
                <img src='../../assets/1.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/2.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/3.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/4.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/5.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/6.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/7.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/8.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/9.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/10.jpg' alt=''></img>
            </div>
            <div id="carouselWrapper">
                <img src='../../assets/11.jpg' alt=''></img>
            </div>
        </Slider>
    );
}