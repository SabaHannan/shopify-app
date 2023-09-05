import { Page, Text } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { SlickImages } from "../../components/SlickImages";
import { imageFiles } from "./NewAutoCarousel";
import BackgroundImage from "../../components/providers/BackgroundImg";

// Page that a person can edit and see one of their carousels. Should take in an ID
const imageCarousel = () => {
  // TRANSLATION
  const { t } = useTranslation();
  //saved images
  const images = imageFiles;

  return (
    <Page>
      <BackgroundImage />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "10vh",
        }}
      >
        <Text variant="heading2xl" as="h3">
          New automatic carousel created
        </Text>
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* Calling the slick slider to render carousel here */}
        {/* Passing the pictures array as prop to the component */}
        <SlickImages imageObj={images} />
      </div>
    </Page>
  );
};
export default imageCarousel;
