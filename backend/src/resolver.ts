import carouselResolver from './resolvers/carouselResolver';
import pictureResolver from './resolvers/pictureResolver';
import storeResolver from './resolvers/storeResolver';
import carouselPictureResolver from './resolvers/carouselPictureResolver';

const resolver = {
    ...pictureResolver,
    ...storeResolver,
    ...carouselResolver,
    ...carouselPictureResolver
}

export default resolver;