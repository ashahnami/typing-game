import React from 'react'
import '../assets/style.css'

const Login = () => {
  return (
    <div>
        <h1 style={{position:'relative', bottom: 6 + 'rem', left: 8 + 'rem'}}>Sign in</h1>
        <div className="container2">
            <a href="/api/auth/google">Login with Google</a>
        </div>
    </div>
  )
}

export default Login
