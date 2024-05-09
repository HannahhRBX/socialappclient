import React, { useState,useRef } from 'react';
import { Controller } from 'react-hook-form';

// Button for uploading image files
const UploadButton = ({ buttonText, style, backgroundColor, hoverColor, control, name }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hiddenFileInput = useRef();
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
    

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div style={{...defaultStyle, ...style}}>
            <button
                onClick={handleClick}
                className='col-span-1 mx-auto items-center justify-center text-center'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {buttonText}
            </button>
            {/*Create custom upload button with file upload set form state*/}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input type="file" style={{display: 'none'}} ref={hiddenFileInput} onChange={(e) => field.onChange(e.target.files[0])} />
                )}
            />
        </div>
    );
};

export default UploadButton;