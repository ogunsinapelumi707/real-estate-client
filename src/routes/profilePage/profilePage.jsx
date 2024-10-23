import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "../../context/AuthContext";

function ProfilePage() {
  const navigate = useNavigate()
  const {currentUser, updateUser} = useContext(authContext)

  const handleLogOut =  async() =>{
       await apiRequest.post("/auth/logout")
       localStorage.removeItem("userInfo")
        updateUser(null)
        navigate('/login')      
   
  }


  return (
   <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "noavatar.jpg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogOut}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add" >
              <button>Create New Post</button>
            </Link>
            
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
