# React + Vite

- Currently, to retrieve and display the data on-screen, you will need to click the "Get Data" button, and then the "Show Data" button. The "Log Data" button will show a console output of the full items retrieved from the API
- The API key attached to this project has a maximum of 250 calls per day, if you encounter a display issue after it has been working before, it is possible that limit has been reached.

## Please note this is a work-in-progress application. Some functionality may be minimal or not yet implemented, and files may not be optimized fully.

To run the container, you should be able to use the following commands to start the app: <br />
- `docker build -t api-viewer .` (This may take a couple minutes) <br />
- `docker run -p 5173:5173 --name api-viewer api-viewer` <br />
- Once it has finished loading and the app is running, navigate to `http://localhost:5173/` to interact with the app.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
