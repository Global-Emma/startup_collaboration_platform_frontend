import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

const dummyChats = [
  {
    id: 1,
    user: {
      name: "John Dev",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    lastMessage: "Hey, are you available?",
  },
  {
    id: 2,
    user: {
      name: "Startup Founder",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    lastMessage: "Let’s discuss the project.",
  },
];

const MessagesPage = () => {
  const [chats, /*setChats*/] = useState(dummyChats);
  const [activeChat, setActiveChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef();

  // SOCKET SETUP (connect later)
  // const socket = io("http://localhost:5000");

  useEffect(() => {
    // scroll to bottom
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // socket.emit("sendMessage", newMessage);

    setInput("");
  };

  return (
    <div className="messages-page">

      {/* LEFT - CHAT LIST */}
      <div className="chat-list">

        <h2>Messages</h2>

        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
            onClick={() => setActiveChat(chat)}
          >
            <img src={chat.user.avatar} alt="" />

            <div>
              <p>{chat.user.name}</p>
              <span>{chat.lastMessage}</span>
            </div>
          </div>
        ))}

      </div>

      {/* RIGHT - CHAT AREA */}
      <div className="chat-area">

        {/* HEADER */}
        <div className="chat-header">
          <img src={activeChat?.user.avatar} alt="" />
          <h3>{activeChat?.user.name}</h3>
        </div>

        {/* MESSAGES */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === "me" ? "me" : ""}`}
            >
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>

      </div>

    </div>
  );
};

export default MessagesPage;