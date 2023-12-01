import React from "react";
import LandingNavbar from "./LandingNavbar";
import UserDash from "../PostedContent/UserDash";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./header.css"


const HeroSection = () => {
  const [userData, setUserData] = useState({}); // Initialize userData state

  useEffect(() => {
    const callAboutUsPage = async () => {
      try {
        const res = await axios.get("/about", {
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
  }, [userData]); 

  return (
    <div className="a">
      <div>
      <LandingNavbar />
      <div className='p-5 md:p-10 lg:p-16 md:flex'>
      <div className='md:w-1/2 md:mt-[5rem] mt-[3rem] md:pr-8'>
        <h1 className='HeadingStyled text-4xl md:text-6xl lg:text-7xl mt-8 md:mt-0 leading-9'>Find your Next Job and Make Your Own Goal.</h1>
        <p className='ParaStyled mt-7 text-sm md:text-base lg:text-lg text-gray-500 font-light'>We are the best global job finder agency and millions of people liked and Trusted our Plaftform.</p>
      </div>

      <div className='right'>
      <div className="first">
        <div className="boxa"><img className="im" src="https://i.pinimg.com/564x/f1/19/f7/f119f75ae4c11852c628467f4358c879.jpg" alt="" /></div>
        <div className="boxa">
          <img className="im" src="https://i.pinimg.com/564x/89/0a/f1/890af1d730767cbcc15f57c06b66b1ab.jpg" alt="" />
        </div>
        </div>

        <div className="second">
        <div className="boxa">
          <img className="im" src="https://i.pinimg.com/564x/86/6a/06/866a06271970c239d66fa1dbdba9069e.jpg" alt="" />
        </div>
        <div className="boxa">
        <img className="im" src="https://i.pinimg.com/564x/54/ee/4c/54ee4cf97b2e96dd7393521c0a443cfa.jpg" alt="" />

        </div>
        </div>
      </div>
   
    </div>
    </div>
    </div>
  );
};

export default HeroSection;
