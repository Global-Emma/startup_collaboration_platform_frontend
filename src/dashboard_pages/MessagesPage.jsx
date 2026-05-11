import "../styles/messages.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import socket from "../utils/socket";
import DashboardNav from "../components/DashboardNav";
import { ArrowBigLeft } from "lucide-react";

const MessagesPage = ({ user }) => {
  const location = useLocation();
  const initialConversationId = location.state?.conversationId;

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mobileMode = () => {
      const mediaQuery = window.matchMedia("(max-width: 860px)");

      // Set the initial value
      setMobile(mediaQuery.matches);

      // Create a listener function
      const handler = (e) => setMobile(e.matches);

      // Listen for the change
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    };
    mobileMode()
  }, []);
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
      <section>
        <DashboardNav user={user} />
      </section>

      <div className="messages-page">
        {/* LEFT SIDEBAR */}
        <div
          className={`chat-sidebar ${mobile && selectedConversation ? "hidden" : ""}`}
        >
          <h2>Messages</h2>
          <div className="convo-list">
            {conversations.map((convo) => {
              const otherUser = convo.members.find((m) => m._id !== user._id);
              const isActive = selectedConversation?._id === convo._id;

              return (
                <div
                  key={convo._id}
                  onClick={() => handleSelectConversation(convo)}
                  className={`conversation-card ${isActive ? "active" : ""}`}
                >
                  <div className="convo-header">
                    <img src={otherUser.avatar} alt="avatar" />
                    <h4>{otherUser.username}</h4>
                  </div>
                  <p>{convo.lastMessage}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT MAIN CHAT */}
        <div
          className={`chat-main ${mobile && !selectedConversation ? "hidden" : ""}`}
        >
          {selectedConversation ? (
            <>
              <div className="chat-header">
                {/* Back button only shows on mobile via CSS */}
                <button
                  className="back-btn"
                  onClick={() => handleSelectConversation(null)}
                >
                  <ArrowBigLeft />
                </button>
                <span>
                  {
                    selectedConversation.members.find((m) => m._id !== user._id)
                      ?.username
                  }
                </span>
              </div>

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
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat">
              <h3>Select a conversation to start messaging</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
