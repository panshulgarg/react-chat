import React from 'react'
import Title from './Title'
import MessageList from './MessageList'
import TypingIndicator from './TyingIndicator'
import InputMessage from './InputMessage'

const ChatBox = ({messages, handleSendMessage, showInput}) => {
  return (
    <div className={"chatApp__conv"}>
    <Title/>
    <MessageList
        
        messages={messages}
    />
    <div className={"chatApp__convSendMessage clearfix"}>
        <TypingIndicator/>
        {showInput && <InputMessage handleSendMessage={handleSendMessage}  
        />}
    </div>
</div>
  )
}

export default ChatBox
