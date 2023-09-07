import React, { Fragment, useEffect, useState } from 'react';
import './style.css';
import Header from '../Header';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
    const navigate = useNavigate()
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [showMessage, setShowMessage] = useState(false)

    const firestore = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        if (!auth.currentUser) return;

        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);

        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            const data = docSnapshot.data();
            if (data) {
                setAge(data.age);
                setGender(data.gender);
                setFullName(data.fullName)
            }
            if (data?.hasLoggedInBefore == undefined) {
                setShowMessage(true)
                setDoc(userDocRef, { hasLoggedInBefore: true }, { merge: true });
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [auth.currentUser, firestore]);

    const handleSave = async () => {
        if (!auth.currentUser) return;

        const userDoc = doc(firestore, 'users', auth.currentUser.uid);
        await setDoc(userDoc, { age, gender, fullName }, { merge: true });
        alert('Profile updated!');
    };

    const handleDeleteAccount = async () => {
        if (!auth.currentUser) return;

        // Deleting user data from Firestore
        const userDoc = doc(firestore, 'users', auth.currentUser.uid);
        await deleteDoc(userDoc);

        // Deleting the user account
        await deleteUser(auth.currentUser);
        alert('Account deleted');
        navigate("/signin")
    };
    return (
        <Fragment>
            <Header ></Header>
            <Container sx={{ marginTop: 5, justifyContent: 'center', display: "flex" }}>
                <Box sx={{ width: '50%', backgroundColor: "white", padding: "20px" }}>
                    <Typography variant="h5">User Profile</Typography>

                    {showMessage && <Alert color="info">
                        Welcome! It's your first time here. Please complete your profile.
                    </Alert>}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 16 }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: 16 }}
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Container>
        </Fragment>
    );
}

export default Main;
