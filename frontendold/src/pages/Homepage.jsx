import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import Countdown from 'react-countdown'

import '../assets/style.css'
import useAuth from '../hooks/useAuth'

const socket = io.connect('http://localhost:3001')

const Homepage = () => {
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { user } = useAuth()
  const countdownRef = useRef()

  const logout = async () => {
      await axios.post('/api/auth/logout', { withCredentials: true })
      .then(function(response) {
          navigate('/login')
      })
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }

  useEffect(() => {
    socket.on('start_game', () => {
      
    })
  }, [socket])

  return (
    <div>
      <div className="navbar">
        <button className='' onClick={() => logout()}>Sign out</button>
      </div>

      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />

      <button onClick={joinRoom}> Join Room</button>

      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />

      <button onClick={sendMessage}> Send Message</button>

        <div className="parent">
            <h1>Welcome {user.user}!</h1>

            <h2>Highscore: (high score)</h2>

            {/* <div className="timer" id="timer">15</div>  */}
            <Countdown 
              date={Date.now() + 30000} 
              autoStart={false}
              ref={countdownRef}
              className='timer'
            />

            <button onClick={() => countdownRef.current.start()}>Start game</button>

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
