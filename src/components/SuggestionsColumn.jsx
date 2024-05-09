import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GetGameDetailsForUserGames } from '../functions/GameLibrary';
import { useLocation } from 'react-router-dom';
import { updateMatches } from '../redux/userSlice';

// Suggested friends column
const UserSuggestions = ({ UserData }) => {
    const LoggedInUser = useSelector((state) => state.user);
    const Matches = LoggedInUser.matches;
    const userGames = UserData.Games;
    const games = useSelector((state) => state.games);
    const userGamesDetails = games.userGames;
    const dispatch = useDispatch();
    const location = useLocation();
    let title = "Your Games";

    // If page is another user's, change 'Your' to [name]'s Games
    if (location.pathname.includes('/users')) {
        title = `${UserData.FirstName}'s Games`;
    }

    // Get matching users from server
    const GetMatchingUsers = async () => {
        const response = await fetch(`http://localhost:5000/matchusers/${LoggedInUser.user._id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // Update matches in redux store
            const updatedMatches = await response.json();
            dispatch(updateMatches({ matches: updatedMatches }));
        }else{
            const updatedMatches = await response.json();
            console.log(updatedMatches.message)
        }
    };

    useEffect(() => {
        GetGameDetailsForUserGames(userGames, dispatch);
        GetMatchingUsers();
    }, []);
    return (
        <div className="rightcolumn w-1/4" style={{ marginLeft:'4px', display: 'flex', flexDirection: 'column' }}>
            <div className="suggested bg-white p-6 rounded-xl ml-4 shadow-lg" style={{marginBottom: '30px',height:'350px',position:'sticky', top: 20, margin: '10px'}}>
                {/* Matched suggested friends element */}
                <h2 className="text-2xl font-bold mb-4 text-center justify-center">Suggested Friends</h2>
                {Array.isArray(Matches) && Matches.map((match, index) => {
                    // Check if match is null, if so display empty
                    if (match == null) {
                        return (
                            <div key={index} style={{ display: 'flex', alignItems: 'center',padding:'5px', height:'60px' }}>
                                <h1 className="text-2xl font-bold text-center" style={{ width:'100%', lineHeight: '1.1', fontSize: '12px', marginLeft: '15px', marginRight: '15px' }}>
                                    Empty
                                </h1>
                            </div>
                        );
                    }else{
                        return (
                            // Navigate to user profile with hover then click
                            <div onClick={() => window.location.href=`http://localhost:3000/users/${match._id}`} style={{ borderRadius:'10px', textDecoration: 'none', cursor: 'pointer' }} className="hover:bg-[#eaeaea]">
                                <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '5px', transition: 'background-color 0.3s ease' }}>
                                    <h1 className="text-2xl font-bold" style={{ paddingRight: '12px', lineHeight: '1.1', fontSize: '15px' }}>
                                        {index+1}
                                    </h1>
                                    <div style={{ width: '40px', height: '40px'}}>
                                        <img className="shadow-md rounded-full" src={`http://localhost:5000/images/${match.ProfilePicture}`} alt="Profile Picture" style={{ minWidth: '40px', minHeight: '40px', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px', marginRight: '15px' }}>
                                        <h1 className="text-2xl font-bold" style={{ lineHeight: '1.1', fontSize: '14px' }}>
                                            {match.FirstName} {match.LastName}
                                        </h1>
                                        <h1 className="text-2xl font-bold" style={{ lineHeight: '1.1', fontSize: '11px' }}>
                                            {/* Gets a percentage match score out of max score of 30 */}
                                            ({ ((match.Score / 30) * 100).toFixed(0) + "%" } Match)
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="suggested bg-white p-6 rounded-xl ml-4 shadow-lg" style={{marginBottom: '30px',height:'400px',position:'sticky', top: 20, margin: '10px'}}>
                <h2 className="text-2xl font-bold mb-4 text-center justify-center">{title}</h2>
                {/* Display top 5 games of either logged in user or target profile page user */}
                {Array.isArray(userGamesDetails) && userGamesDetails.map((game, index) => {
                    if (!game.gameDetails) {
                        return (
                            // Display empty elements if not all 5 games are filled
                            <div key={index} style={{ display: 'flex', alignItems: 'center',padding:'5px', height:'60px' }}>
                                
                                <h1 className="text-2xl font-bold text-center" style={{ width:'100%', lineHeight: '1.1', fontSize: '12px', marginLeft: '15px', marginRight: '15px' }}>
                                    Empty
                                </h1>
                            </div>
                        );
                    }else{
                        return (
                            // Display game details with thumbnail and name alongside most played index
                            <div key={index} style={{ display: 'flex', alignItems: 'center',padding:'5px', }}>
                                <h1 className="text-2xl font-bold" style={{ paddingRight:'12px', lineHeight: '1.1', fontSize: '15px' }}>
                                    {index+1}
                                </h1>
                                <div style={{ width: '50px', height: '50px'}}>
                                    <img className="shadow-md" src={game.gameDetails.background_image} alt="Game Thumbnail" style={{ minWidth: '50px', minHeight: '50px', maxWidth:'50px', maxHeight:'50px', objectFit: 'cover', borderRadius:'10px' }} />
                                </div>
                                <h1 className="text-2xl font-bold" style={{ lineHeight: '1.1', fontSize: '12px', marginLeft: '15px', marginRight: '15px' }}>
                                    {game.gameDetails.name}
                                </h1>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default UserSuggestions;