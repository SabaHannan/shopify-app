import {
    Layout,
    Page,
    Text,
    Button,
  } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { SlickImages } from '../../components/SlickImages';

// Page that a person can edit and see one of their carousels. Should take in an ID
const imageCarousel = () => {
  // TRANSLATION
  const { t } = useTranslation();
  
    return (
        <Page title={t("NavigationMenu.imageCarousel")}
        primaryAction={
            <Button
              primary
              connectedDisclosure={{
                accessibilityLabel: 'Other embed actions',
                actions: [{content: 'Copy code'}],
              }}
              //   Handle the embed y opening the theme editor 
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
                <SlickImages />
            </div>
        </Page>
    );
}
export default imageCarousel;