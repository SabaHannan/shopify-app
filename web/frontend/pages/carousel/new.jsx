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
// import { SlickImages } from '../../components/SlickImages';

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

  // DATABASE IMAGES
  const [pictures, setPictures] = useState([]);

  const {createPicture, loading} = useCreatePicture();

  //DATABASE CAROUSEL 
  const [carousel, setCarousel] = useState();

  const {createCarousel} = useCreateCarousel();

  //DATABASE CAROUSEL_PICTURE
  const [carouselPictures, setCarouselPictures] = useState([]);

  const {createCarouselPicture} = useCreateCarouselPicture();

  // DROPZONE CHANGE
  const handleDrop = (files) => {

    // CODE TO UPLOAD FILE AND CHECK IF IT WAS SUCCESSFULL

    // try {
    //   // Simulate image upload request
    //   const uploadPromises = files.map((file) =>
    //     axios.post('https://example.com/upload', file)
    //   );

    //   // Wait for all upload requests to finish
    //   const responses = await Promise.all(uploadPromises);

    //   // Check for any failed uploads
    //   const failedUploads = responses.filter((response) => response.status !== 200);

    //   if (failedUploads.length > 0) {
    //     // Image upload failed
    //     setErrorMessage('Failed to upload some images. Please try again.');
    //   } else {
    //     // Image upload successful
    //     setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    //     setErrorMessage(null);
    //   }
    // } catch (error) {
    //   // Error occurred during upload
    //   setErrorMessage('Failed to upload images. Please try again.');
    // }


    setSelectedFiles(files);
    // If there is an error, set the error state
    setErrorMessage('There was an error uploading the image.');
  };
 
  // HANDLE FORM SUBMISSION
  const handleSubmit = async () => {
    console.log("SAVING IMAGES!")

    //Create Carousel intance in the databse first before uploading the pictures
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

        setPictures(createdPictures);
 
        pictures.forEach(pic => {
          console.log(pic);
        })
    }
    catch(error) {
      console.error("Something went wrong: ", error.errorMessage)
    }

    navigate('/carousel/imageCarousel');
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
   * Function to create an save a new Carousel into the database
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

      console.log(data.createCarousel);
      
      setCarousel(data.createCarousel);

    }
    catch(error) {
      console.error("Something went wrong: ", error)
    }

  }



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
        content: "Save",
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

      {/* TITLE OF THE IMAGE CAROUSEL */}
      <Form>
        <FormLayout>
          
          <div>
            <TextField
              label="Title"
              type="text"
              onChange={handleFormTitleChange}
              value={title}
              helpText="enter the Title of the carousel"
              autoComplete='off'
            />
          </div>

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
            <Text>upload Carousel Images</Text>
            <DropZone
              accept="image/*"
              dropOnPage
              onDrop={handleDrop}
            >
              {renderThumbnails}
              {fileUpload}
              {/* <DropZone.FileUpload 
                actionTitle="Add files"
                actionHint="or drag and drop"
              />
              {selectedFiles.length > 0 && (
                <DropZone.FileUpload.ThumbnailDetails
                  title={`${selectedFiles.length} ${selectedFiles.length > 1 ? 'files' : 'file'} selected`}
                >
                  
                </DropZone.FileUpload.ThumbnailDetails>
              )} */}
            </DropZone>
          </div>
        </FormLayout>
      </Form>
    </Page>
  );
}
