import { Link, useNavigate } from "react-router-dom"
import "./login.scss"
import { useState } from "react";
import axios from "axios"

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login")
    } catch (err) {
      setErr(err.response.data)
    }
  }


  return ( 
    <div className="auth">
      <h1 className="label">Register</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input required type="email" placeholder="email" name="email" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        {err && <p className="error">{err}</p>}
        <button onClick={handleSubmit}>Register</button>
      </form>
      <span>Already have an accout? <Link to="/login">Log in</Link></span>
    </div>
   );
}

export default Register;