import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import GameCard from './GameCard';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { setGames } from "../redux/gamesSlice";

// Grid component for displaying fetched games
const GamesGrid = ({ games }) => {

    const LoggedInUser = useSelector((state) => state.user);
    //const CurrentGames = useSelector((state) => state.games);
    const form = useForm({ mode: "onChange" });
    const { register, handleSubmit, control, setValue, formState: { errors } } = form;
    const { UserId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    
        

    return (
        
        <div className="games" style={{width:'100%', marginRight:'1%', marginLeft:'1%', marginTop:'10px', paddingTop:'10px',display: 'flex', flexDirection: 'column', overflow:'auto'}}>
            
            <h1 className="text-2xl font-bold" style={{fontSize:'28px', marginBottom:'-5px'}}>Game Library</h1>

            
            {/*Display all games from user state*/}
            {!games ? (
                // Placeholder component
                <div style={{height: '250px'}}></div>
            ) : (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px'}}>
                    {games && games.results ? games.results.map((game) => (
                            <div>
                            <GameCard key={game.id} game={game} />
                        </div>
                    )) : null}
                    </div>
                )}
        </div>
        
        
    );
};

export default GamesGrid;