import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  
  const postData = async () => {
    try {
      const { name, email, phone, work, password, cpassword } = formData;
      const response = await axios.post("/register", {
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      if (response.status === 200 || response.status === 201) {
        handleToast("success", "Registration successful");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 422) {
        handleToast("error", "Invalid registration");
      } else if (error.response.status === 406) {
        handleToast("error", "Please fill all the fields");
      } else {
        console.error("Error occurred during registration:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
  };

  return (
    <div className="flex items-center justify-center  px-4 sm:px-6  ">
      <div className="max-w-md w-full ">
        <div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      
          <form onSubmit={handleSubmit} className="space-y-4 mt-0">
            <div className="flex space-x-5">
            <div>
              <label className="font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            </div>
            <div className="flex space-x-5">
            <div>
              <label className="font-semibold mb-2" htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="font-semibold mb-2" htmlFor="work">Work</label>
              <input
                type="text"
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            </div>
            <div>
              <label className="font-semibold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="font-semibold mb-2" htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            {/* Repeat similar structure for other input fields */}
            <Link to={"/login"}><button
              type="submit" onClick={handleSubmit}
              className="w-full py-2 px-4 bg-green-500 text-white hover:bg-green-600 rounded-3xl hover:translate-y-1 transition duration-300"
            >
              Register
            </button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
