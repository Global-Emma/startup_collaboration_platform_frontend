import "../styles/messages.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import socket from "../utils/socket";
import DashboardNav from "../components/DashboardNav";

const MessagesPage = ({ user }) => {
  const location = useLocation();
  const initialConversationId = location.state?.conversationId;

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  /*
  LOAD MESSAGES
  */
  const loadMessages = async (conversationId) => {
    const res = await api.get(`/api/chat/messages/${conversationId}`);

    setMessages(res.data.data);
  };

  /*
  GET CONVERSATIONS
  */
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await api.get("/api/chat");

      const conversationList = res.data.data;
      setConversations(conversationList);

      if (initialConversationId) {
        const conversation = conversationList.find(
          (item) => item._id === initialConversationId,
        );

        if (conversation) {
          setSelectedConversation(conversation);
          loadMessages(conversation._id);
        }
      }
    };

    fetchConversations();
  }, [initialConversationId]);

  /*
  SELECT CHAT
  */
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);

    loadMessages(conversation._id);
  };

  /*
  SOCKET LISTENER
  */
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("newMessage");
  }, []);

  /*
  SEND MESSAGE
  */
  const handleSend = () => {
    if (!text.trim()) return;

    const receiver = selectedConversation.members.find(
      (m) => m._id !== user._id,
    );

    socket.emit("sendMessage", {
      conversationId: selectedConversation._id,

      receiverId: receiver._id,

      text,
    });

    setText("");
  };

  
  if (!user) {
    return <p>Please login to view messages.</p>;
  }


  return (
    <div className="messages-page-box">
      <DashboardNav user={user} />
      <div className="messages-page">
        {/* LEFT */}
        <div className="chat-sidebar">
          <h2>Messages</h2>

          {conversations.map((convo) => {
            const otherUser = convo.members.find((m) => m._id !== user._id);

            return (
              <div
                key={convo._id}
                onClick={() => handleSelectConversation(convo)}
                className="conversation-card"
              >
                <img src={otherUser.avatar} alt="" />

                <div>
                  <h4>{otherUser.username}</h4>

                  <p>{convo.lastMessage}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="chat-main">
          {selectedConversation ? (
            <>
              <div className="chat-header">Chat</div>

              <div className="chat-body">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={
                      msg.sender._id === user._id
                        ? "my-message"
                        : "their-message"
                    }
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type message..."
                />

                <button onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat">Select conversation</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
