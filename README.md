# Project Overview
This application includes functionality where clicking on a card displays an image as an overlay in the center of the webpage. The overlay can be closed by pressing the ESC key or by clicking outside the image. This interactive feature was implemented using React hooks, particularly the useEffect hook, which listens for keydown events to detect when the ESC key is pressed and for data management redux is used.

To handle backend operations, I used a JSON server to simulate a simple REST API. The application fetches data from the server and displays it on the frontend.

# Running the Project
To get started, ensure you have both the frontend and the backend running. Follow these steps:

# Backend (JSON Server)
Run the JSON server with the following command:

Copy code
### `npx json-server ./server/db.json --port 8000 --watch`
This will launch the backend on `port 8000` and watch for any changes to db.json.

# Frontend
In the project directory, run the following command to start the React app:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Thought Process
The goal of this project was to create an interactive user experience where clicking on a card shows an image overlay and allows the user to close it easily. I opted to handle closing the overlay by both detecting a click outside of the image and listening for the ESC key press.