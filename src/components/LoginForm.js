import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';

//FUNCTION OF LOGIN FORM
function LoginForm() {
    const [email, setEmail] = useState(""); //State set email
    const [password, setPassword] = useState(""); //State set password
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/ProductManagement");
        }
    }, [navigate]);

    const login = async () => {
        // Clear previous error message
        setErrorMessage("");

        // Validate inputs
        if (!email || !password) {
            setErrorMessage("Please fill in both fields."); // Show error for empty fields
            return;
        }
        // Create an object  with the email and password properties

        let item = { email, password };

        // Initiating a POST request to the login API endpoint
        try {
            let result = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!result.ok) {
                throw new Error('Login failed');
            }

            result = await result.json();

            // Assuming the API returns an error message when credentials are invalid
            if (result.error) {
                setErrorMessage("INVALID CREDENTIALS. PLEASE TRY AGAIN"); // Set error message for invalid credentials
                return;
            }

            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/ProductManagement"); // Navigate to ProductManagement
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Invalid Input. Please try again."); // Handle unexpected errors
        }
    };

    // renders a centered admin login form within a styled card
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="bg-light text-dark shadow-lg" style={{ width: '600px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h1 className='text-center pt-5 font-weight-bold'>ADMIN LOGIN</h1>
                <Card.Body className='p-5'>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="font-weight-bold">Email address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-light text-dark" 
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label className="font-weight-bold">Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-light text-dark" 
                            />
                        </Form.Group>

                        <Button variant="dark" onClick={login} className="mt-3 w-100">
                            Login
                        </Button>
                    </Form>

                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;
