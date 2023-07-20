// 2nd PAGE - Create a carousel
import React, { useState } from 'react';
import {
  Page,
  Layout,
  Banner,
  Text,
  FormLayout,
  TextField,
  DropZone,
  Form,
  Thumbnail,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { NoteMinor } from "@shopify/polaris-icons";
import { useNavigate } from 'react-router-dom';
import useCreatePicture from '../../graphql/mutations/PictureMutation';
import { serialiseFile } from "../../graphql/SerializeFile";
import useCreateCarousel from '../../graphql/mutations/CarouselMutation';
import useCreateCarouselPicture from '../../graphql/mutations/CarouselPictureMuation';
// DATABASE IMAGES ARRAY
export var pictures = [];
export var imageFiles = [];
export var carousel;

export default function ManageCode() {
  // TRANSLATION
  const { t } = useTranslation();
  // USER IMAGES
  const [selectedFiles, setSelectedFiles] = useState([]);
  // ERROR MESSAGE
  const [errorMessage, setErrorMessage] = useState(null);
  // FORM TITLE
  const [title, setTitle] = useState();
  // FORM DESCRIPTION
  const [description, setDescription] = useState();
  // TO ROUTE TO A DIFFERENT PAGE IN APP
  const navigate = useNavigate();
  const {createPicture, loading} = useCreatePicture();
  //DATABASE CAROUSEL 
  // var [carousel, setCarousel] = useState();
  const {createCarousel} = useCreateCarousel();
  //DATABASE CAROUSEL_PICTURE
  const [carouselPictures, setCarouselPictures] = useState([]);
  const {createCarouselPicture} = useCreateCarouselPicture();

  // DROPZONE CHANGE
  const handleDrop = (files) => {
    setSelectedFiles(files);
    files.forEach(f => {
      imageFiles.push(f);
    })
    
  };
 
  // HANDLE FORM SUBMISSION
  const handleSubmit = async () => {
    console.log("SAVING IMAGES!")

    //Create Carousel intansce in the database first before uploading the pictures
    await makeCarousel();
    
    //Upload pictures to the backend
    try {
        const createdPictures = [];

        for(const file of selectedFiles) {
          const binData = await serialiseFile(file);

          const nuPic = {
            picName: file.name,
            picData: binData
          }

          const { data } = await createPicture({variables: nuPic});

          if(loading) {
            console.log("loading...")
          }

          createdPictures.push(data.createPicture);

          //create carouselpicture intance
          await makeCarouselPicture(carousel.carouselID, data.createPicture.pictureID);

        }

        pictures = createdPictures;
 
        pictures.forEach(pic => {
          console.log(pic);
        })
    }
    catch(error) {
      // If there is an error, set the error state
      setErrorMessage('There was an error uploading the image.');
      console.error("Something went very wrong Stephen: ", error)
    }

    // Navigating to the next page
    navigate('/carousel/CarouselSettings');
    console.log("NOW WE HERE!")
  }

  /**
   * Function for sending a new CarouselPicture to the database
   * @param {*} carID 
   * @param {*} picID 
   */
  const makeCarouselPicture = async (carID, picID) => {
    try {
      //Create a CarousePicture instance
      const nuCarouselPicture = {
        carouselID: carID,
        pictureID: picID
      }

      const { data } = await createCarouselPicture({variables: nuCarouselPicture});
       
      console.log(data.createCarouselPicture);

      carouselPictures.push(data.createCarouselPicture);

    }
    catch(error) {
      console.error("Something went wrong with create CarouselPicture", error);
    }
  } 

  /**
   * Function to create and save a new Carousel into the database
   */
  const makeCarousel = async () => {

    //Create carousel instance from the title and description
    console.log("CREATING CAROUSEL");
    
    try {
      
      const nuCarousel = {
        storeID: 4,
        carName: title,
        carDescription: description,
        carStatus: false
      }

      const { data } = await createCarousel({variables: nuCarousel })

      // Getting the created carousel
      carousel = data.createCarousel;

    }
    catch(error) {
      console.error("Something went wrong: ", error)
    }

  } // End makeCarousel

  const validImageTypes = ['image/*'];
  // If the selectedFiles array is empty then display the <DropZone.FileUpload>
  const fileUpload = !selectedFiles.length && <DropZone.FileUpload />;

  // Maps over the selectedFiles state to render thumbnail previews of the selected image files
  const renderThumbnails = selectedFiles.length > 0 && (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {selectedFiles.map((file, index) => (
        <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
            validImageTypes.includes(file.type)
              // If statement to either render the actual file preview or NoteMinor icon
              ? URL.createObjectURL(file)
              : NoteMinor
            }
          />
          {/*console.log("URL: " + URL.createObjectURL(file))*/}
          {/* Div to display the caption of the thumbnails */}
          <div>
            {file.name} <Text variant="bodySm" as='p'>{file.size} bytes</Text>
            {/*console.log("file name" + file.name)*/}
          </div>
        </div>
      ))}
    </div>
  );

  // HANDLE FORM CHANGES 
  const handleFormTitleChange = (value) => setTitle(value);
  const handleFormDescriptionChange = (value) => setDescription(value);

  return (
    <Page>
      <TitleBar title={t("HomePage.title")} 
      primaryAction={{
        content: "Next",
        onAction: handleSubmit
        }}   
      />
      <Layout>
        <Layout.Section>
          {/* ERROR MESSAGE */}
          {errorMessage && (
              <Banner status="critical">{errorMessage}</Banner>
          )}
        </Layout.Section>
      </Layout>

      <Form>
        <FormLayout>
          {/* TITLE OF THE IMAGE CAROUSEL */}
          <div>
            <TextField
              label="Title"
              type="text"
              onChange={handleFormTitleChange}
              value={title}
              helpText="Title of the carousel"
              autoComplete='off'
            />
          </div>
          {/* DESCRIPTION OF THE IMAGE CAROUSEL */}
          <div>
            <TextField
              label="Description"
              type="text"
              onChange={handleFormDescriptionChange}
              value={description}
              helpText="Briefly describe the carousel you want to create"
              autoComplete='off'
            />
          </div>
        
          {/* IMAGE UPLOADING */}
          <div>
            <Text>Upload Carousel Images</Text>
            <DropZone
              accept="image/*"
              dropOnPage
              onDrop={handleDrop}
            >
              {renderThumbnails}
              {fileUpload}
            </DropZone>
          </div>
        </FormLayout>
        </Form>
    </Page>
  );
}
