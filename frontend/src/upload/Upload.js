import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const fileTypes = ['text/csv'];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setMessage(selectedFile.name);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid file (csv).');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file.');
            return;
        }

        let token = localStorage.getItem('token');
        let headersList = {
            "Authorization": `Bearer ${token}`
        };

        let bodyContent = new FormData();
        bodyContent.append("file", file);

        try {
            let response = await fetch("http://localhost:5000/api/upload/upload_file", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            await response.json();
            // let data = await response.json();

            toast.success('File uploaded successfully');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            setError('');
            setFile(null);
            setMessage('');
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
        }
    };


    const handleDownloadFormat = () => {
        const link = document.createElement('a');
        link.href = './format.csv'; // Path to the file in the public directory
        link.download = 'format.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Upload Data</h1>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col">
                            <div className="card card-primary card-outline">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <div className="col-12">
                                            <div className="container p-1">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="row align-items-center" style={{ position: 'relative' }}>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="fileUpload"></label>
                                                                <input type="file" className="form-control" id="fileUpload" onChange={handleFileChange} />
                                                                {error && <small className="form-text text-danger" style={{ position: 'absolute', top: '100%', marginTop: '2px' }}>{error}</small>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 d-flex justify-content-start align-items-center">
                                                            <button type="submit" className="btn btn-primary" style={{ marginTop: '6px', marginRight: '20px' }}>Upload File</button>
                                                        </div>
                                                        <div className="col-md-3 d-flex justify-content-start align-items-center">
                                                            <div className="download-link d-flex align-items-center" onClick={handleDownloadFormat} style={{ cursor: 'pointer', marginTop: '6px', marginRight: '20px' }}>
                                                                <i className="fas fa-download"></i>
                                                                <span style={{ color: "#026ECE", marginLeft: '2px' }}>Download format</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className="mb-0">{message}</p>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="content">
                <div className="container-fluid">

                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default Upload;
