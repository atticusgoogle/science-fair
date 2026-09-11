import React, { useState, useEffect, useRef } from 'react';
import { PAPER_KNOWLEDGE_BASE, queryPaperKnowledge, askGeminiAPI } from '../data/paperKnowledgeBase';
import { Send, Sparkles, Volume2, VolumeX, Copy, Check, Key, X, Lightbulb, Bot, User, RefreshCw } from 'lucide-react';

export function InteractivePaperChat({ project, embedded = false, onClose, onSwitchToFindings }) {
  const kb = PAPER_KNOWLEDGE_BASE[project.id] || {
    researchers: project.researcher.name,
    paperTitle: project.title,
    suggestedQuestions: [
      "Explain this research like I'm 12 years old",
      "Why does this discovery matter for the world?",
      "How does the AI model work?",
      "What was the hardest problem the team had to solve?"
    ]
  };

  const [mode, setMode] = useState('plain'); // 'plain' (Intuitive) | 'technical' (Deep Dive)
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I'm your interactive research companion for **${project.title}**.\n\nI'm grounded directly in our peer-reviewed findings published by ${project.researcher.name}. Ask me anything about how the model works, what the findings mean in plain English, or click any question below to get started!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    } catch {
      return '';
    }
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');

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
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
            mode
          });
        } catch (apiErr) {
          console.warn('Gemini API call failed, falling back to local paper knowledge base:', apiErr);
          // Fallback seamlessly to the grounded scientific knowledge base
          answerText = queryPaperKnowledge(project.id, q, mode);
        }
      } else {
        // Built-in grounded scientific engine
        // Add a realistic thought delay (350-600ms) for natural conversational feel
        await new Promise((resolve) => setTimeout(resolve, 450));
        answerText = queryPaperKnowledge(project.id, q, mode);
      }

      const assistantMsg = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: `I had trouble synthesizing an answer. Here is a summary of the research:\n\n${project.leftPanel.whyItMatters}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    // Clean markdown stars/formatting for speech
    const cleanText = text.replace(/[*_#`[\]()$]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Copy text to clipboard
  const handleCopy = (msgId, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Save Gemini Key
  const handleSaveKey = () => {
    try {
      localStorage.setItem('gemini_api_key', tempKey.trim());
      setApiKey(tempKey.trim());
      setShowKeyModal(false);
    } catch {
      // fallback
    }
  };

  return (
    <div className={`paper-chat-container ${embedded ? 'embedded' : ''}`}>
      {/* Top Header */}
      <div className="paper-chat-header">
        <div className="chat-header-info">
          <div className="chat-researcher-avatar">
            <span>{project.researcher.name.split(' ').filter(w => !w.startsWith('Dr.') && !w.startsWith('&')).slice(0, 2).map(w => w[0]).join('')}</span>
          </div>
          <div className="chat-title-block">
            <h3 className="chat-headline">Talk to this Paper</h3>
            <p className="chat-subheadline">
              {project.researcher.name} • {project.award || project.category}
            </p>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            className="chat-key-btn"
            onClick={() => { setTempKey(apiKey); setShowKeyModal(true); }}
            title={apiKey ? 'Gemini API Key Connected' : 'Configure custom Gemini API Key'}
          >
            <Key size={13} />
            <span>{apiKey ? 'API Active' : 'API Key'}</span>
          </button>

          {onClose && (
            <button className="chat-close-btn" onClick={onClose} aria-label="Close Chat">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Mode & Grounding Sub-Bar */}
      <div className="chat-sub-toolbar">
        <span className="live-status-pill">
          <span className="live-dot" /> Grounded in Published Paper
        </span>

        <div className="chat-mode-toggle" title="Toggle explanation style">
          <button
            className={`mode-btn ${mode === 'plain' ? 'active' : ''}`}
            onClick={() => setMode('plain')}
          >
            Plain English
          </button>
          <button
            className={`mode-btn ${mode === 'technical' ? 'active' : ''}`}
            onClick={() => setMode('technical')}
          >
            Deep Dive
          </button>
        </div>
      </div>

      {/* Suggested Questions Pill Rail */}
      <div className="chat-suggestions-rail">
        <div className="suggestions-label">
          <Lightbulb size={12} />
          <span>Suggested Inquiries:</span>
        </div>
        <div className="suggestions-scroll">
          {kb.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              className="suggestion-chip-btn"
              onClick={() => handleSend(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="paper-chat-messages" ref={messagesContainerRef}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div key={msg.id} className={`chat-message-row ${isUser ? 'user' : 'assistant'}`}>
              {!isUser && (
                <div className="msg-avatar">
                  <Bot size={14} />
                </div>
              )}

              <div className="msg-bubble-wrap">
                <div className={`msg-bubble ${isUser ? 'user' : 'assistant'}`}>
                  {/* Formatted body paragraphs */}
                  <div className="msg-content-text">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => {
                      // Simple render for bold **words** and bullet lists
                      if (paragraph.startsWith('- ') || paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={pIdx} className="msg-bullet-list">
                            {lines.map((line, lIdx) => (
                              <li key={lIdx} dangerouslySetInnerHTML={{
                                __html: line.replace(/^[-*•\d.]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              }} />
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p
                          key={pIdx}
                          dangerouslySetInnerHTML={{
                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Message Meta: Time & Actions */}
                  <div className="msg-footer-bar">
                    <span className="msg-time">{msg.timestamp}</span>
                    {!isUser && (
                      <div className="msg-actions">
                        <button
                          className={`action-icon-btn ${speakingMsgId === msg.id ? 'active' : ''}`}
                          onClick={() => handleToggleSpeech(msg.id, msg.text)}
                          title={speakingMsgId === msg.id ? 'Stop reading' : 'Read aloud with audio speech'}
                        >
                          {speakingMsgId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        </button>
                        <button
                          className="action-icon-btn"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                        >
                          {copiedMsgId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isUser && (
                <div className="msg-avatar user">
                  <User size={14} />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-message-row assistant">
            <div className="msg-avatar">
              <Bot size={14} />
            </div>
            <div className="msg-bubble-wrap">
              <div className="msg-bubble assistant typing-bubble">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
                <span className="typing-text">Synthesizing paper findings...</span>
              </div>
            </div>
          </div>
        )}

        </div>

      {/* Input Box */}
      <div className="paper-chat-input-area">
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="chat-input-field"
            placeholder={
              mode === 'plain'
                ? `Ask about this research (e.g., "Explain the key breakthrough simply")...`
                : `Ask a technical question (e.g., "What was the loss function & benchmark?")...`
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </form>
        <div className="chat-footer-note">
          <span>
            {apiKey
              ? '✦ Gemini 1.5 Flash Active'
              : '✦ Grounded in Nature & Science publications • Instant offline synthesis'}
          </span>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="key-modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="key-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="key-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} />
                <h4>Custom Gemini API Key</h4>
              </div>
              <button className="chat-close-btn" onClick={() => setShowKeyModal(false)}>
                <X size={15} />
              </button>
            </div>
            <p className="key-modal-desc">
              By default, the science fair trifold uses a built-in comprehensive scientific knowledge base. If you wish to connect directly to Google's live <strong>Gemini 1.5 Flash</strong> model for open-ended conversation, paste your Gemini API key below:
            </p>
            <input
              type="password"
              className="key-modal-input"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
            />
            <div className="key-modal-actions">
              <button
                className="chip-btn"
                onClick={() => {
                  setTempKey('');
                  setApiKey('');
                  localStorage.removeItem('gemini_api_key');
                  setShowKeyModal(false);
                }}
              >
                Clear Key (Use Built-in Engine)
              </button>
              <button className="action-pill-btn webar" onClick={handleSaveKey}>
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
