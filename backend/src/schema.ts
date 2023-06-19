import { buildSchema } from 'graphql';

//Creating a type definition instance
const imgCarouselSchema = buildSchema(`
    type store {
        storeID: Int!
        storeName: String!
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
        getPictureByID(pictureID: Int!): picture!
        getPictures: [picture!]!
    }
`);

export default imgCarouselSchema;
