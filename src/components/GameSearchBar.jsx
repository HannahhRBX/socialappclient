import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

// Button with navigation URL parameter on click for importing into pages
const GameSearchBar = ({ searchGame }) => {
    const [isHoveredSearch, setIsHoveredSearch] = useState(false);
    const form = useForm({ mode: "onChange" });
    const { register, handleSubmit, control, setValue, formState: { errors } } = form;

    const onSubmit = (data) => {
        searchGame(data);
    };

    return (
        <div style={{ height: '50px', width: '100%', overflow: 'hidden',borderRadius: '11px', backgroundColor: '#f1f2f7',alignItems: 'center', justifyContent: 'center',display: 'flex' }}>
            <div style={{ height: '50px', width: '600px', overflow: 'hidden', border: '1px solid grey',borderRadius: '24px', backgroundColor: 'white',alignItems: 'center', justifyContent: 'center',display: 'flex'}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%',height:'100%', overflow:'visible',display: 'flex'}}>
                    <input className="focus:outline-none" placeholder='Search' id="GameSearch" type="text" style={{ flex: '1', padding: '15px', backgroundColor: 'transparent', border: 'none', fontSize:'1.1rem', fontWeight:'500' }} 
                        {...register("SearchTerms")}
                    />
                    <div style={{ width: '20%', display: 'flex', paddingRight:'5px', alignItems: 'center',  justifyContent: 'right', backgroundColor: 'white' }}>
                        
                        <input 
                            type="image" 
                            id="ClickSearchGame"
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
    );
};

export default GameSearchBar;