import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import UserPost from './UserPost';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';
import { useLocation } from "react-router-dom";
import { setPosts } from "../redux/postSlice";

// Button component with submit function for completing forms
const FeedColumn = ({ posts }) => {

    const LoggedInUser = useSelector((state) => state.user);
    const form = useForm({ mode: "onChange" });
    const { register, handleSubmit, control, setValue } = form;
    const dispatch = useDispatch();
    const location = useLocation();

    // Create a new post and send to server
    const postStatus = async (data) => {

        // Create form data alongside image file
        const formData = new FormData();
        formData.append('UserId', LoggedInUser.user._id);
        for (let key in data) {
          if (data[key] instanceof FileList) {
            formData.append(key, data[key][0]);
          } else {
            formData.append(key, data[key]);
          }
        }
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        // Send data to post route in server
        const response = await fetch("https://socialappserver-hpis.onrender.com/post", {
          method: "POST",
          headers: { "Authorization":"Bearer "+LoggedInUser.token },
          body: formData,
        });

        
        if (response.ok) {
            let data = await response.json();
            // If okay then set redux state with new post
            dispatch(setPosts({ posts: data }));
            setValue("BodyText", "");
        } else {
            // Navigate to error page if response is not ok
            let data = await response.json();
            console.log(data.message)
            //navigate(`/error?type=${response.status}&message=${response.statusText}.`);
        }
    };

    

    return (
        
        <div className="feed w-1/2 bg-transparent rounded-xl mx-4" style={{marginRight:'1%', marginLeft:'1%', marginTop:'10px', paddingTop:'10px',display: 'flex', flexDirection: 'column', overflow:'auto'}}>
            {location.pathname === '/' && (

                // User feed create post form
                <div className="feed bg-white rounded-xl shadow-lg" style={{width:'100%', height:'100%', paddingTop:'2px',paddingLeft:'2px',paddingRight:'2px'}}>
                    <form onSubmit={handleSubmit(postStatus)} style={{height:'180px',width:'100%'}}>
                        <div style={{width:'100%', height:'100%', justifyContent:'center',marginTop:'-10px', alignItems:'center',display:'flex'}}>
                            <div style={{width:'10%', height:'75%', margin:'15px', marginRight:'5px', display: 'flex', justifyContent:'center'}}>
                                <div className="avatar rounded-full bg-gray-200 shadow-lg flex items-center justify-center" style={{ height:'55px', width:'55px', border: '1px solid grey', backgroundImage: `url(https://socialappserver-hpis.onrender.com/images/${LoggedInUser.user.ProfilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Avatar Image">
                                </div>
                            </div>
                            <div className="" style={{width:'100%', height:'75%', justifyContent:'center',alignItems:'center',display:'flex', position: 'relative'}} >
                                <textarea className="focus:outline resize-none w-full border border-gray-400 p-2 bg-[#f0f2f5]" type="text" placeholder="What's on your mind?" style={{margin:'15px 10px 10px 10px', height:'100%', fontSize:'18px', borderRadius:'12px', outlineColor:'#d9d9d9', outlineWidth:'2px', outlineStyle:'none', border: '0px solid #aeaeae', paddingLeft:'14px'}} 
                                {...register("BodyText", {
                                                required: "Tell us a bit more info!",
                                })}
                                />
                                <div style={{ width:'200px', height:'35px', position: 'absolute', bottom: '7px', right: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <UploadButton buttonText="Upload Photo" style={{ alignItems:'center', fontSize:'17px',margin:'5px', marginRight:'-2px', width:'70%', height:'100%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#39AD55'} hoverColor={'#2e8f46'} 
                                        control={control} name="Image"
                                    />
                                    <SubmitButton buttonText="Post" style={{ fontSize:'17px', margin:'5px', height:'100%', width:'30%', border: '1px solid #D6D6D6', borderRadius: '10px', textShadow: '0px 0 #171717, 0 0px #171717, 0px 0 #171717, 0 0px #171717' }} backgroundColor={'#0866ff'} hoverColor={'#095de7'}  />
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>
            )}
            {/*If page is search page, display the search title at top of page*/}
            {location.pathname.startsWith('/search') && (
                <h1 className="text-2xl font-bold" style={{fontSize:'28px', marginBottom:'-5px'}}>Search Results</h1>
            )}
            {/*If page is search page, display the user profile title at top of page*/}
            {location.pathname.startsWith('/users') && (
                <h1 className="text-2xl font-bold" style={{fontSize:'28px', marginBottom:'-5px'}}>User Profile</h1>
            )}

            {/*Display all posts from user state*/}
            {!posts ? (
                // Placeholder component
                <div style={{height: '250px'}}></div>
            ) : (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {posts.map((post) => (
                    <div>
                        <UserPost key={post._id} post={post} />
                    </div>
                    ))}
                    </div>
                )}
        </div>
        
        
    );
};

export default FeedColumn;