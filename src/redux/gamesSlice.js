import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    games: [],
    userGames: {},
};

const gameSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGames(state,action){
            // Set all games state to payload data
            action.payload.games.current_game = null;
            state.games = action.payload.games;
        },
        setCurrentGame: (state, action) => {
            // Set single game state to payload data

            state.games.current_game = action.payload.game;
        },
        setUserGames: (state, action) => {
            // Set user games state to payload data
            state.userGames = action.payload.games;
        },
    },
});

export const { setGames, setCurrentGame, setUserGames } = gameSlice.actions;
export default gameSlice.reducer;
