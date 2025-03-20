import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            let token = localStorage.getItem('token');
            let headersList = {
                "Authorization": `Bearer ${token}`
            }

            try {
                let response = await fetch(`http://localhost:5000/api/users/${id}`, {
                    method: "GET",
                    headers: headersList
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let headersList = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "username": userData.username,
            "email": userData.email,
        });

        try {
            let response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: "PUT",
                body: bodyContent,
                headers: headersList
            });
            let data = await response.json();
            if (data.message === 'User Updated Successfully') {
                toast.success('User Updated Successfully');
                setTimeout(() => {
                    navigate('/usermanagement');
                }, 2000);
            } else if (data.message === 'Email already exists') {
                toast.error('Email already exists');
            } else {
                toast.error('Error updating user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="card card-danger card-outline" style={{ boxShadow: '0 4px 6px rgb(221, 204, 240)', borderTop: '3px solid #007bff', backgroundColor: '#fff', borderRadius: '8px', padding: '20px' }}>
                                        <h3>Edit User</h3>
                                        <hr />
                                        <form onSubmit={handleSubmit}>
                                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <label htmlFor="username">Name:</label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={userData.username}
                                                        onChange={handleChange}
                                                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                                                    />
                                                </div>

                                                <div style={{ flex: 1 }}>
                                                    <label htmlFor="email">Email:</label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={userData.email}
                                                        onChange={handleChange}
                                                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
                                                    />
                                                    {error && <span style={{ color: 'red', fontSize: '10px' }}>{error}</span>}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    );
};

export default EditUser;
