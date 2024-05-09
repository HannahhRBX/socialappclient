import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {setPosts} from '../redux/postSlice';
import NavBar from "../components/NavBar";
import ProfileColumn from '../components/ProfileColumn';
import SuggestionsColumn from '../components/SuggestionsColumn';
import FeedColumn from '../components/FeedColumn';
import { useNavigate } from 'react-router-dom';

// https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg
//discord https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg

// Home Page
const Home = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const UserData = user.user;

    
    useEffect(() => {
        // Get post and feed data from server
        const getAllPosts = async () => {
            const response = await fetch("https://socialappserver-hpis.onrender.com/posts", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                
            });
            if (response.ok) {
                let data = await response.json();
                dispatch(setPosts({ posts: data }));
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
            
        };
        getAllPosts();
    }, [dispatch,navigate]); // Only run once when page loads

    return (
        <div className="home" style={{height:'auto'}}>
            {/*Place navbar at top of page*/}
            <NavBar />
            {/*Background page*/}
            <div className="background flex justify-center" style={{  height: '100vh', backgroundColor: '#f1f2f7'}}>
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

export default Home;