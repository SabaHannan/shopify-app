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
        carouselName: String!
        description: String
        activeStatus: Boolean!
        carouselpictures: [carouselPicture!]
        autoplay: Boolean
        autoplaySpeed: Int
        arrows: Boolean
        dots: Boolean
        infinite: Boolean
        pauseOnHover: Boolean
        slideToShow: Int
        slidesToScroll: Int
    }

    type picture {
        pictureID: Int!
        pictureName: String!
        pictureData: String!
        carouselpictures: [carouselPicture!]
    }

    type carouselPicture { 
        carouselID: Int!
        pictureID: Int!
    }

    type Query {
        getStoreByID(storeID: Int!): store!
        getCarouselByID(carouselID: Int!): carousel!
        getPictureByID(pictureID: Int!): picture!
        getPictures: [picture!]!
    }

    type Mutation {
        createStore(name: String!, url: String, token: String, apikey: String, secretkey: String, whEvent: String, whCallbackURL: String): store!
        updateStore(storeID: Int!, name: String, url: String, token: String, apikey: String, secretkey: String, whEvent: String, whCallbackURL: String): store!
        deleteStore(storeID: Int!): Boolean!
        
        createCarousel(storeID: Int!, carouselName: String!, description: String!, activeStatus: Boolean!): carousel!
        updateCarousel(carouselID: Int!, carouselName: String, description: String, activeStatus: Boolean, autoplay: Boolean, autoplaySpeed: Int, arrows: Boolean, dots: Boolean, infinite: Boolean, pauseOnHover: Boolean, slideToShow: Int, slidesToScroll: Int): carousel!
        deleteCarousel(carouselID: Int!): Boolean!
        
        createPicture(pictureName: String!, pictureData: String!): picture!
        updatePicture(pictureID: Int!, pictureName: String, pictureData: String!): picture!
        deletePicture(pictureID: Int!): Boolean!

        createCarouselPicture(carouselID: Int!, pictureID: Int!): carouselPicture!
    }
`);

export default imgCarouselSchema;
