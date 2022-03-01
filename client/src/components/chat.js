import React, { useState } from 'react';

export default function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const message = {
        room,
        userName,
        currentMessage,
        time:
          new Date(Date.now()).getHours() + ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', message);
    }
  };


  return (
    <div>
      <div className='chat-header'></div>
      <div className='chat-body'></div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='Hello...'
          onChange={ ({ target: { value }}) => setCurrentMessage(value) }
        />
        <button
          onClick={ sendMessage }
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}