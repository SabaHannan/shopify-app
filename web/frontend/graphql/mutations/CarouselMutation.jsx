import { gql, useMutation } from "@apollo/client"; 
import client from "../GraphServer";

const useCreateCarousel = () => {
    const CREATE_CAROUSEL_MUTATION = gql`
        mutation createCarousel($storeID: Int!, $carName: String!, $carDescription: String!, $carStatus: Boolean!) {
            createCarousel(storeID: $storeID, carouselName: $carName, description: $carDescription, activeStatus: $carStatus) {
                carouselID
                storeID
                carouselName
                description
                activeStatus
            }
        }
    `;

    const [createCarousel, {loading, error}] = useMutation(CREATE_CAROUSEL_MUTATION, {client});

    return {createCarousel};
}

export default useCreateCarousel;