import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "../EmployeeConnecting/StyleSheets/Global.css";
import SignUp from "../EmployeeConnecting/SignUp";
import AuthenticationEmployer from "../EmployerConnecting/AuthenticationEmployer";
import RegistrationEmployer from "../EmployerConnecting/RegesitrationEmployer";
import Modal from "react-modal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserDash from "../PostedContent/UserDash";
import Login from "../EmployeeConnecting/Login";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [registrationType, setRegistrationType] = useState("employee");
  const [loginType, setLoginType] = useState("employee");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.status === 200) {
        window.location.href = "/login";
        console.log("logout successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegistrationType = (type) => {
    setRegistrationType(type);
  };
  const handleLoginType = (type) => {
    setLoginType(type);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-wrap items-center justify-between px-4 py-3`}>
      <div>
        <p className="text-4xl p-4 font-extrabold LogoFinished">
          Career<span className="font-extrabold text-green-700">Pilot.com</span>
        </p>
      </div>
      <div
        className={`flex gap-4 justify-start float-left ${
          isMobile ? "w-full  flex mt-4" : "w-auto"
        }`}
      >
        {!isMobile && (
          <ul className="flex space-x-7 items-center justify-center">
            <Link to={"/"}>
              <li className="font-semibold  text-md">Home</li>
            </Link>
            <li className="font-semibold  text-md" onClick={openModal}>
              Find Jobs
            </li>
            <li className="font-semibold  text-md" onClick={openModal}>
              Companies
            </li>
          </ul>
        )}
        {isMobile && (
          <div className="flex w-full justify-end -mt-[5rem]">
            <GiHamburgerMenu
              className="inline-block top-0 text-3xl "
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </div>
        )}
        <div className=" space-x-5 hidden md:flex">
          <button
            onClick={openLoginModal}
            className="hover:border-[#000000]  border-[1px]    font-semibold    text-sm  py-3 px-6  text-[#000000]"
          >
            Login
          </button>
          <button
            onClick={openModal}
            className="bg-green-700 font-semibold  text-sm hover:bg-black py-3 px-6  text-white"
          >
            Sign up
          </button>
        </div>
      </div>
      {isMobile && toggle && (
        <ul className="flex space-x-7 items-center justify-center">
          <li className="font-semibold  text-md border-b-1 border-black">
            Home
          </li>
          <li className="font-semibold  text-md " onClick={openModal}>
          Find Jobs
          </li>
          <li className="font-semibold  text-md " onClick={openModal}>
          Companies
          </li>

          <div
            className={` gap-2 ${
              isMobile ? "w-full justify-between  mt-4" : "w-auto"
            }`}
          >
            <div className=" w-full justify-end items-center">
              {toggle && (
                <div className=" space-x-5">
                  <button
                    onClick={openLoginModal}
                    className="hover:border-[#000000] border-[1px]  font-semibold    text-sm  py-3 px-6  text-[#000000]"
                  >
                    Login
                  </button>

                  <button
                    onClick={openModal}
                    className="bg-green-700  font-semibold   text-sm hover:bg-black py-3 px-6  text-white"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        </ul>
      )}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Registration Modal"
        className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-md p-4"
        overlayClassName="Overlay fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <div className="RegistrationForm bg-white rounded-md  p-4">
          <div className="flex justify-end">
            <button className="text-gray-600" onClick={closeModal}>
              &#x2715;
            </button>
          </div>
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mt-7 mb7">
            Choose Registration Type
          </h2>
          <div className="flex justify-center">
            <div className="flex justify-between mx-6 border-[1px] border-blue-600 mt-7 mb-7 flex-wrap">
              <div
                className={`py-2 px-5 flex items-center justify-center ${
                  registrationType === "employer"
                    ? "w-full md:w-1/2 bg-blue-600 text-white"
                    : "w-full md:w-auto text-gray-600"
                }`}
                onClick={() => navigate("/empregistration")}
              >
                Employer
              </div>
              <div
                className={`py-2 px-5 ${
                  registrationType === "employee"
                    ? "flex items-center justify-center w-full md:w-1/2 bg-blue-600 text-white"
                    : "text-black flex items-center justify-center w-full md:w-auto"
                }`}
                onClick={() => handleRegistrationType("employee")}
              >
                Employee
              </div>
            </div>
          </div>

        
          <div className="RegistrationContent">
            {registrationType === "employee" && <SignUp />}
    
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showLoginModal}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-md p-4"
        overlayClassName="Overlay fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
        closeTimeoutMS={300}
        ariaHideApp={false}
      >
        <div className="LoginContent bg-white rounded-md p-4">
          <div className="flex justify-end">
            <button className="text-gray-600" onClick={closeLoginModal}>
              &#x2715;
            </button>
          </div>
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold mt-7 mb7">
            Choose Login Type
          </h2>

          <div className="flex justify-center">
            <div className="flex justify-between mx-6 border-[1px] border-blue-600 mt-7 mb-7 flex-wrap">
              <div
                className={`py-2 px-5 flex items-center justify-center ${
                  loginType === "employer"
                    ? "w-full md:w-1/2 bg-blue-600 text-white"
                    : "w-full md:w-1/2 text-gray-600"
                }`}
                onClick={() => handleLoginType("employer")}
              >
                Employer
              </div>
              <div
                className={`py-2 px-5 ${
                  loginType === "employee"
                    ? "flex items-center justify-center w-full md:w-1/2 bg-blue-600 text-white"
                    : "text-black flex items-center justify-center w-full md:w-1/2"
                }`}
                onClick={() => handleLoginType("employee")}
              >
                Employee
              </div>
            </div>
          </div>

          <div className="LoginContent">
            {loginType === "employee" && <Login />}
            {loginType === "employer" && <AuthenticationEmployer />}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingNavbar;
