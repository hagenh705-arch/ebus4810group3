import { useState, useEffect, useRef, useContext } from 'react';
import { ToastContext } from '../App';
import './Chatbot.css';

const SYSTEM_CONTEXT = `User: John Doe, owner of Doe Logistics LLC (Transportation & Logistics).
Active projections in the system: Profitability of New Truck, Ad Campaign Returns, Supply Costs 2026.`;

const STARTER_MSGS = {
  'Discounting Explanation': "Picking up our discounting discussion for Doe Logistics.\n\nKey rules for trucking discounts:\n• Never go below fully-loaded cost/mile ($2.50–$4.00 typical)\n• Volume discounts: lower rate for clients shipping 20+ loads/month\n• Lane discounts: cheaper on routes you already run\n• Early pay: 2% off if invoice paid within 10 days\n\nWhat scenario are you considering?",
  'Price-per-Lead Chat': "Back to price-per-lead analysis.\n\nBenchmarks for logistics:\n• Referrals: $0–$25/lead\n• Google Ads: $60–$150/lead\n• LinkedIn B2B: $80–$200/lead\n• Trade shows: $200–$500/lead\n\nTarget: CPL under 15% of your average contract value.\n\nWhat's your current lead gen setup?",
  'Alternative Supply Options': "Resuming your supply cost analysis. Your projection shows $7,000/mo.\n\nTop options:\n• Fuel hedging: lock diesel prices (saves 5–15%)\n• Group purchasing co-ops: bulk pricing on parts/tires\n• Predictive maintenance: cuts costs 15–25%\n• Route optimization: reduces fuel 8–12%\n\n10% reduction = $8,400/year saved. Want to model a scenario?",
};

function Message({ role, text }) {
  return (
    <div className={`msg ${role}`}>
      <div className="msg-avatar">{role === 'user' ? 'JD' : 'AI'}</div>
      <div className="msg-bubble">{text}</div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="msg assistant">
      <div className="msg-avatar">AI</div>
      <div className="msg-bubble typing-bubble">
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Chatbot({ initTitle }) {
  const toast = useContext(ToastContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState('');
  const bottomRef = useRef(null);
  const abortRef = useRef(null);

  const initChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi John! I'm your Rune Business Advisor, powered by Claude.\n\nI can help with financial projections, pricing strategy, cost analysis, trucking operations, and any business questions.\n\nWhat would you like to work on today?"
    }]);
  };

  useEffect(() => {
    if (initTitle && STARTER_MSGS[initTitle]) {
      setMessages([{ role: 'assistant', content: STARTER_MSGS[initTitle] }]);
    } else {
      initChat();
    }
  }, [initTitle]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setStreaming(true);
    setStreamText('');

    // Build API messages (convert role names)
    const apiMessages = newMessages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }));

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ messages: apiMessages, systemContext: SYSTEM_CONTEXT }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Server error');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setStreamText(fullText);
              }
              if (parsed.error) throw new Error(parsed.error);
            } catch (e) {
              if (e.message !== 'Unexpected end of JSON input') throw e;
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${err.message}\n\nMake sure your ANTHROPIC_API_KEY is set in the .env file and the server is running.`
        }]);
      }
    } finally {
      setStreaming(false);
      setStreamText('');
    }
  };

  const loadHistory = (title) => {
    const msg = STARTER_MSGS[title];
    if (msg) setMessages([{ role: 'assistant', content: msg }]);
  };

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <div className="chat-avatar">AI</div>
        <div>
          <div className="chat-title">Rune Business Advisor</div>
          <div className="chat-subtitle">Powered by Claude · Your financial AI</div>
        </div>
      </div>

      <div className="chat-history-bar">
        {Object.keys(STARTER_MSGS).map(title => (
          <button key={title} className="hist-btn" onClick={() => loadHistory(title)}>{title}</button>
        ))}
        <button className="hist-btn" onClick={initChat}>+ New Chat</button>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <Message key={i} role={m.role === 'user' ? 'user' : 'assistant'} text={m.content} />
        ))}
        {streaming && streamText ? (
          <Message role="assistant" text={streamText} />
        ) : streaming ? (
          <TypingIndicator />
        ) : null}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
          placeholder="Ask about your business, finances, projections..."
          disabled={streaming}
        />
        <button className="send-btn" onClick={sendMessage} disabled={streaming || !input.trim()}>
          <svg viewBox="0 0 24 24" fill="#fff" width="15" height="15">
            <path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
