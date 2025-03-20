import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  let navigate = useNavigate();
  const [userName] = useState('Cogent');
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleDelete = () => {
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn" data-widget="pushmenu"><i className="fas fa-bars" /></button>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <button className="nav-link btn mr-4" data-toggle="dropdown">
              <i className="far fa-user mr-2"></i>
              {userName}
            </button>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right mr-3 mb-1">
              <button onClick={toggleModal} className="dropdown-item btn" style={{ fontSize: "12px" }}>
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h4 className="modal-title">Confirm Logout</h4>
                <button type="button" className="close" style={{ color: '#ffffff' }} onClick={toggleModal} aria-hidden="true">
                  <span>&times;</span>
                </button>
              </div>
              <div className="card-body">
                <div className="modal-body">
                  <p>Are you sure you want to logout?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleDelete}>Okay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
