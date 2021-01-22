# Comiko

Web based comic book (cbr) reader written in angular.
The app allows user to upload his own comic book files.
The uploaded files appear on the Library view and can be opened for reading.

## Frontend
### Implementation details
#### Comics Module
Represents the main part of the app.
Contains the Library view, where the client can see his comic collection.
Items can be added to the library via the "+ Create comic" button which will open the upload sidenav.
Clicking on a library item will take the user to the **Reader page**

##### Reader page
Consists of 2 areas:
1. Thumbnail Navigation
    - shows thumbnails of all pages in the comic book file
    - the thumbnails are loaded as images only if they are visible 
    in the Thumbnail Navigation container, to improve app responsiveness
        - [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
2. Reader View
    - loads the current page of the comic for viewing
    - has actions to navigate through the comic book

#### Upload Module
The upload module is self-contained and can be picked up
and used in a different Angular app. It has support for displaying upload progress.

## Backend
The backend part of the app is build using [NestJS](https://nestjs.com/)
It consists of 2 modules: Comics Module and Upload Module
The upload process will take in the file and save it under ./public/upload, returning the path to the file.

After the comic book details are submitted, the cbr file will be unzipped and
the first image will be used as the thumbnail of the comic in the library.
The comic model is saved, and the response is sent to the frontend.

## Local setup
### Backend
```shell script
# navigate to the backend project
cd ./comiko-be

# install dependencies
npm i

# start the server in dev mode
# configuration is found in ./config dir
npm run start:dev

# start server normally
npm start
```

### Frontend
```shell script
# navigate to the frontend project
cd ./comiko-fe

# install dependencies
npm i

# serve the angular app
npm start
```

