import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import InputMessage from "./components/InputMessage";
import ChatBox from "./components/ChatBox";



function App() {
  const sampleMessages = [{
    id: 1,
    owner: "admin",
    text: "Welcom to Sarkar, an RBI notification knowledge base, please ask your questions here."
  },
  ];

// ]
  
  const [message, setMessage] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    setMessages(sampleMessages);
   // DO SOMETHING WHEN THE PAGE LOADS
  }, []);

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
        text: "Getting Response, Please wait, it might take some time, upto 10 seconds sometimes....", // Representing typing indicator
    };

    // Add user message and typing indicator
    setMessages((messages) => [...messages, typingIndicator]);
    setShowInput(false);


    const post_data = {
      message: message_text, 
      conversation_id: conversationId,
    }

    const res = await fetch('http://65.1.92.45:8080/message/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post_data),
    })

    const newid = Math.floor(Math.random() * 10000) + 1

    const data = await res.json()
    const numberedSources = data['source'].map((source, index) => `${index + 1}. ${source}`).join('\n');

    const messageNewAdmin = {
      id: newid,
    owner: "admin",
    text: data["text"] + "\n\n" + "Source List:\n" + numberedSources
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