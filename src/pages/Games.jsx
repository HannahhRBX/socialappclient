import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import GamesGrid from '../components/GamesGrid';
import UserGamesGrid from '../components/UserGamesGrid';
import SubmitGameButton from '../components/SubmitGameButton';
import { updateProfile } from '../redux/userSlice';
import GameSearchBar from '../components/GameSearchBar';
import { useLocation } from 'react-router-dom';
import PageButton from '../components/PageButton';
import ClickButton from '../components/ClickButton';
import { GetLibraryPage,SearchGame, GetGameDetailsForUserGames } from '../functions/GameLibrary';

// Games Page
const Games = () => {
    const user = useSelector((state) => state.user);
    const userGames = user.user.Games;
    const games = useSelector((state) => state.games);
    const currentGame = games.games.current_game;
    let currentPlatforms = currentGame ? currentGame.platforms : [];

    const location = useLocation();
    const [page, setPage] = useState(1);

    // Set page number from URL search params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = params.get('page');
        if (page < 1) {
            navigate(`/games?page=1`);
        } else {
            setPage(page);
        }
    }, [location]);
    
    const changePage = (change) => () => {
        setPage(Number(page) + change);
        navigate(`/games?page=${Number(page)+change}`);
    };
    
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    
    
    const UserData = user.user;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Game search bar function from URL search params
    const searchGame = async (search) => {
        try{
            SearchGame({search, dispatch, navigate});
        }catch{

        }
    };
    
    // Reload page when refresh key changes and whenever 'user' or 'page' changes
    useEffect(() => {
        
        GetLibraryPage(page, dispatch, navigate);
        GetGameDetailsForUserGames(userGames, dispatch);
        
        setLoading(false);
        console.log("Reloaded",user,games);
    }, [refreshKey,user,page]); 

    useEffect(() => {
        // Make sure that game retrieval has finished before checking for current game
        if (!loading) {
            if(currentGame != null){
                setSelectedPlatforms([]);
                setSelectedGame(null);
                setShowModal(true);
            }else{
                setShowModal(false);
            }
        }
    }, [games, loading]); // Run when page loads and whenever 'games' or 'loading' changes
    
    // Function to handle game submission for updating user games
    const handleGameSubmit = async () => {
        try{
            let newUserGames = [...userGames];
            newUserGames[selectedGame] = [currentGame.id, selectedPlatforms];
            
            // Must contain bearer token in header
            const response = await fetch("http://localhost:5000/games/updategames", {
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization":"Bearer "+user.token },
                body: JSON.stringify({
                    id: user.user._id,
                    games: newUserGames,
                }),
            });
            // If response okay, update user cookie with new games array
            if (response.ok) {
                const updatedUser = await response.json();
                dispatch(updateProfile({ user: updatedUser }));
                setTimeout(() => setShowModal(false), 500);
                
                
            } else {
                // If not send error message
                const err = await response.json();
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }   
        }catch{
            
        }
    };
    if (!loading) {
        return (
            <div className="home" style={{height:'auto'}}>
                {/*Place navbar at top of page*/}
                <NavBar />

                {/* Modal for selecting games and platforms */}
                {showModal && (
                    <div style={{position: 'fixed',top: 0,left: 0,width: '100%',height: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <div className="shadow-2xl" style={{backgroundColor: 'white', padding: '50px', borderRadius: '10px',position: 'relative'}}>
                            <ClickButton buttonText="Close" onClick={() => setShowModal(false)} style={{ border: '1px solid #D6D6D6', borderRadius: '10px',width:'120px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717',position: 'absolute', top: '10px', right: '20px' }} backgroundColor={'#e83838'} hoverColor={'#cf2d2d'} />
                            <h1 className="text-2xl font-bold text-center" style={{fontSize:'28px', marginBottom:'-5px'}}>Which Platforms do you play this game on?</h1>
                            <div style={{padding:'10px', marginTop:'20px', marginBottom:'20px', display: 'grid', gridTemplateColumns: `repeat(${currentPlatforms.length}, minmax(20px, 1fr))`, gap: '10px'}}>
                            
                            {/* Displays all available platforms fro game */}
                            {currentPlatforms && currentPlatforms.map((platform) => (
                                <div style={{backgroundColor:'transparent', margin: '20px', paddingTop:'20px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',cursor:'pointer', backgroundColor: selectedPlatforms.includes(platform.platform.name) ? 'rgba(0, 0, 0, 0.1)' : 'transparent'}} 
                                    onMouseOver={(e) => {e.currentTarget.firstChild.firstChild.style.opacity = 1; e.currentTarget.lastChild.style.opacity = 1; e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';}} 
                                    onMouseOut={(e) => {if (!selectedPlatforms.includes(platform.platform.name)) {e.currentTarget.firstChild.firstChild.style.opacity = 0.5; e.currentTarget.lastChild.style.opacity = 0.5; e.currentTarget.style.backgroundColor = 'transparent';}}}
                                    onClick={(e) => {
                                        
                                        if (selectedPlatforms.includes(platform.platform.name)) {
                                            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.platform.name));
                                        } else {
                                            setSelectedPlatforms([...selectedPlatforms, platform.platform.name]);
                                        }
                                        e.currentTarget.firstChild.firstChild.style.opacity = 1;
                                        e.currentTarget.lastChild.style.opacity = 1;
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                                    }}>
                                    <div style={{width:'50px', height:'50px', backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <img src={`http://localhost:5000/images/Icon${platform.platform.name}.png`} alt='Platform Thumbnail' style={{opacity: 0.5, transition: 'opacity 0.3s' }} />
                                    </div>
                                    <h1 className="text-2xl font-bold" style={{fontSize:'22px', marginBottom:'-5px', opacity: 0.5, transition: 'opacity 0.3s'}}>{platform.platform.name}</h1>
                                </div>
                            ))}
                            </div>
                            <h1 className="text-2xl font-bold text-center" style={{fontSize:'28px', marginBottom:'-5px'}}>Which order would you like to put this game in?</h1>
                            <div style={{padding:'10px', marginTop:'20px', marginBottom:'-35px', display: 'grid', gridTemplateColumns: `repeat(5, minmax(180px, 180px))`, gap: '10px'}}>
                            {/* Game selection with placeholders from user data */}
                            {userGames.map((game, index) => (
                                <div 
                                    style={{
                                        backgroundColor:'transparent', 
                                        margin: '20px', 
                                        paddingTop:'20px', 
                                        paddingBottom:'20px', 
                                        borderRadius: '10px', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        cursor:'pointer', 
                                        backgroundColor: selectedGame == index ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
                                    }} 
                                    onMouseOver={(e) => {
                                        e.currentTarget.firstChild.firstChild.style.opacity = 1; 
                                        e.currentTarget.lastChild.style.opacity = 1; 
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                                    }} 
                                    onMouseOut={(e) => {
                                        if (selectedGame !== index) {
                                            e.currentTarget.firstChild.firstChild.style.opacity = 0.5; 
                                            e.currentTarget.lastChild.style.opacity = 0.5; 
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                    onClick={() => setSelectedGame(index)}
                                >
                                    
                                    {/* Displays game icon if occupied or plus symbol if empty */}
                                    { games && games.games && games.userGames && games.userGames[index] && games.userGames[index].gameDetails != null ? (
                                        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <img src={games.userGames[index].gameDetails.background_image} alt='Platform Thumbnail' style={{opacity: selectedGame == index ? 1 : 0.5, transition: 'opacity 0.3s' }} />
                                        </div>
                                    ) : (
                                        <div style={{width:'50px', height:'50px', backgroundColor: 'rgba(0, 0, 0, 0)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <img src={`http://localhost:5000/images/Plus.png`} alt='Platform Thumbnail' style={{opacity: selectedGame == index ? 1 : 0.5, transition: 'opacity 0.3s' }} />
                                        </div>
                                    )}
                                        
                                    
                                    <h1 className="text-2xl font-bold" style={{margin:'10px', fontSize:'22px', marginBottom:'-5px', opacity: selectedGame === index ? 1 : 0.5, transition: 'opacity 0.3s'}}>
                                        {index+1}
                                    </h1>
                                </div>
                            ))}
                            </div>
                            {/* Most played to least played headers below current games */}
                            <div style={{padding:'10px', display: 'grid', gridTemplateColumns: `repeat(5, minmax(180px, 180px))`, gap: '10px'}}>
                                <div style={{backgroundColor:'transparent', margin: '20px', marginTop:'-6px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                    <h1 className="text-2xl font-bold" style={{fontSize:'20px'}}>Most Played</h1>
                                </div>
                                <div style={{backgroundColor:'transparent', margin: '20px', marginTop:'-6px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                    <h1 className="text-2xl font-bold" style={{fontSize:'20px'}}></h1>
                                </div>
                                <div style={{backgroundColor:'transparent', margin: '20px', marginTop:'-6px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                    <h1 className="text-2xl font-bold" style={{fontSize:'20px'}}></h1>
                                </div>
                                <div style={{backgroundColor:'transparent', margin: '20px', marginTop:'-6px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                    <h1 className="text-2xl font-bold" style={{fontSize:'20px'}}></h1>
                                </div>
                                <div style={{backgroundColor:'transparent', margin: '20px', marginTop:'-6px', paddingBottom:'20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                                    <h1 className="text-2xl font-bold" style={{fontSize:'20px'}}>Least Played</h1>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <SubmitGameButton buttonText="Submit" onClick={handleGameSubmit} style={{ fontSize:'17px', margin:'5px', height:'100%', width:'20%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#0866ff'} hoverColor={'#095de7'}  />
                            </div>
                            
                        </div>
                    </div>
                )}
                
                <div className="background flex justify-center" style={{ overflow:'visible', height: 'auto', backgroundColor: '#f1f2f7'}}>
                    <div className="content flex w-10/12 mt-6 " style={{overflow:'visible', margin:'80px 20px 20px',height:'auto'}}>
                        {/* User games grid */}
                        <UserGamesGrid  games={games.userGames} />
                    </div>
                </div>
                
                <GameSearchBar searchGame={searchGame} />
                
                <div className="background flex justify-center" style={{ overflow:'visible', height: 'auto', backgroundColor: '#f1f2f7'}}>
                    <div className="content flex w-10/12 mt-6 " style={{margin:'-10px 20px 20px',height:'auto'}}>
                        {/*Games grid*/}
                        <GamesGrid games={games.games} />
                    </div>
                </div>
                {/* Previous and Next page buttons */}
                <div className="background flex justify-center items-center" style={{ overflow:'visible', height: '150px', backgroundColor: '#f1f2f7'}}>
                    <PageButton buttonText="Previous Page" onClick={changePage(-1)} />
                    <h1 className="text-2xl" style={{ fontWeight:'500', fontSize:'18px'}}>Page {page}</h1>
                    <PageButton buttonText="Next Page" onClick={changePage(1)} />
                </div>
                
            </div>
        );
    }else{
        return <div>Loading...</div>;
    }
    
};

export default Games;