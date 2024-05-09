import { combineReducers } from "redux";
import userSlice from "./userSlice";
import themeSlice from "./theme";
import postSlice from "./postSlice";
import gamesSlice from "./gamesSlice";

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    posts: postSlice,
    games: gamesSlice,
});

export {rootReducer};