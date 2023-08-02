// FIRST PAGE - Home Page
import {
  Page,
  Button,
  MediaCard,
  HorizontalStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} />
      <HorizontalStack>
        <div>
          <MediaCard 
            title={t("HomePage.heading")}
            description={<Trans i18nKey="HomePage.welcome"/>}
          >
  
            {/* IMAGE SOURCE */}
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'fill',
                objectPosition: 'center',
              }}
              src="../assets/image-carousel.jpg"
            />
          </MediaCard>

          {/* BUTTON COMPONENT */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Button primary fullWidth url="/carousel/new">Create</Button>
          </div>
        </div>
      </HorizontalStack>
    </Page>
  );
}
