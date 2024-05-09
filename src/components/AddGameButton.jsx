import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGame } from '../redux/gamesSlice';
import { updateProfile } from "../redux/userSlice";

// Button to add or remove friends
const AddGameButton = ({ buttonText, game, style, backgroundColor, hoverColor }) => {
    const user = useSelector((state) => state.user);
    const userGames = user.user.Games;
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
        borderRadius: '50px',
        fontSize: '1.1rem',
        display: 'flex',
        marginTop: '10px',
        border: '1px solid #B6B6B6',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };

    

    // Send friend patch request to server
    const UpdateGame = async () => {
        
        
        if (buttonText == "Remove Game") {
            let newUserGames = [...userGames];
            const gameIndex = newUserGames.findIndex(userGame => userGame[0] === game.id);

            if (gameIndex !== -1) {
                newUserGames[gameIndex] = { id: null, platforms: [] };
            }
            const response = await fetch("https://socialappserver-hpis.onrender.com/games/updategames", {
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization":"Bearer "+user.token },
                body: JSON.stringify({
                    id: user.user._id, // Assuming the user's id is stored in UserData._id),
                    games: newUserGames,
                }),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                dispatch(updateProfile({ user: updatedUser }));
                
               // dispatch(setUserGames({ user_games: newUserGames }));
               dispatch(setCurrentGame({ game: null }));
                
            } else {
                // If not send error message
                const err = await response.json();
                console.log(err.message);
            }
        }else{
            dispatch(setCurrentGame({ game: game }));
        }
    };

    return (
        <button 
            onClick={UpdateGame}
            className='col-span-1 mx-auto items-center justify-center text-center'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...defaultStyle, ...style }}>
            {buttonText}
        </button>
    );
};

export default AddGameButton;