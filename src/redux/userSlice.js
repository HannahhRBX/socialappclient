import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {}, // Cookie stored in localstorage for more efficient access
  matches: JSON.parse(localStorage.getItem("matches")) || {},
  token: null, // Set the initial token to null
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user; // Adjust to use action.payload.user
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = {};
      state.token = null;
      localStorage.removeItem("user");
    },
    updateProfile(state, action) {
      //state.edit = action.payload;
      state.user = action.payload.user;
      console.log(action.payload);
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
          console.error('Invalid user data.');
      }
    },
    updateFriends(state, action) {
      state.user.Friends = action.payload.Friends;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateMatches(state, action) {
      console.log("Updating matches with payload:", action.payload.matches);
      state.matches = action.payload.matches;
      localStorage.setItem("matches", JSON.stringify(action.payload.matches));
      console.log("Updated matches state:", state.matches);
  }

  },
});

export const { login, logout, updateProfile, updateMatches } = userSlice.actions;
export default userSlice.reducer;