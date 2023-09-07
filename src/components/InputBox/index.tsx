import React from 'react';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const StyledInput = styled(InputBase)(({ theme, error }) => ({
    marginTop: 15,
    border: error ? '1px solid red' : '1px solid #ccc',
    borderRadius: "8px",
    paddingLeft: theme.spacing(5),  // Giving enough space for the icon
    position: 'relative',
    width: "100%",
    height: 50,
    '& .MuiInputBase-root': {
        left: 20
    },
    color: "#333",
    fontFamily: "Poppins",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",

    '& .MuiSvgIcon-root': {
        position: 'absolute',
        top: '50%',
        left: 10,
        transform: 'translateY(-50%)',
        height: 24,  // Size of the icon
        color: "#333",
        opacity: 0.3,
    },
    // '@media (max-width: 600px)': {
    //     width: '80%',
    //     margin: '15px auto',  // Center the input on the screen
    // }
}));

interface InputWithIconProps {
    icon?: React.ReactNode;
    placeholder?: string;
    onChange: any,
    secure?: boolean,
    name?: string,
    error?: boolean,
    onFocus?: any,
    value?: string
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, placeholder, onChange, secure = false, name, error = false, onFocus, value }) => {
    return (
        <StyledInput
            placeholder={placeholder}
            startAdornment={icon}
            onChange={onChange}
            type={`${secure ? 'password' : 'text'}`}
            name={name}
            error={error}
            onFocus={onFocus}
            value={value}
        />
    );
};

export default InputWithIcon;