// Job.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Job = ({ onClose, updateSubmittedData }) => {
  const [formData, setFormData] = useState({
    title: '',
    image:'',
    description: '',
    Experience: '',
    applicationInstructions: '',
    companyName: '',
    location: '',
    salaryRange: '',
    employmentType: '',
    industry: '',
    companyDescription: '',
    contactEmail: '',
    contactPhone: '',
    applicationDeadline: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/jobs', formData);
      console.log(response.data);

      // Pass the submitted data to the parent component
      updateSubmittedData(response.data);

      // Reset form data
      setFormData({
        title: '',
        image:'',
        description: '',
        Experience: '',
        applicationInstructions: '',
        companyName: '',
        location: '',
        salaryRange: '',
        employmentType: '',
        industry: '',
        companyDescription: '',
        contactEmail: '',
        contactPhone: '',
        applicationDeadline: '',
      });

      // Close the Job component
      onClose();

      alert('Job listing submitted successfully');
    } catch (error) {
      console.error('Error submitting job listing', error);
      alert('Error submitting job listing');
    }
  };

  return (
    <div className="job-container bg-gray-200 p-6 rounded-lg shadow-md w-[80%] mx-auto my-10">
            <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-xl cursor-pointer focus:outline-none"
        >
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      </div>
      <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image-Link:
        </label>
        <input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {formData.image && ( // Display the image if an image link is provided
          <img src={formData.image} alt="Job Image" className="mt-2 rounded-md" style={{ maxWidth: '100%', height: 'auto' }} />
        )}
      </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Experience:
            </label>
            <input
              type="text"
              id="requirements"
              name="Experience"
              value={formData.Experience}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="applicationInstructions" className="block text-sm font-medium text-gray-700">
              Application Instructions:
            </label>
            <textarea
              id="applicationInstructions"
              name="applicationInstructions"
              value={formData.applicationInstructions}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">
              Salary Range:
            </label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
              Employment Type:
            </label>
            <input
              type="text"
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industry:
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
              Company Description:
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Contact Email:
            </label>
            <input
              type="text"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
              Contact Phone:
            </label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
              Application Deadline:
            </label>
            <input
              type="text"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-[200px] bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
    </div>
  );
};

export default Job;
