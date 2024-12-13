import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Navigate, Outlet } from "react-router-dom";
<<<<<<< HEAD
import { useContext,  useEffect  } from "react";

=======
import { useContext, useEffect } from "react";
>>>>>>> d898278800ca365b93ecc63b141f08be1519ef72
import { authContext } from "../../context/AuthContext";

 function Layout() {
  const {currentUser} =  useContext(authContext)
 console.log("currentUser", currentUser)
 useEffect(() => {
  console.log("AuthContextProvider initialized:", currentUser);
}, [currentUser]);

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
  useEffect(() => {
    console.log("AuthContextProvider initialized:", currentUser);
}, [currentUser]);

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
