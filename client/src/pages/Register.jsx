import { Link } from "react-router-dom"
import "./login.scss"
import { useState } from "react";
import axios from "axios"

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register", inputs)
      console.log(res)
    } catch (err) {
      console.log(err.message)
    }
  }

  console.log(inputs)

  return ( 
    <div className="auth">
      <h1 className="label">Register</h1>
      <form>
        <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
        <input required type="email" placeholder="email" name="email" onChange={handleChange}/>
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
      </form>
      <span>Already have an accout? <Link to="/login">Log in</Link></span>
    </div>
   );
}

export default Register;