import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

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
      setMessageList((list) => [...list, message]);
      setCurrentMessage('');
      document.querySelector('#textMessage').value='';
    }
  };

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <h1>{`Hi ${userName}, you are in room ${room}.`}</h1>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={ index }
                className="message"
                id={ userName === messageContent.userName ? "you" : "other" }
              >
                <div>
                  <div className="message-content">
                    <p>{ messageContent.currentMessage }</p>
                  </div>
                  <div className="message-meta">
                    <p id="username">{ messageContent.userName } às </p>
                    <p id="time">{ messageContent.time }.</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          id='textMessage'
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