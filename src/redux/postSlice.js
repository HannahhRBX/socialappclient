import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state,action){
            // Sort posts by createdAt date
            action.payload.posts = action.payload.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // Sort comments in each post by date
            action.payload.posts.forEach(post => {
                if (post.Comments) {
                    post.Comments.sort((a, b) => new Date(b[2]) - new Date(a[2]));
                }
            });
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    // Sort comments in the post by date
                    action.payload.post.Comments.sort((a, b) => new Date(b[2]) - new Date(a[2]));
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setPosts, setPost } = postSlice.actions;
export default postSlice.reducer;
