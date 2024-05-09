import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../redux/userSlice";
import BackButton from "../components/BackButton";
import SubmitButton from "../components/SubmitButton";

// Change password page
const ChangePassword = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const form = useForm({ mode: "onChange" });
    const dispatch = useDispatch();

    const [isHoveredPassword, setIsHoveredPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const UserData = user.user;
    const { register, handleSubmit } = form;
    
    // Submit post request to change password
    const onSubmit = async (data) => {
        // Send userId with password data
        const response = await fetch("http://localhost:5000/changePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json","Authorization":"Bearer "+user.token },
            body: JSON.stringify({
                id: UserData._id, // Assuming the user's id is stored in UserData._id),
                ...data,
            }),
        });
        // If response okay, update user cookie with new password
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(updateProfile({ user: updatedUser }));
            navigate("/editProfile");
        } else {
            // If not send error message
            const err = await response.json();
            setErrorMessage(err.message);
        }   
    };

    return (
        <div className="home">
            {/*Place navbat at top of page*/}
            <NavBar />
            {/*Background page*/}
            <div className="background h-screen bg-[#f1f2f7] flex items-center justify-center">
                {/*Change password form background*/}
                <div className="mt-6 justify-center" style={{ width:'600px' }}>
                    
                    <div className="shadow-lg profile bg-white p-6 rounded-xl mr-4 flex flex-col items-center justify-center" style={{width:'100%', height: '100%'}}>
                        {/*Import BackButton to navigate back to editProfile*/}
                        <BackButton buttonText="Back" URL={"/editProfile"} style={{marginTop:'-6px', fontWeight: '400',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'90px', height:'40px', color: '#3D3D3D',  textShadow: '0px 0 white, 0 0px white, 0px 0 white, 0 -0px white' }} backgroundColor={'#FBFBFB'} hoverColor={'#F5F5F5'} />
                        {/*User profile avatar picture with auto scale*/}
                        <div className="avatar w-40 h-40 rounded-full bg-gray-200 shadow-lg border border-gray-200 flex items-center justify-center" style={{ border: '2px solid grey', backgroundImage: `url(http://localhost:5000/images/${UserData.ProfilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image">
                        </div>
                        {/*Change password form*/}
                        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-4 m-8" >
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">Current Password</h2>
                                <input type="password" placeholder="Current Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("CurrentPassword", {
                                    required: "Password is required!",
                                })}
                                />
                            </div>
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">New Password</h2>
                                <input type="password" placeholder="New Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("NewPassword", {
                                    required: "New Password is required!",
                                })}
                            />
                            </div>
                            <div className="col-span-1  mx-auto" style={{ width:'250px' }}>
                                <h2 className="text-xl font-bold text-center ">Confirm Password</h2>
                                <input type="password" placeholder="Confirm Password" className="focus:outline w-full mx-auto rounded-2xl border border-gray-400 p-2" style={{ paddingLeft: '15px', overflow: 'hidden', border: '1px solid grey',borderRadius: '15px', backgroundColor: 'white' }}  
                                {...register("ConfirmPassword", {
                                    required: "Confirm Password is required!",
                                })}
                                
                                />
                            </div>
                            {/*Error message form validation*/}
                            {errorMessage && <h2 className="text-md font-bold text-center" style={{color: '#ff2121', marginBottom: '-18px'}}>{errorMessage}</h2>}
                            <div className="col-span-1 mb-1 flex items-center justify-center">
                                {/*Import SubmitButton to submit form*/}
                                <SubmitButton buttonText="Submit" style={{ border: '1px solid #D6D6D6', borderRadius: '10px',width:'200px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#171717'} hoverColor={'#000000'} />
                            </div>
                            
                        </form>
                        
                        
                        
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;