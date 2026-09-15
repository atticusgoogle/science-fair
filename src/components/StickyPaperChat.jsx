import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, X } from 'lucide-react';
import { InteractivePaperChat } from './InteractivePaperChat';

export function StickyPaperChat({ project, initialOpen = false }) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  if (!project) return null;

  return (
    <>
      {/* Sticky Side Button on the Right Edge of the Page */}
      {!isOpen && (
        <button
          type="button"
          className="sticky-paper-chat-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          aria-label="Talk to this Paper"
        >
          <MessageSquareQuote size={16} />
          <span>Talk to this Paper</span>
        </button>
      )}

      {/* Slide-Over Chatbox Drawer on the Right Side */}
      <aside
        className={`sticky-paper-chat-drawer ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky-chat-drawer-header">
          <div className="sticky-chat-header-title">
            <MessageSquareQuote size={16} />
            <span>Talk to this Paper</span>
          </div>
          <button
            type="button"
            className="sticky-chat-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sticky-chat-drawer-body">
          <InteractivePaperChat project={project} />
        </div>
      </aside>
    </>
  );
}
