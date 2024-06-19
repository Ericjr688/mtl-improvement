import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/authContext"

function Login () {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [err, setErr] = useState(null)

  const navigate = useNavigate()
  
  const {login} = useContext(AuthContext)

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      setErr(err.response.data)
    }
  }


  return ( 
    <div className="auth">
      <h1 className="label">Login</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        {err && <p className="error">{err}</p>}
        <button onClick={handleSubmit}>Login</button>
      </form>
      <span>Don't have an account? <Link to="/register">Register</Link></span>
    </div>
   );
}

export default Login ;