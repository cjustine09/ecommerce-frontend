import React from 'react'; // Import React library
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route components from react-router-dom
import LoginForm from './components/LoginForm'; // Import LoginForm component
import ProductManagement from './components/ProductManagement'; // Import ProductManagement component

function App() {
    return (
        <Routes> {/* Define the routing for the application */}
            <Route path="/" element={<LoginForm />} /> {/* Route for the home path, renders the LoginForm component */}
            <Route path="/ProductManagement" element={<ProductManagement />} /> {/* Route for Product Management, renders the ProductManagement component */}
        </Routes>
    );
}

export default App; // Export the App component as the default export