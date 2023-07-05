import {
    Layout,
    Page,
    Text,
  } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { SlickImages } from '../../components/SlickImages';

const imageCarousel = () => {
  // TRANSLATION
  const { t } = useTranslation();

    return (
        <Page title={t("NavigationMenu.imageCarousel")}>
            <Layout>
                <Text>
                    "Lorem Ipsum..."
                </Text>
            </Layout>
                <div>
                    {/* Calling the slick slider to render carousel here */}
                    <SlickImages />
                </div>
        </Page>
    );
}
export default imageCarousel;