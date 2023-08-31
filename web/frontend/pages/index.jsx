// FIRST PAGE - Home Page
import {
  Page,
  Button,
  VerticalStack,
  HorizontalGrid,
  LegacyCard,
} from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";
import BackgroundImage from "../components/providers/BackgroundImg";

export default function HomePage() {
  const { t } = useTranslation();

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
              height: "35vh",
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
              <p style={{ textAlign: "center" }}>{t("HomePage.welcome")}</p>
            </LegacyCard>
          </div>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Button fullWidth url="/carousel/new">
              <strong>Create</strong>
            </Button>
          </div>
        </VerticalStack>
      </div>
    </Page>
  );
}
