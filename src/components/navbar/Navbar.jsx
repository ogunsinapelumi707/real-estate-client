import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {currentUser} = useContext(authContext)

   // console.log("navbar", currentUser.userInfo.username)
    // const user = JSON.parse(currentUser)
    // console.log("navbar22", user.username)
  
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>realEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.userInfo.avatar || "/noavatar.jpg"}
              alt=""
            />
            <span>{currentUser.userInfo.username}</span>
            <Link to="/profile" style={{cursor: "pointer"}} className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
