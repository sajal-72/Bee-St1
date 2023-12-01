import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationEmployer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
    companyInformation: {
      companyName: '',
      industry: '',
      companySize: 0,
    },
    contactInformation: {
      contactName: '',
      contactTitle: '',
      contactEmail: '',
      contactPhone: '',
    },
    companyAddress: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/emplogin")
    // Perform form validation here before submission
    // Example: Check if required fields are filled, validate email/phone, match passwords, etc.

    try {
      const response = await fetch('/employerregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Employer Registration Form</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Work */}
      <div className="mb-4">
        <label htmlFor="work" className="block mb-1 font-medium">Work</label>
        <input
          type="text"
          id="work"
          name="work"
          value={formData.work}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="cpassword" className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Company Information */}
      <h2 className="text-xl font-semibold mb-2">Company Information</h2>
      <div className="mb-4">
        <label htmlFor="companyName" className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyInformation.companyName"
          value={formData.companyInformation.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="industry" className="block mb-1 font-medium">Industry</label>
        <input
          type="text"
          id="industry"
          name="companyInformation.industry"
          value={formData.companyInformation.industry}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="companySize" className="block mb-1 font-medium">Company Size</label>
        <input
          type="number"
          id="companySize"
          name="companyInformation.companySize"
          value={formData.companyInformation.companySize}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <div className="mb-4">
        <label htmlFor="contactName" className="block mb-1 font-medium">Contact Name</label>
        <input
          type="text"
          id="contactName"
          name="contactInformation.contactName"
          value={formData.contactInformation.contactName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="contactTitle" className="block mb-1 font-medium">Contact Title</label>
        <input
          type="text"
          id="contactTitle"
          name="contactInformation.contactTitle"
          value={formData.contactInformation.contactTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="contactEmail" className="block mb-1 font-medium">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactInformation.contactEmail"
          value={formData.contactInformation.contactEmail}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="contactPhone" className="block mb-1 font-medium">Contact Phone</label>
        <input
          type="tel"
          id="contactPhone"
          name="contactInformation.contactPhone"
          value={formData.contactInformation.contactPhone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      {/* Company Address */}
      <h2 className="text-xl font-semibold mb-2">Company Address</h2>
      <div className="mb-4">
        <label htmlFor="streetAddress" className="block mb-1 font-medium">Street Address</label>
        <input
          type="text"
          id="streetAddress"
          name="companyAddress.streetAddress"
          value={formData.companyAddress.streetAddress}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block mb-1 font-medium">City</label>
        <input
          type="text"
          id="city"
          name="companyAddress.city"
          value={formData.companyAddress.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block mb-1 font-medium">State</label>
        <input
          type="text"
          id="state"
          name="companyAddress.state"
          value={formData.companyAddress.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="postalCode" className="block mb-1 font-medium">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="companyAddress.postalCode"
          value={formData.companyAddress.postalCode}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block mb-1 font-medium">Country</label>
        <input
          type="text"
          id="country"
          name="companyAddress.country"
          value={formData.companyAddress.country}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-black text-white font-semibold py-2 px-4 rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationEmployer;
