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
// Importing the entire recently saved carousel
import { carousel } from './new';
import { useUpdateCarousel } from '../../graphql/mutations/CarouselMutation';

export default function CarouselSettings() {

    // UPDATE FUNCTION
    const { updateCarousel } = useUpdateCarousel();

    // SLIDER SETTINGS
    const [arrows, setArrows] = useState(false);
    const [dots, setDots] = useState(false);
    const [infinte, setInfinite] = useState(true);
    const [pauseOnHover, setPauseOnHover] = useState(true);
    const [autoplay, setAutoplay] = useState(false);

    const [autoplaySpeed, setAutoplaySpeed] = useState('3');
    const [slidesToShow, setSlidesToShow] = useState('');
    const [slidesToScroll, setSlidestoScroll] = useState('');

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
                carouselID : carousel.carouselID,
                autoplay : autoplay, 
                autoplaySpeed : autoplaySpeed, 
                arrows : arrows,
                dots : dots,
                infinite : infinte,
                pauseOnHover : pauseOnHover, 
                slideToShow : slidesToShow,
                slidesToScroll : slidesToScroll
            }

            const { data } = await updateCarousel({ variables: editCarousel })
            console.log('Data: ', data);

        }
        catch (error) {
            console.error("Something went wrong while updating: ", error)
        }
    }

    return (
        <Page>

            <Form>
                <FormLayout>
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