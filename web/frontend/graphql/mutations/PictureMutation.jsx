import { gql, useMutation } from "@apollo/client";
import client from "../GraphServer";

const useCreatePicture = () => {
  const CREATE_PICTURE_MUTATION = gql`
    mutation createPicture($picName: String!, $picData: String!) {
      createPicture(pictureName: $picName, pictureData: $picData) {
        pictureID
        pictureName
        pictureData
      }
    }
  `;

 const [createPicture, {loading, error}] = useMutation(CREATE_PICTURE_MUTATION, {client});

 return {createPicture, loading, error};
}

export default useCreatePicture;
