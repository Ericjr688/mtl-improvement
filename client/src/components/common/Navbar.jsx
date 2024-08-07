import { useContext } from "react";
import "./navbar.scss"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function NavBar() {
  const {currentUser, logout} = useContext(AuthContext)

  return ( 
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            MTL Improvement
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/series">
            <h6>All Novels</h6>
          </Link>
          {/* <Link className="link" to="/improve-translation">
            <h6>Improve Translation</h6>
          </Link> */}
          {currentUser && <Link className="link" to="/account"><span>{currentUser.username}</span></Link>}
          {currentUser ? <span className="logout" onClick={logout}>Logout</span> : <Link className="link" to="/login"> <h6>Login</h6></Link>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;