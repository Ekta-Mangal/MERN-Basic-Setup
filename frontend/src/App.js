import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './includes/Header';
import Footer from './includes/Footer';
import SideBar from './includes/SideBar';
import Home from './includes/Home';
import Login from './components/Login';
import User from './users/User';
import 'react-toastify/dist/ReactToastify.css';
import Upload from './upload/Upload';
import Search from './components/Search';
import Report from './components/Report';
import Create from './users/Create';
import EditUser from './users/EditUser';

const DefaultLayout = ({ children }) => (
  <div className="wrapper">
    <Header />
    <SideBar />
    {children}
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route>
          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>}></Route>
          <Route path="/usermanagement" element={<DefaultLayout><User /></DefaultLayout>}></Route>
          <Route path="/create" element={<DefaultLayout><Create /></DefaultLayout>}></Route>
          <Route path="/edit/:id" element={<DefaultLayout><EditUser /></DefaultLayout>} />
          <Route path="/upload" element={<DefaultLayout><Upload /></DefaultLayout>}></Route>
          <Route path="/search" element={<DefaultLayout><Search /></DefaultLayout>}></Route>
          <Route path="/report" element={<DefaultLayout><Report /></DefaultLayout>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
