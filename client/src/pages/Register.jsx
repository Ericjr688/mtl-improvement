import { Link } from "react-router-dom"
import "./login.scss"

function Register() {
  return ( 
    <div className="auth">
      <h1 className="label">Register</h1>
      <form action="">
        <input required type="text" placeholder="username" />
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <button>Register</button>
      </form>
      <span>Already have an accout? <Link to="/login">Log in</Link></span>
    </div>
   );
}

export default Register;