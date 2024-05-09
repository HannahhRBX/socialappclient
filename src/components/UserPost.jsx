import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaCommentDots } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setPost,setPosts } from "../redux/postSlice";
import PostComments from './Comments';
import { useForm } from "react-hook-form";
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';

// User post element
const UserPost = (props) => {
    const LoggedInUser = useSelector((state) => state.user);
    const UserData = LoggedInUser.user;

    // Destructure post properties
    const { _id, UserId, BodyText, Image, Comments, Likes, createdAt } = props.post;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [isLikeHovered, setLikeHovered] = useState(false);
    const [isCommentHovered, setCommentHovered] = useState(false);

    // Check if post is liked by logged in user
    const isLiked = Boolean(Likes[LoggedInUser.user._id]);
    const likeCount = Object.keys(Likes).length
    const commentCount = Object.keys(Comments).length

    // Initiate redux dispatch and form
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({ mode: "onChange" });
    const { register, handleSubmit, setValue } = form;
    
    // Fetch user data from server
    
    // Send like to post
    const patchLike = async () => {
        console.log(LoggedInUser.user._id)
        const response = await fetch(`https://socialappserver-hpis.onrender.com/posts/${_id}/like`, {
          method: "PATCH",
          headers: {
            "Authorization":"Bearer "+LoggedInUser.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId: LoggedInUser.user._id }),
        });
        
        if (response.ok) {
            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
        
    };

    // Delete post from server
    const deletePost = async (data) => {
        const response = await fetch(`https://socialappserver-hpis.onrender.com/posts/${_id}/delete`, {
            method: 'DELETE',
            headers: {
                "Authorization":"Bearer "+LoggedInUser.token,
                "Content-Type": "application/json",
              },
        });
        if (response.ok) {
            let data = await response.json();
            dispatch(setPosts({ posts: data }));
        } else {
            // Navigate to error page if response is not ok
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    };

    // Send comment to post
    const postComment = async (data) => { 
        
        // Send data to register route in server
        const response = await fetch(`https://socialappserver-hpis.onrender.com/posts/${_id}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json","Authorization":"Bearer "+LoggedInUser.token },
          body: JSON.stringify({
            UserId: UserData._id, // Assuming the user's id is stored in UserData._id),
            ...data,
            }),
        });
        
        if (response.ok) {
            let updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));
            setValue("BodyText", "");
        } else {
            navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    };

    // Get user data on load
    useEffect(() => {
        const GetUser = async () => {
            const response = await fetch(`https://grand-sunshine-1957f1.netlify.app/users/${UserId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const data = await response.json();
                setFirstName(data.FirstName);
                setLastName(data.LastName);
                setProfilePicture(data.ProfilePicture);
            } else {
                // Navigate to error page if response is not ok
                navigate(`/error?type=${response.status}&message=${response.statusText}.`);
            }
        };
        GetUser();
    }, [navigate, UserId]); // Only run once when page loads

    return (
        <div className="feed bg-white rounded-xl shadow-lg" style={{width:'100%', height:'auto', marginTop:'25px', paddingTop:'15px',paddingBottom:'20px'}}>
                {UserId === LoggedInUser.user._id && (
                    <div style={{ position: 'relative' }}>
                        <img src="https://socialappserver-hpis.onrender.com/images/Delete.png" alt="Delete" onClick={deletePost} style={{ position: 'absolute', top: '-2px', right: '13px', width: '20px', height: '21px' }} className="hover:opacity-75 cursor-pointer" />
                    </div>
                )}
                <div className="" style={{height:'22%',paddingLeft:'15px',paddingRight:'15px',paddingBottom:'5px'}}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div className="avatar rounded-full bg-gray-200 shadow-lg flex items-center justify-center" style={{ height:'60px', width:'60px', border: '1px solid grey', backgroundImage: `url(https://socialappserver-hpis.onrender.com/images/${profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image">
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <a href={`https://grand-sunshine-1957f1.netlify.app/users/${UserId}`}>
                                <h2 className="text-2xl font-bold" style={{fontSize:'20px', marginBottom:'-5px'}}>{firstName} {lastName}</h2>
                            </a>
                            <p>{formatDistanceToNow(new Date(createdAt))} ago</p>
                        </div>
                    </div>
                    <p style={{padding:'7px'}}>{BodyText}</p>
                </div>
                {Image &&
                <div style={{width:'100%', height:'350px', display: 'flex', justifyContent:'center',backgroundColor: 'black'}}>
                    <div className="postImage flex items-center justify-center" style={{ height:'auto', width:'100%' }} aria-label="Post Image">
                        <img src={`https://socialappserver-hpis.onrender.com/images/${Image}`} style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} alt="Post" />
                    </div>
                </div>
                }
                <div style={{ height: '1px', backgroundColor: '#D5D5D5', margin:'3px 0px 0px 0px' }}></div> {/* This is the divider */}
                {/* Section for number of likes and comments */}
                <div className="" style={{height:'22%',paddingLeft:'7px',paddingRight:'5px',paddingBottom:'5px', paddingTop:'7px', display: 'flex', alignItems: 'center'}}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: isLikeHovered ? '#F2F2F2' : 'transparent', borderRadius:'10px',padding:'2px 9px 2px 5px' }} onMouseEnter={() => setLikeHovered(true)} onMouseLeave={() => setLikeHovered(false)}>
                        {isLiked  ? 
                            <AiFillHeart style={{ color: '#F34A4A',height:'40px', width:'40px',cursor: 'pointer' }} onClick={patchLike} /> 
                            : 
                            <AiOutlineHeart style={{ color: '#F34A4A',height:'40px', width:'40px',cursor: 'pointer' }} onClick={patchLike} />
                        }
                        <span style={{ marginLeft: '5px', fontWeight:'500' }}>{likeCount} Likes</span>
                    </div>
                    <div style={{flexGrow: 0.1}}></div>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: isCommentHovered ? '#F2F2F2' : 'transparent', borderRadius:'10px',padding:'2px 9px 2px 5px' }} onMouseEnter={() => setCommentHovered(true)} onMouseLeave={() => setCommentHovered(false)}>
                        <FaCommentDots style={{ color: '#39AD55',height:'40px', width:'35px' }} /> 
                        <span style={{ marginLeft: '5px', fontWeight:'500' }}>{commentCount} Comments</span>
                    </div>
                </div>
                <div style={{ height: '1px', backgroundColor: '#D5D5D5', margin:'2px 0px 0px 0px' }}></div> {/* This is the divider */}
                
                {/* Add a Comment Textbox */}
                <form onSubmit={handleSubmit(postComment)} style={{height:'100%',width:'100%'}}>
                    <div style={{width:'100%', justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <div style={{width:'10%', height:'30%', margin:'15px', marginRight:'5px', display: 'flex', justifyContent:'center'}}>
                            <div className="avatar rounded-full bg-gray-200 shadow-lg flex items-center justify-center" style={{ height:'55px', width:'55px', border: '1px solid grey', backgroundImage: `url(https://socialappserver-hpis.onrender.com/images/${LoggedInUser.user.ProfilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image">
                            </div>
                        </div>
                        <div className="" style={{width:'100%', justifyContent:'center',alignItems:'center',display:'flex', position: 'relative'}} >
                            <textarea className="focus:outline resize-none w-full border border-gray-400 p-2 bg-[#f0f2f5]" type="text" placeholder="Add a comment..." name="commentBox" style={{margin:'15px 10px 10px 10px', height:'100%', fontSize:'18px', borderRadius:'12px', outlineColor:'#d9d9d9', outlineWidth:'2px', outlineStyle:'none', border: '0px solid #aeaeae', paddingLeft:'14px'}} 
                            {...register("BodyText", {
                                            required: "Tell us a bit more info!",
                            })}
                            />
                            <SubmitButton buttonText="Post" name="PostComment" style={{ position: 'absolute', fontSize:'17px', margin:'5px', bottom: '10px', right: '10px', height:'35%', width:'12%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#0866ff'} hoverColor={'#095de7'}  />
                        </div>
                        
                    </div>
                    
                </form>
                {/* List all comments element */}
                <PostComments comments={Comments} _id={_id} />
        </div>
    );
};

export default UserPost;