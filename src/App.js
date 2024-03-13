import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import InputMessage from "./components/InputMessage";
import ChatBox from "./components/ChatBox";



function App() {
//   const sampleMessages = [{
//     id: 1,
//     owner: "admin",
//     text: "this is a sample message"
//   },
//   {
//     id: 2,
//     owner: "user",
//     text: "this is a sampleuser message"
//   },

// ]
  
  const [message, setMessage] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    //setMessages(sampleMessages);
   // DO SOMETHING WHEN THE PAGE LOADS
  }, []);

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const sendMessage = async (message_text) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const messageNew = {
      id: id,
    owner: "user",
    text: message_text
    }
    setMessages(messages => [...messages, messageNew]);
    //setMessages([...messages, messageNew]);

    const typingId = Math.floor(Math.random() * 10000) + 1;
    const typingIndicator = {
        id: typingId,
        owner: "admin",
        text: "...", // Representing typing indicator
    };

    // Add user message and typing indicator
    setMessages((messages) => [...messages, typingIndicator]);
    setShowInput(false);


    const post_data = {
      message: message_text, 
      conversation_id: conversationId,
    }

    const res = await fetch('http://localhost:8000/message/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post_data),
    })

    const newid = Math.floor(Math.random() * 10000) + 1

    const data = await res.json()
    const messageNewAdmin = {
      id: newid,
    owner: "admin",
    text: data["text"]
    }
    setShowInput(true);
    setConversationId(data["conversation_id"]);

    setMessages((prevMessages) => [
      ...prevMessages.filter((message) => message.id !== typingId), // Remove the typing indicator
      messageNewAdmin, // Add the admin response
  ]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  
  

  // const sendMessage = (messageText) => {
  //   const id = Math.floor(Math.random() * 10000) + 1
  //   const messageNew = {
  //     id: id,
  //   owner: "admin",
  //   text: messageText
  //   }
    
  //   return true;
  // };



  return (
    <div className="chatApp__room">
      
      
        
      <ChatBox
					
					messages={messages} handleSendMessage={sendMessage} showInput={showInput}
					
				/>
      
    </div>
  );
}

export default App;