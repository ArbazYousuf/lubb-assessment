import React, { useState, useEffect } from 'react';
import './style.css'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputWithIcon from '../../components/InputBox';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Alert, Hidden } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const { login, user, handleGoogleLogin } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false
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
        if (email && isValidEmail(email) && password && password.length >= 8) {
            setErrors({ email: false, password: false })

            login(email, password)
        }

    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const getErrorMessage = () => {
        if (errors.email) return "Please enter a valid email.";
        if (errors.password) return "Password must be at least 8 characters long.";
        return "";
    };

    const errorMessage = getErrorMessage();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Hidden mdDown>
                    <Grid
                        item
                        // xs={false}
                        // sm={false}
                        md={6}
                        // lg={6} xl={6}
                        // sx={{ sm: "hidden" }}
                        className='background-leftside'
                    // hidden={{ smDown: true }}
                    >
                        <Typography className='header-text'>
                            Lubb Assessment Project
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid item sx={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',

                }} xs={12} md={6} component={Paper} elevation={6} square>
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
                        <img src='/logo.png' style={{ maxWidth: '30%', height: 'auto', marginBottom: 40 }} />

                        <Typography
                            className='dont-account-typo'
                            sx={{ fontSize: ["12px", "14px", "16px"] }}
                            style={{ marginBottom: 20 }}
                        >
                            Don’t have an account? <Link href="/signup">Sign Up</Link>
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <InputWithIcon name="email" error={errors.email} onFocus={() => setErrors({ ...errors, email: false })} onChange={(e: any) => setEmail(e.target.value)} icon={<MailRoundedIcon />} placeholder="Email Address" />
                            <InputWithIcon name="password" error={errors.password} onFocus={() => setErrors({ ...errors, password: false })} secure onChange={(e: any) => setPassword(e.target.value)} icon={<LockRoundedIcon />} placeholder="Password" />
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
                                Sign In
                            </Button>
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
    );
}