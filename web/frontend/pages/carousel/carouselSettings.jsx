import React, { useState, useCallback } from 'react';
import {
    Form,
    FormLayout,
    Page,
    Select,
    Checkbox,
    Text,
    LegacyStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
// Importing the entire recently saved carousel
import { carousel } from './new';
import { useUpdateCarousel } from '../../graphql/mutations/CarouselMutation';
var createdCarousel = [];

export default function CarouselSettings() {

    // TRANSLATION
    const { t } = useTranslation();
    // UPDATE FUNCTION
    const { updateCarousel } = useUpdateCarousel();

    console.log("carousel: ", carousel);

    // SLIDER SETTINGS
    const [arrows, setArrows] = useState(false);
    const [dots, setDots] = useState(false);
    const [infinte, setInfinite] = useState(true);
    const [pauseOnHover, setPauseOnHover] = useState(true);
    const [autoplay, setAutoplay] = useState(false);

    const [autoplaySpeed, setAutoplaySpeed] = useState(3);
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [slidesToScroll, setSlidestoScroll] = useState(1);

    // HANDLE CHECKBOX CHANGE
    const handleArrow = useCallback(
        (newChecked) => setArrows(newChecked),
        [],
    );
    const handleDots = useCallback(
        (newChecked) => setDots(newChecked),
        [],
    );
    const handleInfinte = useCallback(
        (newChecked) => setInfinite(newChecked),
        [],
    );
    const handlePauseOnHover = useCallback(
        (newChecked) => setPauseOnHover(newChecked),
        [],
    );
    const handleAutoplay = useCallback(
        (newChecked) => setAutoplay(newChecked),
        [],
    );

    // HANDLE SELECT CHANGE
    const handleAutoplaySpeed = useCallback(
        (value) => setAutoplaySpeed(value),
        [],
    );
    const handleSlidesToShow = useCallback(
        (value) => setSlidesToShow(value),
        [],
    );
    const handleSlidesToScroll = useCallback(
        (value) => setSlidestoScroll(value),
        [],
    );

    /**
     * Function updates the carousel with new settings
     */
    const editCarousel = async () => {
        console.log('Updating carousel');
        
        try {

            // Update an existing carousel using id
            const editCarousel = {
                
                carouselID: carousel.carouselID,
                carouselName : carousel.carouselName, 
                description : carousel.description,
                activeStatus : carousel.activeStatus,
                autoplay: autoplay,
                autoplaySpeed: autoplaySpeed,
                arrows: arrows,
                dots: dots,
                infinite: infinte,
                pauseOnHover: pauseOnHover,
                slideToShow: slidesToShow,
                slidesToScroll: slidesToScroll
            }

            const { data } = await updateCarousel({ variables: editCarousel })
            createdCarousel.push(data.updateCarousel);

        }
        catch (error) {
            console.error("Something went wrong while updating: ", error)
        }
    }

    const handleSave = () => {
        console.log("Clicked save");
        editCarousel();
    }

    return (
        <Page>

            <Form>
                <FormLayout>
                    <TitleBar title={t("HomePage.title")}
                        primaryAction={{
                            content: "Save",
                            onAction: handleSave
                        }}
                    />
                    <LegacyStack vertical>
                        <Text variant="heading2xl" as="h3">
                            Select your settings for the image carousel
                        </Text>
                    </LegacyStack>


                    {/* SLIDER SETTINGS */}
                    <Checkbox
                        label="Autoplay"
                        checked={autoplay}
                        onChange={handleAutoplay}
                    />
                    <div>
                        <Select
                            label="Autoplay Speed"
                            helpText="Speed in miliseconds"
                            options={['1000', '2000', '3000', '4000']}
                            value={autoplaySpeed}
                            onChange={handleAutoplaySpeed}
                        />
                    </div>
                    <Checkbox
                        label="Arrow"
                        checked={arrows}
                        onChange={handleArrow}
                    />
                    <Checkbox
                        label="Dots"
                        checked={dots}
                        onChange={handleDots}
                    />
                    <Checkbox
                        label="Infinite"
                        checked={infinte}
                        onChange={handleInfinte}
                    />
                    <Checkbox
                        label="Pause on hover"
                        checked={pauseOnHover}
                        onChange={handlePauseOnHover}
                    />
                    <div>
                        <Select
                            label="Images to show"
                            options={['1', '2', '3', '4']}
                            value={slidesToShow}
                            onChange={handleSlidesToShow}
                        />
                    </div>
                    <div>
                        <Select
                            label="Images to scroll"
                            options={['1', '2', '3', '4']}
                            value={slidesToScroll}
                            onChange={handleSlidesToScroll}
                        />
                    </div>
                </FormLayout>
            </Form>
        </Page>
    );
}