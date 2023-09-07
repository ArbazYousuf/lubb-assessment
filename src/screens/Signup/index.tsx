import React, { useState, useEffect } from 'react';
import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme, useMediaQuery, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputWithIcon from '../../components/InputBox';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Hidden } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AuthProvider, useAuth } from '../../context/authContext';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate()
    const { signup, handleGoogleLogin, user } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState({
        fullName: false,
        email: false,
        password: false,
        rePassword: false,
    })

    useEffect(() => {
        if (user) navigate("/")
    }, [user])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !isValidEmail(email)) {
            // alert('Please enter a valid email.');
            setErrors({ ...errors, email: true })
        }
        if (!password || password.length < 8) {
            // alert('Password must be at least 6 characters long.');
            setErrors({ ...errors, password: true })
        }
        if (password !== rePassword) {
            setErrors({ ...errors, rePassword: true })
        }
        if (email && password && password.length >= 8 && password == rePassword) {
            setErrors({ email: false, fullName: false, password: false, rePassword: false })
            signup(email, password,)
            // dispatch(signup({ email, password, fullname: fullName }))
        }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const getErrorMessage = () => {
        if (errors.email) return "Please enter a valid email.";
        if (errors.password) return "Password must be at least 8 characters long.";
        if (errors.fullName) return "Full name is required."; // Add your message
        if (errors.rePassword) return "Passwords do not match."; // Add your message
        return "";
    };

    const errorMessage = getErrorMessage();

    return (
        <AuthProvider>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Hidden mdDown>
                        <Grid
                            item
                            md={6}
                            className='background-leftside'
                        >
                            <Typography className='header-text'>
                                Empowering Creators Worldwide
                            </Typography>
                        </Grid>
                    </Hidden>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} xs={12} md={6} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: [4, 6, 8],
                                mx: [2, 3, 4],
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: 'inherit',
                                width: "50%",
                                '@media (max-width: 600px)': {
                                    width: '80%',  // Set width to 80% on mobile
                                }
                            }}
                        >
                            <img src='/logo.png' style={{ maxWidth: '100%', height: 'auto', marginBottom: 40 }} />
                            <Typography
                                className='dont-account-typo'
                                sx={{ fontSize: ["12px", "14px", "16px"] }}
                                style={{ marginBottom: 20 }}
                            >
                                Already have an account?  <Link href="/signin">Sign In</Link>
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <InputWithIcon name="email" error={errors.email} onFocus={() => setErrors({ ...errors, email: false })} onChange={(e: any) => setEmail(e.target.value)} icon={<MailRoundedIcon />} placeholder='Email Address' />
                                <InputWithIcon name="password" error={errors.password} onFocus={() => setErrors({ ...errors, password: false })} secure onChange={(e: any) => setPassword(e.target.value)} icon={<LockRoundedIcon />} placeholder='Password' />
                                <InputWithIcon name="password" error={errors.rePassword} onFocus={() => setErrors({ ...errors, rePassword: false })} secure onChange={(e: any) => setRePassword(e.target.value)} icon={<LockRoundedIcon />} placeholder='Re-type Password' />

                                {errorMessage && <Alert sx={{ marginTop: 3 }} severity="error">{errorMessage}</Alert>}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        height: "50px",
                                        borderRadius: "8px",
                                        backgroundColor: '#0575E6',
                                        color: "#FFF",
                                        fontFamily: "Poppins",
                                        fontSize: ["10px", "12px", "14px"],
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "normal",
                                    }}
                                >
                                    Sign Up
                                </Button>

                                <Typography
                                    className='or-typo'
                                    sx={{ fontSize: ["12px", "14px", "14px"] }}
                                >
                                    OR
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleGoogleLogin}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        height: "50px",
                                        borderRadius: "8px",
                                        backgroundColor: 'white',
                                        color: "rgba(0, 0, 0, 0.54);",
                                        fontFamily: "Poppins",
                                        fontSize: ["10px", "12px", "14px"],
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "normal",
                                        display: 'flex',       // Added to align items in a row
                                        alignItems: 'center',  // Align items vertically centered
                                        justifyContent: 'center', // Align items horizontally centered
                                        textTransform: 'none',   // To prevent automatic uppercase of button text
                                        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.25)', // Optional: Add some shadow to button
                                        "&:hover": {
                                            backgroundColor: 'white',  // keep background color unchanged
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)', // apply slight shadow on hover
                                        },
                                        "&:focus": {
                                            backgroundColor: 'white', // keep background color unchanged
                                            boxShadow: '0 0 0 3px rgba(66, 133, 244, 0.5)', // apply a blue focus shadow
                                        },
                                        "&:active": {
                                            boxShadow: 'none', // remove shadow on active state
                                        }
                                    }}
                                    startIcon={<img src="google.png" alt="Google Icon" style={{ width: '24px', marginRight: '8px' }} />} // Use the Google icon
                                >
                                    Continue with Google
                                </Button>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </ThemeProvider>
        </AuthProvider>
    )
}