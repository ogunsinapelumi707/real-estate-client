import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
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

 function RequiredAuth() {
  const {currentUser} = useContext(authContext)
 console.log("currentUser", currentUser)
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
