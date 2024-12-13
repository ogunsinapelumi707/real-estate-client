
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiReuest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";

function Login() {

  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {updateUser} = useContext(authContext)


  const handleSubmit = async(e) =>{
   
    e.preventDefault() 
    setIsLoading(true)
    setError('')
    const formData = new FormData(e.target)

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await apiReuest.post("/auth/login", {
        username, password
      }, { withCredentials: true })
      updateUser(response.data)
      //localStorage.setItem("userInfo", JSON.stringify(response.data))
      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
    }finally{
      setIsLoading(false)
    }

  }



  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Welcome back</h1>
          {
            error && <span>{error}</span>
          }
          <input name="username" required min={4} max={15} type="text" placeholder="Username" />
          <input name="password" type="password" required min={6} placeholder="Password" />
          <button disabled ={isLoading}>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
