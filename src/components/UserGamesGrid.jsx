import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import GameCard from './GameCard';


// Grid for user's game library
const UserGamesGrid = ({ games }) => {

    
    // Prepare game cards for display
    let gameCards = [];
    if (games) {
        for (let i = 0; i < games.length; i++) {
            if (games[i].gameDetails != null) {
                gameCards.push(<GameCard key={games[i].gameDetails.id} game={games[i].gameDetails} />);
            } else {
                gameCards.push(<GameCard key={`placeholder-${i}`} game={{name: '', background_image:'https://socialappserver-hpis.onrender.com/images/Plus.png'}} />);
            }
        }
    }

    return (
        <div className="games" style={{width:'100%', marginRight:'1%', marginLeft:'1%', marginTop:'10px', paddingTop:'10px',display: 'flex', flexDirection: 'column', overflow:'auto'}}>
            <h1 className="text-2xl font-bold" style={{fontSize:'28px', marginBottom:'-5px'}}>Your Games</h1>
            {!games ? (
                <div style={{height: '250px'}}></div>
            ) : (
                <div style={{display: 'grid', marginBottom:'70px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px'}}>
                    {gameCards}
                </div>
            )}
        </div>
        
        
    );
};

export default UserGamesGrid;