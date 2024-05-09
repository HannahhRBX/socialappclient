import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import FriendButton from './FriendButton';

// Profile data column
const ProfileColumn = ({ UserData }) => {
    
    const LoggedInUser = useSelector((state) => state.user);
    const [friendButtonClicked, setFriendButtonClicked] = useState(false);
    const navigate = useNavigate();
    const buttonStyle = { 
        marginTop:'25px', 
        border: '1px solid #D6D6D6', 
        borderRadius: '14px',
        width:'170px',
        height:'40px', 
        textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' 
    };
    const backgroundColor = '#186bf2';
    const hoverColor = '#095de7';
    const userId = LoggedInUser.user._id;
    const friendId = UserData._id;
    const token = LoggedInUser.token;

    // Refresh friend button on click
    const refreshProfile = () => {
        setFriendButtonClicked(prevState => !prevState);
    };

    // Function to get the friend status
    const getFriendStatus = () => {

        // Check if logged in user is same as user data
        if (LoggedInUser.user._id === UserData._id) {
            return { buttonText: "Edit Profile", hoverText: null };
        } 

        // Check if both users are friends
        else if (UserData.Friends.includes(LoggedInUser.user._id) && LoggedInUser.user.Friends.includes(UserData._id)) {
            return { buttonText: "Friends", hoverText: "Unfriend" };
        } 

        // Check if user data includes logged in user as friend
        else if (UserData.Friends.includes(LoggedInUser.user._id)) {
            return { buttonText: "Request Received", hoverText: "Add Friend" };
        } 

        // Check if logged in user has sent friend request to target user
        else if (LoggedInUser.user.Friends.includes(UserData._id)) {
            return { buttonText: "Request Sent", hoverText: "Unsend" };
        } 
        // Else display add friend
        else {
            return { buttonText: "Add Friend", hoverText: "Add Friend" };
        }
    };

    const { buttonText, hoverText } = getFriendStatus();

    return (
        <div className="profile w-1/4 bg-white p-6 rounded-xl mr-4 flex flex-col items-center shadow-lg" style={{height:'530px',position:'sticky', top: 20}}>
            {/*User profile avatar image wiith auto width scaling*/}
            <div className="avatar w-40 h-40 rounded-full bg-gray-200 shadow-lg border border-gray-200 flex items-center justify-center" style={{ border: '2px solid grey', backgroundImage: `url(https://socialappserver-hpis.onrender.com/images/${UserData.ProfilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image"> 
            </div>
            <a href={`https://socialappserver-hpis.onrender.com:3000/users/${UserData._id}`}>
                <h2 className="text-2xl font-bold mb-2">{UserData.FirstName} {UserData.LastName}</h2>    
            </a>
            <p className="text-gray-500">{UserData.Bio}</p>
            <h3 className="text-xl font-bold mt-4 mb-2 pt-6">Socials</h3>
            {/*User Discord tag card*/}
            <div className="socials flex items-center rounded-2xl border border-gray-300 " style={{height:'77px',width:'230px', background: 'linear-gradient(30deg, rgba(80,50,250,0.7) 0%, rgba(0,0,0,0.1) 100%)', backdropFilter: 'blur(10px)',border: '1px solid grey',}}>
                <img src="https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg" alt="Discord" className="w-1/3 border-gray-300 h-full rounded-3xl p-2.5"/>
                <div className="text-gray-500 text-white font-bold  stroke-slate-50" style={{fontSize: '1.05em', textShadow: '-1px 0 #242424, 0 2px #242424, 1px 0 #242424, 0 -1px #242424', wordBreak: 'break-all', marginRight: '1%'}}>
                    @{UserData.Discord}
                </div>
            </div>
            {/*Display edit profile is user is logged in user, else display friend button */}
            {
                LoggedInUser.user._id === UserData._id ?
                <NavButton buttonText={buttonText} URL={"/editProfile"} style={buttonStyle} backgroundColor={backgroundColor} hoverColor={hoverColor} />
                :
                <FriendButton buttonText={buttonText} hoverText={hoverText} refreshProfile={refreshProfile} userId={userId} friendId={friendId} token={token} style={buttonStyle} backgroundColor={backgroundColor} hoverColor={hoverColor} />
            }
        </div>
    );
};

export default ProfileColumn;