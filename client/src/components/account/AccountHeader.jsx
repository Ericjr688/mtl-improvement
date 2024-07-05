import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

import './acount-header.scss'

function AccountHeader() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation();

  if (!currentUser) {
    navigate("/")
    return (
      <div>No User</div>
    )
  }
  return (
    <div className="header">
      <div className="info">
        <div>{currentUser.username}</div>
        <div>{currentUser.email}</div>
      </div>
      
      <nav className="tabs">
        <ul>
          <Link className="link" to="/account"><li className={`tab ${location.pathname === '/account' ? 'active' : ''}`}>Info</li></Link>
          <Link className="link" to="/account/library"><li className={`tab ${location.pathname === '/account/library' ? 'active' : ''}`}>Library</li></Link>

          {/* <li className="tab">Comments</li> */}
          {/* <li className="tab">Rating</li> */}
        </ul>
        
      </nav>
    </div>
  )
}

export default AccountHeader