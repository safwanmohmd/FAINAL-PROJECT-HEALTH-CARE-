import axios from 'axios'
import React, { useState } from 'react'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])

    const toggleChat = () => setIsOpen(!isOpen)

    const sendMessage = async () => {
        if (!message.trim()) return

        const newChat = [...chat, { sender: "user", text: message }]
        setChat(newChat)
        setMessage("")

        try {
            const res = await axios.post("http://localhost:3000/api/chat", { message })
            setChat([...newChat, { sender: "bot", text: res.data.reply }])
        } catch (error) {
            setChat([...newChat, { sender: "bot", text: "Error: " + error.message }])
        }
    }

    return (
        <div>
            {/* Floating Bot Icon */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={toggleChat}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:outline-none"
                >
                    <i className="bi bi-robot text-xl"></i>
                </button>
            </div>


            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-lg z-50 flex flex-col overflow-hidden border border-gray-300">
                  
                    <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                        <span className="font-semibold">ChatBot</span>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <i className="bi bi-x-lg text-lg"></i>
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 h-64 overflow-y-auto bg-gray-100 space-y-2">
                        {chat.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md max-w-[75%] ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end ml-auto text-right'
                                        : 'bg-gray-300 text-black self-start mr-auto text-left'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

      
                    <div className="flex border-t border-gray-200">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-4 hover:bg-blue-700 text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatBot
