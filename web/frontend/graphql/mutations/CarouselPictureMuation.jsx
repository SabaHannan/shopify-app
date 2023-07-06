import { gql, useMutation } from "@apollo/client";
import client from "../GraphServer";

/**
 * useMutation to create CarouselPicture
 * @returns useCreateCarouselPicture - useMutation function
 */
const useCreateCarouselPicture = () => {
    
    const CREATE_CAROUSELPICTURE_MUTATION = gql`

        mutation createCarouselPicture($carouselID: Int!, $pictureID: Int!) {
            createCarouselPicture(carouselID: $carouselID, pictureID: $pictureID) {
                carouselID
                pictureID
            }
        }

    `;

    const [createCarouselPicture] = useMutation(CREATE_CAROUSELPICTURE_MUTATION, {client});

    return {createCarouselPicture};
}

export default useCreateCarouselPicture;