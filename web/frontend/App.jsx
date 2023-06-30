import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  //Declaring the backend connection URI
  const ENDPOINT_URI = 'http://localhost:3000';

  //Creating the Apollo client instance
  const client = new ApolloClient({
      uri: ENDPOINT_URI,
      cache: new InMemoryCache()
  });

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <ApolloProvider client={client}>
            <QueryProvider>
              <NavigationMenu
                navigationLinks={[
                  // {
                  //   label: t("NavigationMenu.newPage"),
                  //   destination: "/carousel/new",
                  // },
                  // {
                  //   label: t("NavigationMenu.imageCarousel"),
                  //   destination: "/carousel/imageCarousel",
                  // },
                ]}
              />
              <Routes pages={pages} />
            </QueryProvider>
          </ApolloProvider>  
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
