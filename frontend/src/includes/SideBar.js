import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  let location = useLocation();
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="user-panel d-flex" style={{ backgroundColor: 'white', height: '3.5rem', width: '16.1rem', marginLeft: '-0.5rem' }}>
          {/* For Small Logo */}
          <img src="https://hiring.cogentlab.com/ed/public/alldocs/images/logo_1.png" alt="AdminLTE Logo" className="brand-image-xs logo-xs mt-0.1" style={{ height: '2rem', width: '2.6rem' }} />
          {/* For Big Logo */}
          <img src="https://ems.cogentlab.com/erpm/Style/images/Cogent.png" alt="AdminLTE Logo" className="brand-image-xl logo-xl" style={{ height: '2rem', width: '9.5rem', marginLeft: '2rem' }} />
        </div>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page"><i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/usermanagement" className={`nav-link ${location.pathname === "/usermanagement" ? "active" : ""}`} aria-current="page"><i className="nav-icon fas fa-user" />
                  <p>User Management</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upload" className={`nav-link ${location.pathname === "/upload" ? "active" : ""}`} aria-current="page"><i className="nav-icon fas fa-upload" />
                  <p>Upload Data</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className={`nav-link ${location.pathname === "/search" ? "active" : ""}`} aria-current="page"><i className="nav-icon fas fa-search" />
                  <p>Search</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/report" className={`nav-link ${location.pathname === "/report" ? "active" : ""}`} aria-current="page"><i className="nav-icon fas fa-file" />
                  <p>Report</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}

export default SideBar
