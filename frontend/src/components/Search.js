import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        let token = localStorage.getItem('token');
        let headersList = {
            "Authorization": `Bearer ${token}`
        }

        try {
            let response = await fetch(`http://localhost:5000/api/users/${searchInput}`, {
                method: "GET",
                headers: headersList
            });

            if (response.ok) {
                let data = await response.json();
                const dataArray = Array.isArray(data) ? data : [data];
                const dataWithSerialNumbers = dataArray.map((item, index) => ({ ...item, serialNo: index + 1 }));
                setFilteredUsers(dataWithSerialNumbers);
            } else {
                console.error('Error fetching data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const columns = [
        { field: 'serialNo', headerName: 'S No', width: 100 },
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'username', headerName: 'Name', width: 190 },
        { field: 'email', headerName: 'Email', width: 300 },
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
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Search</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary card-outline">
                                <form id="searchinputform" onSubmit={handleSearch}>
                                    <div className="form-group col-md-9">
                                        <br />
                                        <div className="input-group col-md-10">
                                            <input
                                                type="text"
                                                className="form-control float-right"
                                                id="searchinput"
                                                placeholder="Enter ID for search"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                required
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
            {filteredUsers.length > 0 && (
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="card card-primary card-outline">
                                    <div className="card-body">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-6 d-flex justify-content-start">
                                                <h5>Data</h5>
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
                </section>
            )}
            <ToastContainer />
        </div>
    );
}

export default Search;
