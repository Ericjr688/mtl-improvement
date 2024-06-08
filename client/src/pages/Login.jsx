import { Link } from "react-router-dom"
import "./login.scss"

function Login () {
  return ( 
    <div className="auth">
      <h1 className="label">Login</h1>
      <form action="">
        <input required type="text" placeholder="username" />
        <input required type="password" placeholder="password" />
        <button>Login</button>
      </form>
      <span>Don't have an account? <Link to="/register">Register</Link></span>
    </div>
   );
}

export default Login ;