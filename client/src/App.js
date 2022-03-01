import { useState } from 'react';
import io from 'socket.io-client';

import './App.css';
import Chat from './components/chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
    { !showChat
      ? (
        <div>
          <h3>Chat</h3>
          <input
            type='text'
            placeholder='Name...'
            onChange={ ({ target: { value } }) => setUsername(value) }
          />
          <select
            onChange={ ({ target: { value } }) => setRoom(value) }
          >
            <option value="">Rooms</option>
            <option value="1">Room 01</option>
            <option value="2">Room 02</option>
            <option value="3">Room 03</option>
          </select>
          <button
            onClick={ joinRoom }
          >
            Room
          </button>
        </div>
    )
    : (
      <Chat
        socket={ socket }
        userName={ username }
        room={ room }
      />
    )}
    </div>
  );
}

export default App;
