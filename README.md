[Live Demo](http://localhost:3000) 

## How to run

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the application
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to run tests
Run `npm test` to run all tests

### How to build
Run `npm run build` to build the application

## Approach

When the app starts, it first sets up a canvas with a default background and counts the amount of red pixels, storing these values. The drag and drop feature is managed with a custom React hook.

The magic happens when you drop them; it redraws the SVGs onto the canvas and updates the count of red pixels using ImageData.

### Limitations
* Draggable element should not have red pixels
* Touch gestures are not supported
* Window resizing is not supported
* Draggable component is not fully accessible