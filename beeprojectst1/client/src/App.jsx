import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/EmployeeConnecting/Navbar";
import MainHeaderStyled from "./components/EmployeeConnecting/MainHeaderStyled";
import SignUp from "./components/EmployeeConnecting/SignUp";
import Login from "./components/EmployeeConnecting/Login";
import About from "./components/EmployeeConnecting/About";
import Contact from "./components/EmployeeConnecting/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationEmployer from "./components/EmployerConnecting/RegesitrationEmployer";
import AuthenticationEmployer from "./components/EmployerConnecting/AuthenticationEmployer";
import Careers from "./components/EmployeeConnecting/Careers";
import MainHeaderEmployer from "./components/EmployerConnecting/MainHeaderEmployer";
import HeroSection from "./components/LandingDisplayed/HeroSection";
import AboutEmployer from "./components/EmployerConnecting/AboutEmployer";
const App = () => {
  return (
    <Router>
      <>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* <Navbar/> */}
        {/* <RegistrationEmployer/>
      <AuthenticationEmployer/> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/main" element={<MainHeaderStyled />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emplogin" element={<AuthenticationEmployer/>}/>
          <Route path="/employerMain" element={<MainHeaderEmployer />} />
          <Route path="/about-employer" element={<AboutEmployer/>}/>
          <Route path="/careers" element={<Careers />} />
          <Route path="/empregistration" element={<RegistrationEmployer />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
