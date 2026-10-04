import { useEffect, useRef, useState } from "react";
import { chatbotSuggestions, chatbotKB, chatbotFallback, profile } from "../data/portfolio.js";

const GREETING =
  "Hi, I can answer from Sai's full profile, including his experience, AI work, skills, projects, certifications, education, and contact details. What would you like to know?";

const SUGGESTIONS = [
  { label: "Experience", question: "Tell me about Sai's experience" },
  { label: "AI work", question: "What AI work has Sai done?" },
  { label: "Core skills", question: "What are Sai's strongest skills?" },
  { label: "Certifications", question: "What certifications does Sai have?" },
  { label: "Projects", question: "What projects has Sai built?" },
  { label: "Education", question: "What is Sai's education?" },
];

function findAnswer(question) {
  const q = question.toLowerCase().replace(/[’]/g, "'");
  const hit = chatbotKB.find((entry) => entry.keys.some((key) => q.includes(key.toLowerCase())));
  return hit ? hit.answer : null;
}

function mailtoFor(question) {
  const subject = encodeURIComponent("Portfolio question for Sai");
  const body = encodeURIComponent(`Hi Sai, I visited your portfolio and had this question:\n\n${question}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const panelRef = useRef(null);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);
  const typingRef = useRef(false);

  // positionChatUi: keep the launcher/panel clear of the visual viewport edge.
  useEffect(() => {
    const launcher = launcherRef.current;
    const panel = panelRef.current;
    if (!launcher || !panel) return;
    function positionChatUi() {
      const visualWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
      const inset = Math.max(16, window.innerWidth - visualWidth + 16);
      launcher.style.right = inset + "px";
      panel.style.right =
        (window.innerWidth <= 520 ? Math.max(8, window.innerWidth - visualWidth + 8) : inset) + "px";
    }
    positionChatUi();
    window.addEventListener("resize", positionChatUi);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", positionChatUi);
    return () => {
      window.removeEventListener("resize", positionChatUi);
      if (window.visualViewport) window.visualViewport.removeEventListener("resize", positionChatUi);
    };
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open ]);

  const sendMessage = (raw) => {
    const text = raw.trim().slice(0, 180);
    if (!text || typingRef.current) return;
    typingRef.current = true;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const answer = findAnswer(text);
      const botMessage = answer
        ? { id: Date.now() + 1, from: "assistant", text: answer }
        : { id: Date.now() + 1, from: "assistant", text: chatbotFallback, question: text };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
      typingRef.current = false;
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button
        className="chat-launcher"
        type="button"
        ref={launcherRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close profile assistant" : "Open profile assistant"}
        aria-controls="profile-chat"
        aria-expanded={String(open)}
      >
        <svg className="chat-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 18.5 3.5 21v-5.3A8 8 0 0 1 4 5.4C7.9 1.7 15.4 2.3 18.5 6c3.5 4.2.9 10.7-4.5 12-2.5.6-4.8.3-7-.5Z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
        <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>

      <aside
        className={"chat-panel" + (open ? " open" : "")}
        id="profile-chat"
        role="dialog"
        aria-label="Ask about Saikumar's experience"
        aria-hidden={String(!open)}
        ref={panelRef}
      >
        <div className="chat-head">
          <div className="chat-avatar" aria-hidden="true">
            SAI
          </div>
          <div className="chat-head-copy">
            <strong>Ask about Sai</strong>
            <span className="chat-mode">
              <i></i> Profile assistant
            </span>
          </div>
          <span className="chat-demo">PROFILE DATA</span>
        </div>
        <div className="chat-log" aria-live="polite" aria-relevant="additions" ref={logRef}>
          <div className="chat-row assistant">
            <div className="chat-bubble">
              <p>{GREETING}</p>
              <span className="chat-time">PROFILE GUIDE</span>
            </div>
          </div>
          {messages.map((msg) => (
            <div className={"chat-row " + msg.from} key={msg.id}>
              <div className="chat-bubble">
                <p>{msg.text}</p>
                {msg.question && (
                  <a href={mailtoFor(msg.question)}>Email this question to Sai ↗</a>
                )}
                <span className="chat-time">{msg.from === "user" ? "YOU" : "PROFILE GUIDE"}</span>
              </div>
            </div>
          ))}
          {typing && (
            <div className="chat-row assistant">
              <div className="chat-bubble">
                <div className="chat-typing" aria-label="Assistant is typing">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
            </div>
          )}
          <div className="chat-suggestions" aria-label="Suggested questions">
            {SUGGESTIONS.map((s) => (
              <button key={s.label} type="button" onClick={() => sendMessage(s.question)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="chat-compose">
          <form className="chat-form" onSubmit={handleSubmit}>
            <label
              htmlFor="chat-question"
              className="chat-sr-only"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              Ask about Sai&rsquo;s profile
            </label>
            <input
              className="chat-input"
              id="chat-question"
              type="text"
              autoComplete="off"
              maxLength="180"
              placeholder="Ask about experience, AI, skills…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            <button className="chat-send" type="submit" aria-label="Send question">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" />
                <path d="m11.5 13.5 3-3" />
              </svg>
            </button>
          </form>
          <p className="chat-note">Answers are limited to the profile data provided by Sai.</p>
        </div>
      </aside>
    </>
  );
}
