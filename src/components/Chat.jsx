import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { storedUser } from '../features/auth/authSlice';
// import io from "socket.io-client";
import { getPreviousMessages, sendMessage } from '../services/chat';
import { FaWindowClose } from 'react-icons/fa';
import { getUser } from '../services/userApi';

function Chat(props) {
  const userData = useSelector(storedUser); // returns data from redux store
  const [message, setMessage] = useState('');
  const participants = [props.chatId, userData.currentUser._id];
  const [recepientUser, setRecepientUser] = useState({});

  const handleCloseChat = () => {
    props.setChatId(null);
    props.setFeed(null);
  };

  useEffect(() => {
    getPreviousMessages(participants)
      .then((res) => {
        props.setFeed(res);
      })
      .catch((err) => console.log(err));
  }, [props.chatId]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    sendMessage({ message, room: props.feed._id, sendBy: userData.currentUser })
      .then(() => {
        props.socketRef.current.emit('message', {
          message,
          room: props.feed._id,
          sendBy: userData.currentUser,
        });
      })
      .catch((err) => console.log(err));
  };

  const pastMessages = props.feed
    ? props.feed.messages.map((x) => {
        return (
          <div key={x._id} className='message-bubble'>
            {x.message}
          </div>
        );
      })
    : [];
  useEffect(() => {
     getUser(props.chatId)
      .then((response) => {
        console.log(response);
        setRecepientUser(response.data);
      })
      .catch((error) => {
        console.log(error, 'Error getting recepient user');
      });
  }, []);

  return (
    <div id='chat-container'>
      <div className='chat-header'>
        <h3>{recepientUser?.name}</h3>

        <div onClick={handleCloseChat}>
          <FaWindowClose />
        </div>
      </div>
      <div className='chat-body'>
        {pastMessages}
        <form className='chat-input' onSubmit={handleSendMessage}>
          <input
            type='text'
            name='message'
            className='send-bubble'
            value={message}
            onChange={handleChange}
          />
          <button className='send-button' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
