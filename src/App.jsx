import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function ChatUI() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, time: new Date() };
    setMessages([...messages, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Here’s a helpful response!", time: new Date() },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <ul className="background-bubbles">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      {/* Chat Card */}
      <div className="chat-card">
        <header className="chat-header">
          <h2>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" 
              alt="AI Icon" 
              className="header-icon" 
            />
            AI Support
          </h2>
          <div className="controls">
            {/* Toggle Switch */}
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </header>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-row ${msg.sender === "user" ? "user" : "ai"}`}
            >
              {msg.sender === "ai" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                  alt="AI"
                  className="avatar"
                />
              )}
              <div className="message">
                <p>{msg.text}</p>
                <span className="time">
                  {msg.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {msg.sender === "user" && (
                <img
                  src="https://i.pravatar.cc/40?img=32"
                  alt="User"
                  className="avatar"
                />
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message-row ai">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                alt="AI"
                className="avatar"
              />
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <footer className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </footer>
      </div>
    </div>
  );
}

export default ChatUI;
