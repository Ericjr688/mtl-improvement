import React, { useContext } from 'react'
import { AuthContext } from "../../context/authContext"
import { useNavigate } from 'react-router-dom'

function AccountInfo() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  
  return (
    <div className="account-info">
      
      <div>Test</div>
    </div>
    
  )
}

export default AccountInfo