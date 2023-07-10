import {
    Page,
    Button,
  } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { SlickImages } from '../../components/SlickImages';
// Importing the pictures object array
import { pictures }  from './new';

// Page that a person can edit and see one of their carousels. Should take in an ID
const imageCarousel = () => {
  // TRANSLATION
  const { t } = useTranslation();
  console.log('here:' + pictures);
    return (
        <Page title={t("NavigationMenu.imageCarousel")}
        primaryAction={
            <Button
              primary
              connectedDisclosure={{
                accessibilityLabel: 'Other embed actions',
                actions: [{content: 'Copy code'}],
              }}
              //   Handle the embed by opening the theme editor 
              //   onClick={() => handleEmbed(carousel.id)}
            >
              Embed
            </Button>
          }
              secondaryActions={[
                {
                    content: 'Delete',
                    destructive: 'true',
                    helpText: 'Deleting the carousel cannot be undone',
                },
              ]}
        >
            <div style={{marginTop: "20px",}}>
                {/* Calling the slick slider to render carousel here */}
                {/* Passing the pictures array as prop to the component */}
                <SlickImages imageObj={pictures}/>
            </div>
        </Page>
    );
}
export default imageCarousel;