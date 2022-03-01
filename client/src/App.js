import { useState } from 'react';
import io from 'socket.io-client';

import './App.css';
import Chat from './components/chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Chat</h3>
      <input
        type='text'
        placeholder='Name...'
        onChange={ ({ target: { value } }) => setUsername(value) }
      />
      <input
          type='text' placeholder='Room ID..'
          onChange={ ({ target: { value } }) => setRoom(value) }
      />
      <button
        onClick={ joinRoom }
      >
        Room
      </button>

      <Chat
        socket={ socket }
        userName={ username }
        room={ room }
      />
    </div>
  );
}

export default App;
