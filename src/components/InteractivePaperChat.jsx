import React, { useState, useEffect, useRef } from 'react';
import { queryPaperKnowledge, askGeminiAPI } from '../data/paperKnowledgeBase';
import { Send, Volume2, VolumeX } from 'lucide-react';

const QUICK_PROMPTS = [
  { label: "Explain simply", query: "Explain this research simply with an everyday analogy" },
  { label: "Why it matters", query: "Why does this research matter for the world?" },
  { label: "How it works", query: "How does the AI model actually work?" }
];

export function InteractivePaperChat({ project }) {
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Ask me anything about ${project.title} in plain English — how it works, what it discovered, or why it matters.`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);

  const apiKey = (() => {
    try {
      return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    } catch {
      return '';
    }
  })();

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll strictly inside the chat container
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Cancel any speech synthesis if component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Submit question handler
  const handleSend = async (questionText = inputValue) => {
    const q = (questionText || '').trim();
    if (!q || isTyping) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      let answerText = '';

      // Check if user has provided a Gemini API Key
      if (apiKey && apiKey.trim().length > 10) {
        try {
          answerText = await askGeminiAPI({
            apiKey: apiKey.trim(),
            projectId: project.id,
            projectData: project,
            userQuestion: q,
            conversationHistory: messages.slice(-4),
            mode: 'plain'
          });
        } catch (apiErr) {
          answerText = queryPaperKnowledge(project.id, q, 'plain');
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 380));
        answerText = queryPaperKnowledge(project.id, q, 'plain');
      }

      const assistantMsg = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: answerText
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: `Here is a summary of the research:\n\n${project.leftPanel.whyItMatters}`
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Text to speech narration
  const handleToggleSpeech = (msgId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`[\]()$]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="paper-chat-container simple">
      {/* Clean Minimal Header */}
      <div className="simple-chat-header">
        <h4 className="simple-chat-title">Ask the Paper</h4>
        <span className="simple-chat-desc">Plain English Q&A • Grounded in {project.award ? 'published literature' : 'research'}</span>
      </div>

      {/* 3 Simple Prompt Chips */}
      <div className="simple-chips-row">
        {QUICK_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="simple-chip-btn"
            onClick={() => handleSend(item.query)}
            disabled={isTyping}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="paper-chat-messages simple" ref={messagesContainerRef}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div key={msg.id} className={`chat-message-row simple ${isUser ? 'user' : 'assistant'}`}>
              <div className="msg-bubble-wrap">
                <div className={`msg-bubble simple ${isUser ? 'user' : 'assistant'}`}>
                  <div className="msg-content-text">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    ))}
                  </div>

                  {!isUser && (
                    <div className="msg-footer-bar simple">
                      <button
                        type="button"
                        className={`action-icon-btn ${speakingMsgId === msg.id ? 'active' : ''}`}
                        onClick={() => handleToggleSpeech(msg.id, msg.text)}
                        title={speakingMsgId === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {speakingMsgId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-message-row simple assistant">
            <div className="msg-bubble-wrap">
              <div className="msg-bubble simple assistant typing-bubble">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Prompt Input Bar */}
      <div className="paper-chat-input-area simple">
        <form
          className="chat-form simple"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="chat-input-field simple"
            placeholder="Ask a question in plain English..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chat-send-btn simple"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
