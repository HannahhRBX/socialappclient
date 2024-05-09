import React, { useState } from 'react';

// Button component with submit function for completing forms
const SubmitButton = ({ buttonText, style, backgroundColor, hoverColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const defaultStyle = { 
        width: '210px', 
        height: '45px', 
        backgroundColor: isHovered ? hoverColor : backgroundColor, 
        color: 'white', 
        padding: '8px', 
        fontWeight: 'bold', 
        borderRadius: '50px',
        fontSize: '1.1rem',
        display: 'flex',
        marginTop: '10px',
        border: '1px solid #B6B6B6',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };

    return (
        <button 
            type="submit"
            className='col-span-1 mx-auto items-center justify-center text-center'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...defaultStyle, ...style }}>
            {buttonText}
        </button>
    );
};

export default SubmitButton;