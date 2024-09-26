import React from 'react'
import '../assets/style.css'

const Login = () => {
  return (
    <div>
        <h1 style={{position:'relative', bottom: 6 + 'rem', left: 8 + 'rem'}}>Sign in</h1>
        <div className="container2">
            <form method="post" action="/auth/login">
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>

            <a href="/register">No account? Register here</a>
        </div>
    </div>
  )
}

export default Login
