// FIRST PAGE - Home Page
import {
  Page,
  Button,
  VerticalStack,
  HorizontalGrid,
  LegacyCard,
  Text
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import BackgroundImage from "../components/providers/BackgroundImg";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  function handleCreateButton(event) {
    navigate('./CarouselType');

    console.log("Navigate to choose carousels")
  }

  return (
    <Page>
      <BackgroundImage />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Use the entire viewport height
        }}
      >
        <VerticalStack spacing="extraTight">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "25vh",
            }}
          >
            <HorizontalGrid spacing="extraLoose" columns={4}>
              <div>
                <img
                  src="../assets/ICA-WPage-GirlWithFashionBag.jpg"
                  alt="image 1"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div>
                <img
                  src="../assets/ICA-WPage-BoyWithYellowJacket.jpg"
                  alt="image 2"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div>
                <img
                  src="../assets/ICA-WPage-BoyWithBrownJacket.jpg"
                  alt="image 3"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div>
                <img
                  src="../assets/ICA-WPage-GirlWithYellowJacket.jpg"
                  alt="image 4"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            </HorizontalGrid>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "15vh",
            }}
          >
            <LegacyCard sectioned subdued>
              <Text alignment="center" variant="headingSm" as="h6">{t("HomePage.welcome")}</Text>
            </LegacyCard>
          </div>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Button size="medium" fullWidth onClick={handleCreateButton}>
              <strong>Create</strong>
            </Button>
          </div>
        </VerticalStack>
      </div>
    </Page>
  );
}
