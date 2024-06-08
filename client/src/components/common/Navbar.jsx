import "./navbar.scss"
import { Link } from "react-router-dom";

function NavBar() {
  return ( 
    <div className="navbar">
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
          <Link className="link" to="/improve-translation">
            <h6>Improve Translation</h6>
          </Link>
          <Link className="link" to="/login">
            <h6>Login</h6>
          </Link>
          <span>Eric</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;