import { Grid, LegacyCard, Page, Text } from "@shopify/polaris";
import BackgroundImage from "../components/providers/BackgroundImg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarouselTypePage() {
  //Navigator
  var navigate = useNavigate();
  
  return (
    <Page>
      <BackgroundImage />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh", // Center vertically within the viewport
        }}
      >
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
            Choose Carouse Type
          </Text>
        </div>

        <Grid>
          <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
            <div
              onClick={() => {
                console.log("Navigate to New Auto Carousel page");
                navigate('../carousel/NewAutoCarousel')
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <LegacyCard
                title="Automatic Carousel"
                sectioned
              >
                <img
                  src="../assets/icons8-gallery-64.png"
                  alt="Auto Carousel"
                  style={{ width: "60px", height: "60px", marginRight: "10px" }}
                />
              </LegacyCard>
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
            <div
              onClick={() => {
                console.log("Navigate to the new manual carousel page")
                navigate('../carousel/new')
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <LegacyCard
                title="Manual Carousel"
                sectioned
              >
                <img
                  src="../assets/icons8-photo-gallery-64.png"
                  alt="Manual Carousel"
                  style={{ width: "60px", height: "60px" }}
                />
              </LegacyCard>
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 4, sm: 3, md: 3, lg: 4, xl: 4 }}>
            <div
              onClick={() => {
                console.log("Navigate to the new image slider on hover page")
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <LegacyCard
                title="Slide on Hover"
                sectioned
              >
                <img
                  src="../assets/icons8-edit-image-64.png"
                  alt="Slideshow on Hover"
                  style={{ width: "60px", height: "60px" }}
                />
              </LegacyCard>
            </div>
          </Grid.Cell>
        </Grid>
      </div>
    </Page>
  );
}
