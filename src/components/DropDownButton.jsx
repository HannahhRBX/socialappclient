import React, { useState } from 'react';
// Dropdown component for inserting into dropdown lists
const DropDownButton = ({ btnText, onClick }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{backgroundColor: isHovered ? '#4c658e' : '#ffffff', marginTop:'-1px', width:'105%', height:'40px',border: '1px solid #adadad',cursor:'pointer'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <a style={{ height:'100%'}} onClick={onClick}>
                <h2 className="text-2xl" style={{paddingLeft:'15px', paddingTop:'2px',color: isHovered ? '#ffffff' : '#000000', height:'100%',fontSize:'17px', fontWeight: isHovered ? '900' : '600', marginBottom:'-5px',textShadow: isHovered ? '-1px 0 #292929, 0 1px #292929, 1px 0 #292929, 0 -1px #292929' : ''}}>{btnText}</h2>
            </a>
        </div>
    );
};

export default DropDownButton;