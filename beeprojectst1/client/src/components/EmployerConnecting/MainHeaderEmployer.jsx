import React from 'react'
import NavbarEmployer from './NavbarEmployer'
import UserDash from '../PostedContent/UserDash'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const MainHeaderEmployer = () => {
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
  }, []); 
  return (
    <div>
      <NavbarEmployer/>
      <div className=' w-full'>
      <h1 className='text-[5vw] font-bold items-center justify-center flex'>Welcome {userData.name}</h1>
      </div>
     
      <UserDash/>
    </div>
  )
}

export default MainHeaderEmployer
