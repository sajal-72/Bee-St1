import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AboutEmployer() {
  const [userData, setUserData] = useState({}); // Initialize userData state

  useEffect(() => {
    const callAboutUsPage = async () => {
      try {
        const res = await axios.get("/aboutemployer", {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data); // Set user data to state
          console.log(res.data);
        } else {
          throw new Error(res.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    };

    callAboutUsPage();
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div>
      {/* Your UI to display user data */}
      <div>
        {/* Display user details */}
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>id: {userData._id}</p>
        {/* Add other user details as needed */}
      </div>
    </div>
  );
}

export default AboutEmployer;
