import React from 'react';
import axios from 'axios';

const JobData = ({ submittedData, updateSubmittedData }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/jobs/${id}`);
      const updatedData = submittedData.filter((job) => job._id.toString() !== id.toString());
      updateSubmittedData(updatedData);
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job', error);
      alert('Error deleting job');
    }
  };

  return (
    <div className="flex justify-center p-9">
      {submittedData && submittedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {submittedData.map((job) => (
            <div key={job._id} className="rounded shadow p-4 w-full">
              <div className="flex items-center">
                <img className="pr-3 w-20 h-20 object-cover" src={job.image} alt="" />
                <div>
                  <h1 className="text-xl font-bold " title={job.title}>{job.title}</h1>
                  <p>{job.companyName}</p>
                  <p><span className="font-semibold">Deadline:</span> {job.applicationDeadline}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Salary: {job.salaryRange}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Experience: {job.Experience}</div></div>
                <div className="flex items-center"><span className="bg-black w-2 h-2 rounded-full mr-2"></span><div>Job Location: {job.Location}</div></div>
              </div>
              <div className='flex m-2 p-2'>
              <div className='bg-green-600  m-2 text-white rounded-xl flex justify-center w-[44%] h-6'>{job.employmentType}</div>
              <button onClick={() => handleDelete(job._id)} className="text-white w-14 text-center rounded-full cursor-pointer bg-red-500 m-2 text-white rounded-xl flex justify-center w-[44%] h-6" >
                Delete
              </button> 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};


export default JobData;

// // JobData.js

// import React from 'react';
// import axios from 'axios';

// const JobData = ({ submittedData, updateSubmittedData }) => {
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/jobs/${id}`);
//       const updatedData = submittedData.filter((job) => job._id.toString() !== id.toString());
//       updateSubmittedData(updatedData);
//       alert('Job deleted successfully');
//     } catch (error) {
//       console.error('Error deleting job', error);
//       alert('Error deleting job');
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       {submittedData && submittedData.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {submittedData.map((job) => (
//             <div key={job._id} className="rounded shadow p-4 w-full  ">
//               <div className='flex'>
//                 <img  className='pr-3 w-43 h-43' src={job.image} alt="" />
//                 <div>
//                   <h1 className='text-xl font-bold space-x-6 gap-4'>{job.title}</h1>
//                   <p>{job.companyName}</p>
//                   <p><span className='font-semibold'>Deadline:</span> {job.applicationDeadline}</p>
//                 </div>
//                 <hr />
                
//               </div>
//               <div className='mt-4'>
//                   <div className="flex"><span className='bg-black w-2 h-2 items-center flex gap-2 '></span><div>Salary: {job.salaryRange}</div></div>
//                 </div>
//               {/* <h1 className='text-6xl'>job posted by : {job.companyName}</h1>
//               <h3 className="text-lg font-bold mb-2">{job.title}</h3>
//               <p><strong>Description:</strong> {job.description}</p>
//               <p><strong>image:</strong> <img src={job.image} alt="" /></p>
//               <p><strong>Requirements:</strong> {job.requirements}</p>
//               <strong>Application Instructions:</strong> {job.applicationInstructions}
//               <strong>Company Name:</strong> {job.companyName}<br />
//               <strong>Location:</strong> {job.location}<br />
//               <strong>Salary Range:</strong> {job.salaryRange}<br />
//               <strong>Employment Type:</strong> {job.employmentType}<br />
//               <strong>Industry:</strong> {job.industry}<br />
//               <strong>Company Description:</strong> {job.companyDescription}<br />
//               <strong>Contact Email:</strong> {job.contactEmail}<br />
//               <strong>Contact Phone:</strong> {job.contactPhone}<br />
//               <strong>Application Deadline:</strong> {job.applicationDeadline}
//               {/* Add other job details here in a similar format */}
//               <div onClick={() => handleDelete(job._id)} className="text-red-500 cursor-pointer mt-2 hover:underline">
//                 Delete
//               </div> 
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No jobs available</p>
//       )}
//     </div>
//   );
// };

// export default JobData;

