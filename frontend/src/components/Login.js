import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(credentials.email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError("");
        }

        fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    toast.success("Logged In Successfully");
                    navigate("/");
                } else {
                    toast.error("Invalid Credentials");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Something went wrong, please try again later");
            });
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div className='card' style={{
                width: "550px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                backgroundColor: "#fff"
            }}>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center align-items-center vh-10 mb-4">
                        <img
                            src="https://cogentems.in/erpm/Style/images/Cogent.png"
                            alt="Loading images..."
                            style={{ width: '160px', height: '70px' }}
                        />
                    </div>

                    <div className="form-group">
                        <div className="my-3">
                            <label htmlFor="email" className="form-label">User email</label>
                            <input
                                onChange={onChange}
                                value={credentials.email}
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                            />
                            {emailError && <div className="error-message" style={{ fontSize: '10px', color: 'red' }}>{emailError}</div>}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                onChange={onChange}
                                value={credentials.password}
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                            />
                        </div>
                    </div>

                    <div className="btn-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
