import React from 'react'
import Message from './Message'

const MessageList = ({messages}) => {
	console.log("I am here")
	console.log(messages);

  return (
    <div className={"chatApp__convTimeline"}>
			{messages.slice(0).reverse().map(
				messageItem => (
					<Message
						key={messageItem.id}
						message={messageItem}
					/>
				)
			)}
			</div>
  )
}

export default MessageList
