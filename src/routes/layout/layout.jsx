import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "../../context/AuthContext";

 function Layout() {
  const {currentUser} = useContext(authContext)
 console.log("currentUser", currentUser)
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}
useEffect(() => {
    console.log("AuthContextProvider initialized:", currentUser);
}, [currentUser]);

 function RequiredAuth() {
  const {currentUser} = useContext(authContext)
 console.log("currentUser in RequiredAuth:", currentUser); // Debug log
  return !currentUser ? (
    <Navigate to="/login"/> ):
   ( <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>)
 
}

export {Layout, RequiredAuth};
