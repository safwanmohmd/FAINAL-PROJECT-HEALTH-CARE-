import axios from 'axios'
import React, { useState } from 'react'

const ChatBot = () => {
    const [isOpen , setIsOpen] = useState(false)
    const [message,setMessage] = useState("")
    const [chat,setChat] = useState([])

    const sendMessage = async ()=> {
        const newChat = [...chat, {text:message}]
   try {
    const res = await axios.post("http://localhost:3000/api/chat", {message})
    setChat([...newChat, {sender:"bot", text:res.data.reply}])
console.log(chat);

   } catch (error) {
    setChat([...newChat, {sender:"bot", text:error.message}])
   }
    }

  return (
    <div>
        <input onChange={(e)=> setMessage(e.target.value)} value={message} placeholder='ask anything' type="text" />
        <button onClick={sendMessage}>send</button>
        <div className='bg-green-100 h-[200px] w-[200px]'>
              {chat.map((x,i)=>(
            <div className='bg-blue-300 mt-2' key={i}> {x.text} </div> 
        ))}
        </div>
      
    </div>
  )
}

export default ChatBot