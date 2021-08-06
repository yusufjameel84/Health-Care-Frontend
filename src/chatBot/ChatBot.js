import Chatbot from 'react-chatbot-kit'
import React, { useState } from 'react';
import ActionProvider from './ActionProvider';
import Config from './Config';
import MessageParser from './MessageParser';
import { FaHospital } from 'react-icons/fa';

const Chat = () => {
    
    let [isVisible, setisVisible] = useState(false);

    const handleClick = () => {
      setisVisible(!isVisible)
    };
    const saveMessages = (messages) => {
      localStorage.setItem("chat", JSON.stringify(messages));
    };
  
    const loadMessages = () => {
      const messages = JSON.parse(localStorage.getItem("chat"));
      return messages;
    };

    return (
      <div className="App" style= {{ display:"flex", justifyContent:'flex-end' }}>
        <header className="App-header">
          <div style={{boxShadow: '5px 5px 13px rgb(91 81 81 / 40%)', zIndex: '9999'}}>
          {isVisible ? <Chatbot config = {Config} messageParser = {MessageParser} actionProvider = {ActionProvider}  /> : ""}
          </div>
          <div style = {{ display:"flex", justifyContent:'flex-end' }}>
            <FaHospital  size="5em" onClick={handleClick}/>
          </div>
        </header>
      </div>
    );
  }
  
export default Chat;