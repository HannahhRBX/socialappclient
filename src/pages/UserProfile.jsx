import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {setPosts} from '../redux/postSlice';
import NavBar from "../components/NavBar";
import ProfileColumn from '../components/ProfileColumn';
import SuggestionsColumn from '../components/SuggestionsColumn';
import FeedColumn from '../components/FeedColumn';
import { useNavigate } from 'react-router-dom';

// User Profile Page
const UserProfile = () => {
    const posts = useSelector((state) => state.posts)
    const { UserId } = useParams();

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    
    // Get post and feed data from server
    useEffect(() => {
        // Get all user posts from server
        const getUserPosts = async () => {
            const response = await fetch(`https://socialappserver-hpis.onrender.com/users/${UserId}/posts`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                
            });
            if (response.ok) {
                // If response okay set posts to user redux state
                let data = await response.json();
                dispatch(setPosts({ posts: data }));
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
            
        };
        // Get user data from server
        const getUser = async () => {
            const response = await fetch(`https://socialappserver-hpis.onrender.com/users/${UserId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                // If response okay set user useState data
                const data = await response.json();
                setUser(data)
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
            
        };
        getUser();
        getUserPosts();
    }, [UserId,dispatch,navigate]); // Only run once when page loads
    

    return (
        <div className="home" style={{height:'auto'}}>
            {/*Place navbar at top of page*/}
            <NavBar />
            {/*Background page*/}
            <div className="background flex justify-center" style={{ height: '100vh', backgroundColor: '#f1f2f7'}}>
                {/*Columns for profile, feed and recommended friends*/}
                {user && (
                    <div className="content flex w-10/12 mt-6 " style={{margin:'80px 20px 20px',height:'auto',overflow:'auto'}}>
                        {/*Profile column*/}
                        <ProfileColumn UserData={user} />
                        {/*Post feed column*/}
                        <FeedColumn posts={posts.posts} />
                        {/*Friend recommendation column*/}
                        <SuggestionsColumn UserData={user} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;