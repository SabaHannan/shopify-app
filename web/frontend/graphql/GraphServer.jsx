import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom';
import App from '../App';
import { initI18n } from "../utils/i18nUtils";

//Declaring the backend connection uri
const ENDPOINT_URI = 'http://localhost:3000/graphql';

//Declaring a client instance
const client = new ApolloClient({
    uri: ENDPOINT_URI,
    cache: new InMemoryCache()
});

//Wrap the root componenet of the project
// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
        <App /> 
    </ApolloProvider>
    , document.getElementById("app"));
});

export default client;