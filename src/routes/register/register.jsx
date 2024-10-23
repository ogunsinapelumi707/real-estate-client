import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiReuest from "../../lib/apiRequest";
function Register() {
  const [error,setError] = useState("")
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)

  const handleSubmit = async(e) =>{
    
    e.preventDefault() 
    setError('')
    setIsLoading(true)
    const formData = new FormData(e.target)

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await apiReuest.post("/auth/register", {
        username, email, password
      })
  
      navigate("/login")
    } catch (error) {
      setError(error.response.data.message)

    }finally{
      setIsLoading(false)
    }

  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Create an Account</h1>
          {
            error && <span className="">{error}</span>
          }
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading} >Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
