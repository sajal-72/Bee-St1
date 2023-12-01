import React, { useState, useEffect } from 'react';
import Job from './Job';
import JobData from './JobData'; // Import JobData component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DummyPost = () => {
  const navigate = useNavigate();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);


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
     
    
    

      <JobData submittedData={submittedData} updateSubmittedData={updateSubmittedData} />
    </div>
  );
};

export default DummyPost;
