import pictureResolver from './resolvers/pictureResolver';
import storeResolver from './resolvers/storeResolver';

const resolver = {
    ...pictureResolver,
    ...storeResolver
}

export default resolver;