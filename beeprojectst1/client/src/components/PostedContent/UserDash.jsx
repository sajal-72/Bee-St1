import React, { useState, useEffect } from 'react';
import Job from './Job';
import JobData from './JobData'; // Import JobData component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDash = () => {
  const navigate = useNavigate();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const openCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  const closeCreatePost = () => {
    setIsCreatePostOpen(false);
  };

  const updateSubmittedData = async (deletedId) => {
    try {
      await axios.delete(`/jobs/${deletedId}`);
      const updatedData = submittedData.filter((job) => job._id !== deletedId);
      setSubmittedData([...updatedData]);
      navigate("/");
      await fetchSubmittedData();
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get('/jobs');
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error fetching submitted data', error);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  return (
    <div className="relative">
      {isCreatePostOpen && <Job onClose={closeCreatePost} updateSubmittedData={updateSubmittedData} />}
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-green-800 text-white py-3 px-6 rounded-lg my-4 transition-all duration-300"
          onClick={isCreatePostOpen ? closeCreatePost : openCreatePost}
        >
          {isCreatePostOpen ? 'Close Post' : 'Create a Post'}
        </button>
      </div>

      <JobData submittedData={submittedData} updateSubmittedData={updateSubmittedData} />
    </div>
  );
};

export default UserDash;
