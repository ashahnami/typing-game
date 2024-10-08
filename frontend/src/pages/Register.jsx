import React from 'react'
import '../assets/style.css'

const Register = () => {
    function checkPasswords() {
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("confirm_password").value;
    if (pw1 != pw2) {           // checks whether passwords are identical
        alert("Passwords do not match."); // shows alert box if the messages are not identical
        return false;
    }
        return true;
    }
 
  return (
    <div>
        <h1 style={{position:'relative', bottom: 7 + 'rem', left: 10 + 'rem'}}>Register</h1>
        <div className="container2">
            <form method="post" action="/auth/register"> 
                <input type="text" name="fname" placeholder="First name" pattern="[A-Za-z]{1,20}" 
                    title="First name must be at least 1 character long and only consist of letters" required />

                <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{5,25}" 
                    title="Username must be at least 5 characters long" required />

                <input type="password" name="password" id="password" placeholder="Password" pattern="(?=.*[a-z])(?=.*[A-Z]).{7,64}" 
                    title="Password must contain be at least 7 characters long and one uppercase and lower letter" required />

                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" required />
                
                <input type="submit" value="Register" onClick="return checkPasswords()" />

                <input type="submit" value="Register" />
            </form>

            <a href="/login">Already have an account? Sign in here</a>
        </div>
    </div>
  )
}

export default Register
