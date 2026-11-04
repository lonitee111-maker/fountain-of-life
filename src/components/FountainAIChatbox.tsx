import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  ChevronDown, 
  Heart,
  Clock,
  MapPin,
  BookOpen
} from 'lucide-react';
import { ChurchLogo } from './ChurchLogo';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'What time are Sunday services?',
  'Who are the Senior Pastors?',
  'Where is the church located?',
  'How do I give tithes and offerings?',
  'Can you pray for my family?',
  'Tell me about children’s ministry'
];

export const FountainAIChatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Grace and peace to you! I am **Fountain AI**, your spiritual and information guide for Fountain of Life Church. How can I assist you, answer questions about our church, or pray with you today?',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Listen for external trigger from Digital Bible or sermons
  useEffect(() => {
    const handleCustomAsk = (e: any) => {
      const prompt = e.detail?.prompt;
      if (prompt) {
        setIsOpen(true);
        handleSendMessage(prompt);
      }
    };

    window.addEventListener('folc:ask-ai', handleCustomAsk);
    return () => window.removeEventListener('folc:ask-ai', handleCustomAsk);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || 'God bless you! Living waters are flowing for you today.';

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Failed to get AI response:', err);
      // Fallback message
      const fallbackAiMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `Peace be with you! Fountain of Life Church gathers every Sunday at **8:00 AM** and **10:15 AM** at 124 Living Waters Way, Victory City. You can reach our pastoral office at **08127933781** or email **fountainoflife@gmail.com**. "With joy you will draw water from the wells of salvation." (Isaiah 12:3)`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: 'Grace and peace to you! I am **Fountain AI**, your spiritual and information guide for Fountain of Life Church. How can I assist you, answer questions about our church, or pray with you today?',
        timestamp: 'Just now'
      }
    ]);
  };

  const renderFormattedContent = (content: string) => {
    // Basic Markdown format helper: bolding, paragraphs, bullet points
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          if (line.startsWith('• ') || line.startsWith('- ')) {
            const rawText = line.substring(2);
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{renderInlineStyles(rawText)}</span>
              </div>
            );
          }

          // Numbered lists
          if (/^\d+\.\s/.test(line)) {
            const match = line.match(/^(\d+\.)\s(.*)/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-1.5 pl-1">
                  <span className="text-amber-500 font-bold shrink-0">{match[1]}</span>
                  <span>{renderInlineStyles(match[2])}</span>
                </div>
              );
            }
          }

          return <p key={idx}>{renderInlineStyles(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-amber-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-full shadow-2xl border-2 border-amber-400/60 transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-amber-400/40"
          aria-label="Open Fountain AI church assistant chat"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold tracking-wide">
              Ask Fountain AI
            </span>
            <span className="block text-[10px] text-amber-300/90 leading-tight">
              Church Guide & Prayer
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          className="w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-slate-800"
          role="dialog"
          aria-modal="true"
          aria-label="Fountain AI Church Assistant"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-3.5 flex items-center justify-between border-b border-amber-500/30 shrink-0">
            <div className="flex items-center gap-2.5">
              <ChurchLogo size="sm" variant="mark-only" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-prose font-bold text-sm text-white">
                    Fountain AI
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-400/30">
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Church Spiritual & Information Guide
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 min-h-0 p-3.5 overflow-y-auto space-y-3 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-blue-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    renderFormattedContent(msg.content)
                  ) : (
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                  )}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500 py-1 pl-1">
                <div className="w-7 h-7 rounded-full bg-blue-900 text-amber-400 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 bg-white rounded-2xl border border-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-900 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-slate-400 ml-1">Fountain AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompt Chips */}
          <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none text-[11px] shrink-0">
            {STARTER_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap shrink-0 transition-colors disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about our church or request prayer..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:outline-none disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Send question to Fountain AI"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
