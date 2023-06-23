import carouselResolver from './resolvers/carouselResolver';
import pictureResolver from './resolvers/pictureResolver';
import storeResolver from './resolvers/storeResolver';

const resolver = {
    ...pictureResolver,
    ...storeResolver,
    ...carouselResolver
}

export default resolver;