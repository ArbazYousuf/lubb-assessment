/** @jsxImportSource @emotion/react */
import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main, SignIn, SignUp, } from "./screens";
import { app } from './utils/firebaseConfig';

import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './screens/ProtextedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Main /></ProtectedRoute>
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]);


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  );
}

export default App;
