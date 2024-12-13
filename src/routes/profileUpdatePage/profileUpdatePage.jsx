import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { authContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest"
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("")
  const { currentUser, updateUser} = useContext(authContext)
  const [avatar, setAvatar] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const {username, email, password} = Object.fromEntries(formData)

    try {
      const response = await apiRequest.put(`/users/${currentUser.id}`, {username, email, password, avatar: avatar[0]})
      updateUser(response.data)
      console.log(response)
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.userInfo.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.userInfo.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password"  type="password" />
          </div>
          <button>Update</button>
          {
            error && <span>{error}</span>
          }
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.userInfo.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        <UploadWidget uwConfig={{
          cloudName: "pelumi4",
          uploadPreset: "estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder:"avatar"
        }}
        setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
