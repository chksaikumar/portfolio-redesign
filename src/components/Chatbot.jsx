import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiX, FiSend, FiMail } from "react-icons/fi";
import {
  chatbotSuggestions,
  chatbotKB,
  chatbotFallback,
  profile,
} from "../data/portfolio.js";

const GREETING =
  "Hi, I am Sai's assistant. Ask me about his experience, AI skills, projects, or how to reach him.";

function findAnswer(question) {
  const q = question.toLowerCase();
  const hit = chatbotKB.find((entry) =>
    entry.keys.some((key) => q.includes(key.toLowerCase()))
  );
  return hit ? hit.answer : null;
}

function mailtoFor(question) {
  const subject = encodeURIComponent("Question from your portfolio chatbot");
  const body = encodeURIComponent(`Hi Sai,\n\n${question}\n\nThanks!`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

function TypingIndicator() {
  return (
    <div
      aria-label="Sai's assistant is typing"
      className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/5 px-4 py-3 light:border-ink/10 light:bg-ink/5"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muteddark light:bg-mutedlight"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const handleToggle = () => {
    if (!open && !greeted) {
      setGreeted(true);
      setMessages([{ id: Date.now(), from: "bot", text: GREETING }]);
    }
    setOpen((prev) => !prev);
  };

  const sendMessage = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      const answer = findAnswer(text);
      const botMessage = answer
        ? { id: Date.now() + 1, from: "bot", text: answer }
        : {
            id: Date.now() + 1,
            from: "bot",
            text: chatbotFallback,
            mailto: mailtoFor(text),
          };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Close chat" : "Open chat with Sai's assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-night shadow-glow transition hover:bg-accentdeep hover:text-fog"
      >
        {open ? (
          <FiX aria-hidden="true" size={22} />
        ) : (
          <FiMessageSquare aria-hidden="true" size={22} />
        )}
        {!greeted && !open && (
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-night bg-red-500" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Sai"
          className="chat-in fixed bottom-24 right-6 z-50 flex max-h-[480px] w-[340px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-card light:border-ink/10 light:bg-paper"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 light:border-ink/10">
            <p className="text-sm font-semibold text-fog light:text-ink">Ask about Sai</p>
            <button
              type="button"
              onClick={handleToggle}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-muteddark transition hover:bg-white/5 hover:text-fog light:text-mutedlight light:hover:bg-ink/5 light:hover:text-ink"
            >
              <FiX aria-hidden="true" size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="min-h-[220px] flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) =>
              msg.from === "user" ? (
                <div key={msg.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-accent px-4 py-2.5 text-sm text-night">
                    {msg.text}
                  </p>
                </div>
              ) : (
                <div key={msg.id} className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-fog light:border-ink/10 light:bg-ink/5 light:text-ink">
                    <p>{msg.text}</p>
                    {msg.mailto && (
                      <a
                        href={msg.mailto}
                        className="mt-2 inline-flex items-center gap-1.5 font-medium text-accent underline underline-offset-4"
                      >
                        <FiMail aria-hidden="true" size={14} />
                        Draft email to Sai
                      </a>
                    )}
                  </div>
                </div>
              )
            )}
            {typing && <TypingIndicator />}
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {chatbotSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="rounded-full border border-accent/30 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/10"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 light:border-ink/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask a question"
                className="w-full rounded-xl border border-white/10 bg-night/40 px-4 py-2.5 text-sm text-fog outline-none transition focus:border-accent/60 light:border-ink/10 light:bg-white light:text-ink"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-night transition hover:bg-accentdeep hover:text-fog disabled:opacity-40"
              >
                <FiSend aria-hidden="true" size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
