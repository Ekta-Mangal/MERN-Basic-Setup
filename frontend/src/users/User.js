import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ auth, success }) {
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/')
            .then(response => response.json())
            .then(data => {
                // Add serial numbers to the data
                const dataWithSerialNumbers = data.map((item, index) => ({ ...item, serialNo: index + 1 }));
                setUsersData(dataWithSerialNumbers);
                setFilteredUsers(dataWithSerialNumbers);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
        console.log(`Edit user with id: ${id}`);
    };

    const handleDelete = (id) => {
        let token = localStorage.getItem('token');
        let headersList = {
            "Authorization": `Bearer ${token}`
        }

        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
            headers: headersList
        })
            .then(response => {
                if (response.ok) {
                    toast.success('User deleted successfully');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    setUsersData(usersData.filter(user => user.id !== id));
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('Error deleting user');
            });
    };

    const navigate = useNavigate();

    const columns = [
        { field: 'serialNo', headerName: 'S No', width: 100 },
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'username', headerName: 'Name', width: 190 },
        { field: 'email', headerName: 'Email', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEdit(params.row.id)}
                        style={{ marginRight: '5px' }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleDelete(params.row.id)}
                        style={{ color: '#C30000' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="card card-primary card-outline">
                                        <div className="card-body">
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6 d-flex justify-content-start">
                                                    <h5>User Data</h5>
                                                </div>
                                                <div className="col-6 d-flex justify-content-end">
                                                    <Link to="/create">
                                                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='mt-3'>
                                                <DataGrid
                                                    rows={filteredUsers}
                                                    columns={columns}
                                                    getRowId={(row) => row.id}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: {
                                                                pageSize: 10,
                                                            },
                                                        },
                                                    }}
                                                    density="compact"
                                                    pageSizeOptions={[10]}
                                                    disableRowSelectionOnClick
                                                    slots={{ toolbar: CustomToolbar }}
                                                />
                                            </div>
                                        </div>
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
}
