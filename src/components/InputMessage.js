import React from 'react'
import { useState } from 'react'


const InputMessage = ({handleSendMessage}) => {
    const [text, setText] = useState('')
    //var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';

    const handleSummit = (e)=>{
        e.preventDefault(); 
        const returnValue = handleSendMessage(text);
        console.log("return value = " + returnValue);
        setText('');
        if(returnValue){
           
        }
    }

    let sendButtonIcon = <i className={"material-icons"}>send</i>;
    return (
        <form onSubmit={handleSummit}>
            <input
                type="text"
                className={"chatApp__convInput"} value={text}
                placeholder="Text message" onSubmit={handleSummit} onChange={(e)=> setText(e.target.value)}
                            />
            <div className={'chatApp__convButton'} onClick={handleSummit}>
            {sendButtonIcon}
            </div>
        </form>
    );
}

export default InputMessage
