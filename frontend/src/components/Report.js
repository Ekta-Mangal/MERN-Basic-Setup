import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import 'react-datepicker/dist/react-datepicker.css';
import IconButton from '@mui/material/IconButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Report = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const handleSearch = async (event) => {
        event.preventDefault();

        if (!selectedDate) {
            toast.error('Please select a date.');
            return;
        }

        // console.log(selectedDate);
        const date = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        const dateFormatted = date.toISOString().split('T')[0];
        // console.log(dateFormatted);
        let token = localStorage.getItem('token');
        let headersList = {
            "Authorization": `Bearer ${token}`
        }

        try {
            let response = await axios.get(`http://localhost:5000/api/upload/getDataByDate/${dateFormatted}`, {
                headers: headersList
            });

            if (response.status === 200) {
                setData(response.data.data);

                // Download CSV
                const headings = 'ID,State,Pincode\n';
                const csv = `${headings}${response.data.data.map(item => `${item.id},${item.state},${item.pincode}`).join('\n')}`;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Error fetching data:', response.statusText);
                toast.error('Data Not Found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data.');
        }
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Report</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary card-outline">
                                <form id="searchinputform" onSubmit={handleSearch}>
                                    <div className="form-group col-md-9">
                                        <br />
                                        <div className="input-group col-md-10">
                                            <IconButton
                                                color="black"
                                                style={{ marginBottom: '10px' }}
                                            >
                                                <CalendarTodayIcon />
                                            </IconButton>

                                            <DatePicker
                                                className='form-control'
                                                placeholderText=" Click to select a date"
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                            />

                                            <div className="col-md-2">
                                                <button type="submit" id="searchsubmit" className="btn btn-block btn-primary">
                                                    <i className="fa fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Report;
