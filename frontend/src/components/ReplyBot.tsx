// src/components/ReplyBot.tsx

import React, { useEffect, useState, useRef } from "react";
import "./ReplyBot.css";
import { FaComments } from "react-icons/fa"; 

interface ReplyRule {
  keys: string[];
  reply: string;
}

// Training data rules (simulated vector index)
const vectorIndex: ReplyRule[] = [
  {
    keys: ["interested", "position", "meeting booking link", "job position"],
    reply: `I’m glad to hear you're interested! You can book a meeting with me using this link: https://cal.com/example`,
  },
  {
    keys: ["shortlisted", "interview", "technical interview"],
    reply: `Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example`,
  },
];

// Friendly fallback replies
const friendlyReplies: ReplyRule[] = [
  { keys: ["hello", "hi", "hey"], reply: "Hi there! How can I assist you today?" },
  { keys: ["how are you"], reply: "I'm just a bot, but I'm doing great — how about you?" },
  { keys: ["thank", "thanks"], reply: "You're welcome! Happy to help 😊" },
];

const ReplyBot: React.FC = () => {
  const initialBotMessage = { from: "bot", text: "🤖 ChatBot here — ask me anything." };
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([initialBotMessage]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = userInput.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: "user", text }]);
    setUserInput("");

    const lc = text.toLowerCase();

    // If the user explicitly says "clear chat", reset conversation
    if (lc === "clear chat") {
      setMessages([initialBotMessage]);
      return;
    }

    // Otherwise find a matching reply rule
    const matched =
      vectorIndex.find(rule => rule.keys.some(key => lc.includes(key))) ||
      friendlyReplies.find(rule => rule.keys.some(key => lc.includes(key)));

    const reply = matched ? matched.reply : "Sorry, I didn't quite understand that.";

    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
    }, 300);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="replybot-wrapper">
      {!isOpen ? (
  <div className="chat-icon" onClick={() => setIsOpen(true)} title="Open Chat">
    <FaComments size={28} color="white" />

  </div>
) : (

        <div className="replybot-container">
          <div className="replybot-header d-flex justify-content-between align-items-center">
            <h5 className="m-0">🤖 AI Assistant support</h5>
            <div>
              <button
                className="header-btn"
                onClick={() => setIsMinimized(prev => !prev)}
                title="Minimize"
              >
                &ndash;
              </button>
              <button
                className="header-btn"
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                title="Close"
              >
                &times;
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="replybot-body">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message-bubble ${msg.from}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="replybot-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReplyBot;
