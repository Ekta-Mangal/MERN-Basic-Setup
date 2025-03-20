import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const error_msg = "This field is required";
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (data) => {
        let headersList = {
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "username": data.name,
            "email": data.email,
            "password": data.password
        });

        let responseData = null;

        try {
            let response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            responseData = await response.json();
            if (responseData.message === 'Success') {
                toast.success('User created successfully');
                setTimeout(() => {
                    navigate('/usermanagement');
                }, 2000);
            } else {
                toast.error("User is already exists, Please try with another");
            }
        } catch (error) {
            console.error(error);
            alert(responseData.message);
        }
    };


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="card card-danger card-outline" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)', padding: '10px', borderTop: '3px solid #007bff' }}>
                                    <h3>Add User</h3>
                                    <hr />
                                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '15px' }}>
                                        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                                            <div style={{ flex: 1 }}>
                                                <label htmlFor="name" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Name:</label>
                                                <input
                                                    type="text"
                                                    name="name"

                                                    placeholder='Enter name'
                                                    id="name"
                                                    {...register("name", { required: error_msg, maxLength: 80 })}
                                                    style={{ width: '100%', padding: '8px', height: '40px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                />
                                                {errors.name && <span style={{ fontSize: '10px', color: 'red', display: 'block', marginTop: '4px' }}>{errors.name.message}</span>}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Email:</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    placeholder='Enter email'
                                                    id="email"
                                                    {...register("email", {
                                                        required: error_msg, pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: 'Please enter a valid email'
                                                        }
                                                    })}
                                                    style={{ width: '100%', padding: '8px', height: '40px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <span style={{ fontSize: '10px', color: 'red', display: 'block', marginTop: '4px' }}>{errors.email.message}</span>}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                            <div style={{ flex: 1 }}>
                                                <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Password:</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder='Enter password'
                                                    id="password"
                                                    {...register("password", {
                                                        required: "This field is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must be at least 8 characters"
                                                        }
                                                    })}
                                                    style={{
                                                        width: '49%', padding: '8px', height: '40px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'Arial, sans-serif'
                                                    }}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <span style={{ fontSize: '10px', color: 'red', display: 'block', marginTop: '4px' }}>{errors.password.message}</span>}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: "12px" }}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />

        </div>
    )
}

export default Create;
