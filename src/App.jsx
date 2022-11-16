import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthContextProvider from "./context/AuthContextProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
