import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import {setPosts} from '../redux/postSlice';
import NavBar from "../components/NavBar";
import ProfileColumn from '../components/ProfileColumn';
import SuggestionsColumn from '../components/SuggestionsColumn';
import FeedColumn from '../components/FeedColumn';
import { useNavigate } from 'react-router-dom';
import Authenticate from "../functions/Authenticate";

// Search Page
const PostSearch = () => {

    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UserData = user.user;

    // Get search parameters from URL
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');

    // Get all posts and users with keyword
    

    
    useEffect(() => {
        // Get post and feed data from server
        const getSearchPosts = async () => {
            const response = await fetch(`https://socialappserver-hpis.onrender.com/search/${keyword}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                // If okay set all search posts to user state
                let data = await response.json();
                dispatch(setPosts({ posts: data }));
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
            
        };
        getSearchPosts();
    }, [keyword,navigate,dispatch]); // Only run once when page loads
    Authenticate();

    return (
        <div className="home" style={{height:'auto'}}>
            {/*Place navbar at top of page*/}
            <NavBar />
            {/*Background page*/}
            <div className="background flex justify-center" style={{ height: '100vh', backgroundColor: '#f1f2f7'}}>
                {/*Columns for profile, feed and recommended friends*/}
                <div className="content flex w-10/12 mt-6 " style={{margin:'80px 20px 20px',height:'auto',overflow:'auto'}}>
                    {/*Profile column*/}
                    <ProfileColumn UserData={UserData} />
                    {/*Post feed column*/}
                    <FeedColumn posts={posts.posts} />
                    {/*Friend recommendation column*/}
                    <SuggestionsColumn UserData={UserData} />
                </div>
            </div>
        </div>
    );
};

export default PostSearch;