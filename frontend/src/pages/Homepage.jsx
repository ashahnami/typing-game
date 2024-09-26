import React from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom'

import '../assets/style.css'

const Homepage = () => {
    const logout = async () => {
        await axios.post('/api/auth/logout', { withCredentials: true })
        .then(function(response) {
            console.log(response.status)
            redirect('/login')
        })
    }
  return (
    <div>
      <div className="navbar">
        <button className='' onClick={() => logout()}>Sign out</button>
        </div>

        <div className="parent">
            <h1>Welcome (first name)!</h1>

            <h2>Highscore: (high score)</h2>

            <div className="timer" id="timer">15</div> 

            <div className="wpm" id="wpm"></div> 

            <div className="container">
                <div className="showQuote" id="showQuote"></div> 
                <textarea className="inputQuote" id="inputQuote" onPaste={() => {return false}}></textarea> 
            </div>

            <a href="leaderboard.php" title="Leaderboard" alt="Leaderboard"><img src="leaderboard-icon.png" style={{width:40 + 'px', paddingTop:10 + 'px'}} /></a>

            <a href="stats.php" title="Statistics" alt="Statistics"><img src="stats-icon.png" style={{width:40 + 'px', paddingTop:10 + 'px'}} /></a>
        </div>
    </div>
  )
}

export default Homepage
