import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, X } from 'lucide-react';
import { InteractivePaperChat } from './InteractivePaperChat';

export function StickyPaperChat({
  project,
  initialOpen = false,
  isOpen: controlledOpen,
  onOpenChange,
  hideFloatingTrigger = false
}) {
  const [internalOpen, setInternalOpen] = useState(initialOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (nextVal) => {
    if (isControlled) {
      if (onOpenChange) onOpenChange(nextVal);
    } else {
      setInternalOpen(nextVal);
      if (onOpenChange) onOpenChange(nextVal);
    }
  };

  useEffect(() => {
    if (!isControlled) {
      setInternalOpen(initialOpen);
    }
  }, [initialOpen, isControlled]);

  if (!project) return null;

  return (
    <>
      {/* Sticky Bottom-Right Trigger Button */}
      {!isOpen && !hideFloatingTrigger && (
        <button
          type="button"
          className="sticky-paper-chat-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label="Talk to this Paper"
        >
          <MessageSquareQuote size={15} />
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
              setOpen(false);
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
