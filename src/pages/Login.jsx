
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import setPosts from "../redux/postSlice";
import SubmitButton from "../components/SubmitButton";
import NavButton from "../components/NavButton";
import React, { useState, useEffect } from 'react';

{/*Login Page*/}
const LoginForm = () => {
  const { user } = useSelector((state) => state.user);
  const form = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = form;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);
  // Login post request
  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // If login okay, set cookie as user and token and navigate to home page
    if (response.ok) {
      const loggedIn = await response.json();
      dispatch(login({ user: loggedIn.user, token: loggedIn.token, edit: false }));
      navigate("/");
    } else {
      // Display error if not okay
      const err = await response.json();
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="bg-[#c9d0ff] min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: 'url("https://img.freepik.com/premium-vector/abstract-smooth-blur-purple-blue-color-gradient-background-website-banner-graphic-design_120819-893.jpg")'}}>
      
      <div className="bg-[#ffffff] p-8 rounded shadow-2xl w-96">
        <div className="text-center items-center mb-4" style={{ justifyContent:'center', display:'flex', width: '100%' }}>
          <img className="mb-4" src="http://localhost:5000/images/logo2.png" alt="Logo" style={{ width: 'auto', marginBottom:'-10px', marginTop:'-10px', height: '100px' }} />
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium">Email</label>
            <input type="text" placeholder="Email" id="email" name="email" className="focus:outline mt-1 p-2 w-full border" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
              {...register("email", {
                required: "Email is required!",
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" className="focus:outline mt-1 p-2 w-full border rounded-md" style={{ paddingLeft: '12px', overflow: 'hidden', border: '1px solid grey',borderRadius: '10px', backgroundColor: 'white' }}
              {...register("password", {
                required: "Password is required!",
              })}
            />
          </div>
          {/*Form validation error messages appear here*/}
          { (errors.email || errors.password || errorMessage ) && <h2 className="mb-2 text-md font-bold text-center" style={{color: '#ff2121'}}>Invalid email or password.</h2>}
          
          <div className="mb-1 flex items-center justify-center">
          <SubmitButton buttonText="Login" style={{ border: '1px solid #D6D6D6', borderRadius: '10px',width:'170px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#171717'} hoverColor={'#000000'} />
            
          </div>
        </form>
        <NavButton buttonText="Create Account" URL={"/register"} style={{fontWeight: '400',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'160px', height:'30px', color: '#3D3D3D',  textShadow: '0px 0 white, 0 0px white, 0px 0 white, 0 -0px white' }} backgroundColor={'#FBFBFB'} hoverColor={'#F5F5F5'} />
      </div>
    </div>
  );
};

export default LoginForm;
