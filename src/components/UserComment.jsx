import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from 'date-fns';
import { setPost } from "../redux/postSlice";
import { useNavigate } from 'react-router-dom';

// Button component with submit function for completing forms
const UserComment = (props) => {
    const LoggedInUser = useSelector((state) => state.user);

    const UserId = props.comment[0];
    const BodyText = props.comment[1];
    const createdAt = props.comment[2];
    const _id = props._id;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    
    // Delete comment from post
    const deleteComment = async (data) => {
        const response = await fetch(`https://socialappserver-hpis.onrender.com/posts/${_id}/delete/${UserId}/${createdAt}`, {
            method: 'DELETE',
            headers: {
                "Authorization":"Bearer "+LoggedInUser.token,
                "Content-Type": "application/json",
              },
        });
        if (response.ok) {
            let updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    };
    
    // Get user data on load
    useEffect(() => {
        const GetUser = async () => {
            const response = await fetch(`https://socialappserver-hpis.onrender.com/users/${UserId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const data = await response.json();
                setFirstName(data.FirstName);
                setLastName(data.LastName);
                setProfilePicture(data.ProfilePicture);
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
        };
        GetUser();
    }, [navigate,UserId]); // Only run once when page loads

    return (
        <div className="" style={{height:'22%',paddingLeft:'15px',paddingRight:'15px',paddingBottom:'5px', paddingTop:'5px'}}>
                {UserId === LoggedInUser.user._id && (
                    <div style={{ position: 'relative' }}>
                        <img src="https://socialappserver-hpis.onrender.com/images/Delete.png" alt="Delete" onClick={deleteComment} style={{ position: 'absolute', top: '5px', right: '13px', width: '17px', height: '18px' }} className="hover:opacity-75 cursor-pointer" />
                    </div>
                )}
                <div style={{ display: 'flex', alignItems:'center' }}>
                        <div className="avatar rounded-full bg-gray-200 shadow-lg flex" style={{ justifyContent:'center', alignContent:'center', alignItems: 'center', height:'40px', width:'40px', border: '1px solid grey', backgroundImage: `url(https://socialappserver-hpis.onrender.com/images/${profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex' }} aria-label="Avatar Image">
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <a href={`http:/localhost/users/${UserId}`}>
                                <h2 className="text-2xl font-bold" style={{fontSize:'15px', marginBottom:'-5px'}}>{firstName} {lastName}</h2>
                            </a>
                            <p style={{fontSize:'15px'}}>{formatDistanceToNow(new Date(createdAt))} ago</p>
                        </div>
                    </div>
                    <p style={{padding:'7px'}}>{BodyText}</p>
                </div>
    );
};

export default UserComment;