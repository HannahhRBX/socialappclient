import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import DropDownButton from './DropDownButton';

{/*Top navigation bar*/}
const NavBar = () => {
  const [isHoveredSearch, setIsHoveredSearch] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({ mode: "onChange" });
  const { register, handleSubmit, setValue, formState: { errors } } = form;

  const onSubmit = async (data) => {
    navigate(`/search?keyword=${data.Search}`);
  };

  const [isScreenWidthSmall, setIsScreenWidthSmall] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenWidthSmall(window.innerWidth < 1280);
    };
  
    window.addEventListener('resize', handleResize);
  
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    const logoutClick = async () => {
        dispatch(logout());
        navigate('/login');
    };
    const gamesClick = async () => {
        navigate('/games');
    };
    const profileClick = async () => {
        navigate('/editProfile');
    };

  return (
    <div style={{position:'sticky', display:'flex', height:'auto', zIndex: 1 }}>
        <nav className="shadow-lg" style={{ 
            width: '100%', 
            height: '70px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: '#252525',
            
            top: 0,
            zIndex: 2,
            }}>
            <div style={{
                backgroundImage: 'url("https://wallpapercave.com/wp/wp4464940.jpg")',
                filter: 'blur(1px)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
            }}></div>
            {/*Main navbar container*/}
            <div style={{ width:'100%',height: '30%',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                {/*Logo div*/}
                <div style={{ flex: 1,display: 'flex', justifyContent: 'flex-start' }}>
                    <Link to="/">
                    <img className="hover:opacity-85 cursor-pointer" src="http://localhost:5000/images/logo.png" alt="Logo" style={{ width: 'auto', paddingLeft:'20px', height: '30px', cursor: 'pointer' }} />
                    </Link>
                </div>
                {/*Flex div to seperate logo, search bar and logout button into three columns*/}
                <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
                    {/*Searchbar div*/}
                    <div style={{ display: 'flex', height: '47px', width: '70%', overflow: 'hidden', border: '1px solid grey',borderRadius: '9999px', backgroundColor: 'white' }}>
                        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%',height:'100%', overflow:'visible',display: 'flex'}}>
                            <input className="focus:outline-none" placeholder='Search' type="text" style={{ flex: '1', padding: '15px', backgroundColor: 'transparent', border: 'none', fontSize:'1.1rem', fontWeight:'500' }} 
                            {...register("Search")}
                            />
                            <div style={{ width: '20%', display: 'flex', paddingRight:'5px', alignItems: 'center',  justifyContent: 'right', backgroundColor: 'white' }}>
                            
                            <input 
                            type="image" 
                            src="http://localhost:5000/images/Search.png" 
                            onMouseEnter={() => setIsHoveredSearch(true)}
                            onMouseLeave={() => setIsHoveredSearch(false)}
                            className="hover:opacity-85 cursor-pointer"
                            style={{ 
                                width: 'auto', 
                                paddingLeft:'20px', 
                                paddingRight:'7px',
                                height: '30px', 
                                cursor: 'pointer'
                            }}
                            alt="Submit" 
                            />
                            </div>
                        </form>
                    </div>
                </div>
                <button style={{ width:'40px', height:'40px', flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
                    <img className="hover:opacity-85 cursor-pointer" style={{width:'40px',height:'40px', marginRight:'15px', alignItems:'center',justifyContent:'center'}} src="http://localhost:5000/images/Hamburger.png" alt="Menu" onClick={() => setIsOpen(!isOpen)} />
                </button>
            </div>
        </nav>
        {isOpen && (
            <div className="menu shadow-2xl" style={{ backgroundColor:'#FFFFFF', position:'absolute', width:'150px', height:'115px', zIndex: 5, right: 10, top: 80, borderRadius:'15px',border: '1px solid #d1d1d1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow:'hidden' }}>
                
                
                <DropDownButton btnText="Logout" onClick={logoutClick}/>
                <DropDownButton btnText="Edit Games" onClick={gamesClick}/>
                <DropDownButton btnText="Edit Profile" onClick={profileClick}/>
                
                
            </div>
        )}
    </div>
  );
};

export default NavBar;