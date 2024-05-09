import { setGames, setUserGames } from "../redux/gamesSlice";

// Function to get games by page from the Rawg API
export const GetLibraryPage = async (page, dispatch, navigate) => {
    try {
        
        const response = await fetch(`http://localhost:5000/games/page/${page}`, {
            method: "GET",
        });
        if (response.ok) {
            let data = await response.json();
            // Catagorise platforms such as playstation 5 and playstation 4 as playstation
            data.results = data.results.map(game => {
                let platformNames = [];
                game.platforms = game.platforms.filter(platform => {
                    let name = platform.platform.name.split(' ')[0];
                    if (platformNames.includes(name)) {
                        return false;
                    } else {
                        platformNames.push(name);
                        platform.platform.name = name;
                        return true;
                    }
                });
                return game;
            });
            // Set games in redux store
            dispatch(setGames({ games: data }));
        } else {
            // Navigate to error page if response is not ok
            //navigate(`/error?type=404&message=Uh oh! This could be a server error!`);
        }
    }catch{
        
    }
};

// Function to search for games using the Rawg API
export const SearchGame = async ({search, dispatch, navigate}) => {
    try {
        
        const searchTerms = search.SearchTerms
        const response = await fetch(`http://localhost:5000/games/search/${searchTerms}`, {
            method: "GET",
        });
        
        // If response okay, set games in redux store
        if (response.ok) {
            
            let data = await response.json();
            console.log(data)
            // Cataorise platforms such as playstation 5 and playstation 4 as playstation
            data.results = data.results.map(game => {
                let platformNames = [];
                game.platforms = game.platforms.filter(platform => {
                    let name = platform.platform.name.split(' ')[0];
                    if (platformNames.includes(name)) {
                        return false;
                    } else {
                        platformNames.push(name);
                        platform.platform.name = name;
                        return true;
                    }
                });
                return game;
            });
            dispatch(setGames({ games: data }));
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    }catch{
        //navigate(`/error?type=404&message=Uh oh! This could be a server error!`);
    }
};

// Function to get game details using the Rawg API
export const GetGameDetails = async (gameId, navigate) => {
    try {
        
        const response = await fetch(`http://localhost:5000/games/gamedetails/${gameId}`, {
            method: "GET",
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    }catch{
        //navigate(`/error?type=404&message=Uh oh! This could be a server error!`);
    }
};

// Function to get game details for user games
export const GetGameDetailsForUserGames = async (userGames, dispatch) => {
    try{
        
        let gameDetailsArray = [];
        for (let i = 0; i < userGames.length; i++) {
            if (userGames[i][0] != null) {
                let gameDetails = await GetGameDetails(userGames[i][0]);
                gameDetailsArray.push({gameDetails, index: i, platforms: userGames[i][1]});
            }else{
                gameDetailsArray.push({gameDetails: null, index: i});
            }
        }
        dispatch(setUserGames({ games: gameDetailsArray }));
    }catch{
        //navigate(`/error?type=404&message=Uh oh! This could be a server error!`);
    }
};