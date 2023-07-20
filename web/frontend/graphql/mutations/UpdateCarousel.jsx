import { gql, useMutation } from "@apollo/client";
import client from "../GraphServer";

export const useUpdateCarousel = () => {
    const UPDATE_CAROUSEL_MUTATION = gql`
      mutation updateCarousel(
        $carouselID: Int!
        $carouselName: String
        $description: String
        $activeStatus: Boolean
        $autoplay: Boolean
        $autoplaySpeed: Int
        $arrows: Boolean
        $dots: Boolean
        $infinite: Boolean
        $pauseOnHover: Boolean
        $slideToShow: Int
        $slidesToScroll: Int
      ) {
        mutation
        UpdateCarousel {
          updateCarousel(
            carouselID: $carouselID
            carouselName: $carouselName
            description: $description
            activeStatus: $activeStatus
            autoplay: $autoplay
            autoplaySpeed: $autoplaySpeed
            arrows: $arrows
            dots: $dots
            infinite: $infinite
            pauseOnHover: $pauseOnHover
            slideToShow: $slideToShow
            slidesToScroll: $slidesToScroll
          ) {
            carouselID
            storeID
            carouselName
            description
            activeStatus
            autoplay
            autoplaySpeed
            arrows
            dots
            infinite
            pauseOnHover
            slideToShow
            slidesToScroll
          }
        }
      }
    `;
  
    const [updateCarousel] = useMutation(UPDATE_CAROUSEL_MUTATION, { client });
  
    return { updateCarousel };
  };

  export default useUpdateCarousel;