import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

import { BiUser } from 'react-icons/bi'

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-blue-600 sm:text-4xl text-2xl font-bold cursor-pointer">REACT-FLIX</h1>
      </Link>
      {
        user?.email ? (
          <div className="flex">
            <Link to="/account">
              <div className="flex justify-center items-center h-full">
                <BiUser className='bg-white rounded-full sm:p-2 p-1 sm:m-2 m-1 text-black sm:text-4xl text-2xl' />
                <button className="text-white sm:pr-4 pr-2 sm:text-lg text-sm">{user.email.split("@")[0]}</button>
              </div>
            </Link>
            <button className="bg-blue-600 sm:px-6 sm:py-2 px-4 py-1 rounded cursor-pointer text-white" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="text-white sm:pr-4 pr-2">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 sm:px-6 sm:py-2 px-4 py-1 rounded cursor-pointer text-white">Sign Up</button>
            </Link>
          </div>
        )
      }
    </div>
  )
}
