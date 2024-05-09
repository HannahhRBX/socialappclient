
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import SubmitButton from "../components/SubmitButton";
import NavButton from "../components/NavButton";

import React, { useState, useEffect } from 'react';

const RegisterForm = () => {
  const { user } = useSelector((state) => state.user);
  const form = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = form;
  const [errorMessage, setErrorMessage] = useState(null);

  // Client side validation for requiring each field in order
  const fieldOrder = ["FirstName", "LastName", "Email", "Password", "ConfirmPassword"];
  const firstErrorField = fieldOrder.find(field => errors[field]);

  // Function to post form data to server
  const onSubmit = async (data) => {
    const formData = new FormData();
    // append other data
    for (let key in data) {
      if (data[key] instanceof FileList) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    // Send data to register route in server
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: formData,
    });

    console.log(data,response)
    // If response okay, set user data with token and send them to home page
    if (response.ok) {
      const loggedIn = await response.json();
      dispatch(login({ user: loggedIn.user, token: loggedIn.token, edit: false }));
      navigate("/");
    } else {
      const err = await response.json();
      setErrorMessage(err.message);
    }
  };

 

  return (
    // Website background image
    <div className="bg-[#c9d0ff] min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-smooth-blur-purple-blue-color-gradient-background-website-banner-graphic-design_120819-893.jpg")'}}>
      {/*Form background*/}
      <div className="bg-[#ffffff] p-8 rounded shadow-2xl" style={{width:'720px'}}>
        <h2 className="text-4xl font-bold mb-6 text-center" >Register</h2>
        {/*Form for entering Registration data*/}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div className="mb-4 col-span-1">
              <label htmlFor="firstname" className="block text-gray-600 text-sm font-medium">First Name</label>
              <input type="text" placeholder="First Name" id="firstname" name="firstname" className="focus:outline mt-1 p-2 w-full border" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
                {...register("FirstName", {
                  required: "First Name is required!",
                })}
              />
          </div>
          <div className="mb-4 col-span-1">
              <label htmlFor="lastname" className="block text-gray-600 text-sm font-medium">Last Name</label>
              <input type="text" placeholder="Last Name" id="lastname" name="lastname" className="focus:outline mt-1 p-2 w-full border" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
                {...register("LastName", {
                  required: "Last Name is required!",
                })}
              />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">Email</label>
            <input type="text" placeholder="Email" id="email" name="email" className="focus:outline mt-1 p-2 w-full border" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
              {...register("Email", {
                required: "Email is required!",
              })}
            />
          </div>
          <div className="mb-4 col-span-1">
              <label htmlFor="discord" className="block text-gray-600 text-sm font-medium">Discord Username (Optional)</label>
              <input type="text" placeholder="Discord Username" id="discord" name="discord" className="focus:outline mt-1 p-2 w-full border" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
                {...register("Discord")}
              />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" className="focus:outline mt-1 p-2 w-full border rounded-md" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
              {...register("Password", {
                required: "Password is required!",
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-gray-600 text-sm font-medium">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" id="confirmpassword" name="confirmpassword" className="focus:outline mt-1 p-2 w-full border rounded-md" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
              {...register("ConfirmPassword", {
                required: "Confirm Password is required!",
              })}
            />
          </div>
          <div className="col-span-2 w-2/5 mx-auto">
            <label htmlFor="profilepicture" className="block text-gray-600 text-sm font-medium text-center">Profile Picture</label>
            <input 
              type="file"
              className="w-full mx-auto rounded-2xl border border-gray-400 p-2 focus:outline" 
              style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }} 
              {...register("ProfilePicture")}
              
            />
          </div>

          <div className="col-span-2 flex items-center justify-center">
            {/*Form validation error messages from client and server*/}
            { ( errorMessage ) && <h2 className="mb-2 text-md font-bold text-center" style={{color: '#ff2121', marginBottom:'-10px'}}>{errorMessage}</h2>}
            { ( firstErrorField ) && <h2 className="mb-2 text-md font-bold text-center" style={{color: '#ff2121', marginBottom:'-10px'}}>{errors[firstErrorField].message}</h2>}
          </div>

          <div className="col-span-2 mb-1 flex items-center justify-center">
            <SubmitButton buttonText="Create Account" style={{ border: '1px solid #D6D6D6', borderRadius: '10px',width:'170px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#171717'} hoverColor={'#000000'} />
          </div>
        </form>
        <NavButton buttonText="Back" URL={"/login"} style={{fontWeight: '400',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'90px', height:'30px', color: '#3D3D3D',  textShadow: '0px 0 white, 0 0px white, 0px 0 white, 0 0px white' }} backgroundColor={'#FBFBFB'} hoverColor={'#F5F5F5'} />
      </div>
    </div>
  );
};

export default RegisterForm;
