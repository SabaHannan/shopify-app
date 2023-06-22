// FIRST PAGE 
import {
  Page,
  Layout,
  VerticalStack,
  Text,
  Button,
  TextContainer,
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
      {/* <Layout>
        <Layout.Section> */}
          {/* <div style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
              {/* <VerticalStack>
                <Text as="h2" variant="headingMd">
                  {t("HomePage.heading")}
                </Text>
                <p style={{marginBottom: '10px', marginTop: '10px'}}>
                  <Trans
                    i18nKey="HomePage.welcome"
                  />
                </p>
                <p style={{marginBottom: '10px'}}>
                  <Trans
                    i18nKey="HomePage.learnMore"
                  />
                </p>
                <p style={{marginBottom: '10px', marginTop: '10px'}}>{t("HomePage.startPopulatingYourApp")}</p>
        
                <Button primary url="/carousel/new">
                  Create
                </Button>
              </VerticalStack> */}
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
            {/* </div>
          </div> */}
        {/* </Layout.Section>
      </Layout> */}
    </Page>
  );
}
