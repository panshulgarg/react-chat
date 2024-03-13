import React from 'react'

const Message = ({message}) => {
    let messagePosition = (( message.owner == 'user' ) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left');
    return (
        <div className={"chatApp__convMessageItem " + messagePosition + " clearfix"}>
            <div className="chatApp__convMessageValue" dangerouslySetInnerHTML={{__html: message.text}}></div>
        </div>
    );
}

export default Message
