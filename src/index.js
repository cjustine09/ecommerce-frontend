// Importing necessary libraries and components
import React from 'react'; // Importing React
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import './index.css'; // Importing custom CSS styles
import App from './App'; // Importing the main App component
import reportWebVitals from './reportWebVitals'; // Importing performance measuring tool
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import { BrowserRouter } from 'react-router-dom'; // Importing BrowserRouter for routing

// Creating a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application within React.StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapping the App with BrowserRouter for routing capabilities */}
      <App /> {/* Rendering the main App component */}
    </BrowserRouter>
  </React.StrictMode>
);

// Measuring performance and logging results
reportWebVitals();