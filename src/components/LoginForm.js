import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Container, Card, Spinner, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

// FUNCTION OF LOGIN FORM
function LoginForm() {
    // State variables for email, password, error message, loading status
    const [email, setEmail] = useState(""); // State to store the email input
    const [password, setPassword] = useState(""); // State to store the password input
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
    const [loading, setLoading] = useState(false); // State to indicate loading status
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility 
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Effect to check if user is already logged in
    useEffect(() => {
        // If user info is found in local storage, navigate to ProductManagement
        if (localStorage.getItem('user-info')) {
            navigate("/ProductManagement");
        }
    }, [navigate]); // Dependency array to avoid infinite loop

    // Function to handle login
    const login = async () => {
        // Clear previous error message
        setErrorMessage("");
        setLoading(true); // Start loading indicator

        // Validate inputs
        if (!email || !password) {
            setErrorMessage("Please fill in both fields."); // Show error if fields are empty
            setLoading(false); // Stop loading
            return; // Exit function
        }

        // Create an object with the email and password properties
        let item = { email, password };

        // Initiating a POST request to the login API endpoint
        try {
            let result = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST", // HTTP method
                headers: {
                    "Content-Type": "application/json", // Content type of the request
                    "Accept": "application/json" // Expected response type
                },
                body: JSON.stringify(item) // Convert item to JSON string
            });

            // Check if the response is not okay
            if (!result.ok) {
                throw new Error('Login failed'); // Throw error if login fails
            }

            result = await result.json(); // Parse the JSON response

            // Check for error in the response
            if (result.error) {
                setErrorMessage("INVALID CREDENTIALS. PLEASE TRY AGAIN"); // Set error message for invalid credentials
                setLoading(false); // Stop loading
                return; // Exit function
            }

            // Store user info in local storage
            localStorage.setItem("user-info", JSON.stringify(result));
            setLoading(false); // Stop loading before navigating
            navigate("/ProductManagement"); // Navigate to ProductManagement
        } catch (error) {
            console.error("Login failed:", error); // Log the error
            setErrorMessage("Invalid Input. Please try again."); // Handle unexpected errors
            setLoading(false); // Stop loading
        }
    };

    // Render a centered admin login form within a styled card
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="bg-light text-dark shadow-lg" style={{ width: '600px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <h1 className='text-center pt-5 font-weight-bold'>ADMIN LOGIN</h1>
                
                <Card.Body className='p-5'>
                    {loading ? ( // Show loading spinner if loading is true
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="dark" />
                        </div>
                    ) : (
                        <Form>
                            {errorMessage && ( // Show error message if it exists
                                <Alert variant="danger" className="mt-3">
                                    {errorMessage}
                                </Alert>
                            )}
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="font-weight-bold">Email address</Form.Label>
                            <InputGroup>
                            <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-light text-dark"
                            />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label className="font-weight-bold">Password</Form.Label>
                            <InputGroup>
                            <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLock} />
                                </InputGroup.Text>

                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-light text-dark"
                                />
                                <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>


                            <Button
                                variant="dark" // Button variant
                                type="button" // Button type
                                onClick={login} // Call login function on click
                                className="w-100 mt-3" // Styling
                            >
                                Login
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;