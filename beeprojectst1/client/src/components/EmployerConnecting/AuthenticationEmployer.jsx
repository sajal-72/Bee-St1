import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthenticationEmployer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuccess = () => {
    toast.success("Login Successful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/employerMain"); // Redirect to the homepage after successful login
  };

  const postData = async () => {
    try {
      const { email, password } = formData;
      const res = await axios.post("/signinemployer", {
        email,
        password,
      });

     if (res.status === 201) {
        console.log("Login successful");
        handleSuccess();
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Invalid Credentials");
        toast.error("Invalid Credentials. Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response.status === 422) {
        console.log("Invalid Password");
        toast.error("Invalid Password. Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.error("Error occurred during login:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
    console.log(formData);
  };

  return (
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
    
    <form onSubmit={handleSubmit} className="p-4">
      <div >
        <label htmlFor="email" className="font-semibold py-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 mb-4" // Apply classes here
        />
      </div>
      <div>
        <label htmlFor="password" className="font-semibold py-2">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md mb-4 p-2" // Apply classes here
        />
      </div>
      <button className="w-full bg-blue-600 hover:bg-black text-white py-2" type="submit">Login</button>
    </form>
  </div>
  );
};

export default AuthenticationEmployer;


