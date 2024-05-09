import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Button with navigation URL parameter on click for importing into pages
const PageButton = ({ buttonText, onClick, style, backgroundColor, hoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const defaultStyle = { 
        width:'160px',
        height:'50px', 
        backgroundColor: isHovered ? '#F5F5F5' : '#FBFBFB', 
        color: '#3D3D3D',
        padding: '8px', 
        fontWeight: '600', 
        borderRadius: '50px',
        fontSize: '1.1rem',
        display: 'flex',
        marginTop:'6px',
        
        border: '1px solid #D6D6D6',
        borderRadius: '10px',
        textShadow: '0px 0 white, 0 0px white, 0px 0 white, 0 -0px white',
        margin: '0 50px',
    };
              

    // Navigate to URL on button click
    const sendClick = () => {
        onClick();
    };

    return (
        <button 
            onClick={sendClick}
            className='col-span-1 mx-auto items-center justify-center text-center'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...defaultStyle, ...style }}>
            {buttonText}
        </button>
    );
};

export default PageButton;