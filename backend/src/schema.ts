import { buildSchema } from 'graphql';

//Creating a type definition instance
const imgCarouselSchema = buildSchema(`
    type store {
        storeID: Int!
        storeName: String!
        storeURL: String,
        accessToken: String,
        apiKey: String,
        apiSecretKey: String,
        webhookEvent: String,
        webhookCallbackURL: String
        carousels: [carousel!] 
    }

    type carousel {
        carouselID: Int!
        storeID: Int!
        carouselName: String
        carouselpictures: [carouselPicture!]
    }

    type picture {
        pictureID: Int!
        pictureName: String!
        pictureData: String
        carouselpictures: [carouselPicture!]
    }

    type carouselPicture { 
        carouselID: Int!
        pictureID: Int!
    }

    type Query {
        getStoreByID(storeID: Int!): store!
        getPictureByID(pictureID: Int!): picture!
        getPictures: [picture!]!
    }

    type Mutation {
        createPicture(pictureName: String!, pictureData: String): picture!
        updatePicture(pictureID: Int!, pictureName: String, pictureData: String): picture!
        deletePicture(pictureID: Int!): Boolean!
    }
`);

export default imgCarouselSchema;