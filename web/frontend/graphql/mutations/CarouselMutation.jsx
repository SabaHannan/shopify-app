import { gql, useMutation } from "@apollo/client";
import client from "../GraphServer";

/**
 * Mutation function to create a new Carousel object in the database
 * @returns - Carousel with ID
 */
export default function useCreateCarousel() {
  const CREATE_CAROUSEL_MUTATION = gql`
    mutation createCarousel(
      $storeID: Int!
      $carName: String!
      $carDescription: String!
      $carStatus: Boolean!
    ) {
      createCarousel(
        storeID: $storeID
        carouselName: $carName
        description: $carDescription
        activeStatus: $carStatus
      ) {
        carouselID
        storeID
        carouselName
        description
        activeStatus
      }
    }
  `;

    const [createCarousel] = useMutation(CREATE_CAROUSEL_MUTATION, { client });

    return { createCarousel };

};

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
  `;

    const [updateCarousel] = useMutation(UPDATE_CAROUSEL_MUTATION, { client });

    return { updateCarousel };
};
