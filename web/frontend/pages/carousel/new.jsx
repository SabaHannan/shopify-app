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
// import { SlickImages } from '../../components/SlickImages';

export default function ManageCode() {
  // TRANSLATION
  const { t } = useTranslation();
  // USER IMAGES
  const [selectedFiles, setSelectedFiles] = useState([]);
  // ERROR MESSAGE
  const [errorMessage, setErrorMessage] = useState(null);
  // FORM TITLE
  const [title, setTitle] = useState([]);
  // TO ROUTE TO A DIFFERENT PAGE IN APP
  const navigate = useNavigate();


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
  const handleSubmit = () => {
    console.log("SAVED!")
    // Redirect to a different page within the app
    navigate('/carousel/imageCarousel');
    console.log("NOW WE HERE!")
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
          {console.log("URL: " + URL.createObjectURL(file))}
          {/* Div to display the caption of the thumbnails */}
          <div>
            {file.name} <Text variant="bodySm" as='p'>{file.size} bytes</Text>
            {console.log("file name" + file.name)}
          </div>
        </div>
      ))}
    </div>
  );

  // HANDLE FORM TITLE CHANGE 
  const handleFormTitleChange = (value) => setTitle(value);

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
          <TextField
            label="Title"
            type="text"
            onChange={handleFormTitleChange}
            value={title}
            helpText="This title will not be visible on your Store."
            autoComplete='off'
          />
        
          {/* IMAGE UPLOADING */}
          <div>
            <Text>Upload images</Text>
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
      <div>
        {/* <SlickImages /> */}
      </div>
    </Page>
  );
}
