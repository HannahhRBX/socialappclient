import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/userSlice";
import gamesSlice from '../redux/gamesSlice';

// Button to add or remove friends
const FriendButton = ({ buttonText, hoverText, refreshProfile, userId, friendId, token, style, backgroundColor, hoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const defaultStyle = { 
        width: '210px', 
        height: '45px', 
        backgroundColor: isHovered ? hoverColor : backgroundColor, 
        color: 'white', 
        padding: '8px', 
        fontWeight: 'bold', 
        borderRadius: '90px',
        fontSize: '1.1rem',
        display: 'flex',
        marginTop: '10px',
        border: '1px solid #B6B6B6',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };

    

    // Send friend patch request to server
    const sendFriend = async () => {
        const response = await fetch(`https://socialappserver-hpis.onrender.com/users/${userId}/addfriend/${friendId}`, {
            method: "PATCH",
            headers: { "Authorization":"Bearer "+token,
                       "Content-Type": "application/json" },
        });
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(updateProfile({ user: updatedUser }));
            refreshProfile();
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    };

    return (
        <button 
            onClick={sendFriend}
            className='col-span-1 mx-auto items-center justify-center text-center'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...defaultStyle, ...style }}>
            {isHovered ? hoverText : buttonText}
        </button>
    );
};

export default FriendButton;