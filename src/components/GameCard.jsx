import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setPost,setPosts } from "../redux/postSlice";
import PostComments from './Comments';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import AddGameButton from './AddGameButton';

// User post element
const GameCard = (props) => {
    const LoggedInUser = useSelector((state) => state.user);
    const UserData = LoggedInUser.user;

    // Destructure post properties
    
    const {id, name, background_image, platforms, genres} = props.game;

    // Check if post is liked by logged in user
    
    //console.log(props)
    // Initiate redux dispatch and form
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({ mode: "onChange" });
    const { register, handleSubmit, control, setValue, formState: { errors } } = form;
    const gameIds = UserData.Games.map(game => game[0]);
    // Fetch user data from server
    //console.log(gameIds);

    return (
        <div className="feed bg-white rounded-xl shadow-lg" style={{width:'100%', height:'auto', minHeight:'228px', marginTop:'15px', paddingTop:'10px', paddingBottom:'10px'}}>
            {props.game.id ? (
                <>
                    <h1 className="text-2xl font-bold" style={{fontSize:'18px', marginLeft:'15px', marginRight:'15px',height:'70px'}}>{name}</h1>
                    <div style={{backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100%', height: '160px', overflow:'hidden', objectFit: 'contain', boxShadow: '0px 8px 35px rgba(0, 0, 0, 0.15)'}}>
                        <img src={background_image} alt="Game Thumbnail" />
                    </div>
                    
                    {gameIds.includes(id) ? (
                        
                        <AddGameButton buttonText="Remove Game" game={props.game} style={{ marginTop:'10px', paddingTop:'8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', fontWeight: '650',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'150px', height:'40px', color: '#FFFFFF',  textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#e83838'} hoverColor={'#cf2d2d'} />
                    ) : (
                        <AddGameButton buttonText="Add Game" game={props.game} style={{ marginTop:'10px', paddingTop:'8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)', fontWeight: '650',  border: '1px solid #D6D6D6', borderRadius: '10px',width:'150px', height:'40px', color: '#FFFFFF',  textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#39AD55'} hoverColor={'#2e8f46'} />
                    )}
                    
                </>
            ) : (
                <>
                    
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',width: '100%', height:'100%'}}>
                        <h1 className="text-2xl items-center text-center font-bold" style={{fontSize:'18px'}}>Empty</h1>
                    </div>
                    
                </>
            )}
        </div>
    );
};

export default GameCard;