.chat-wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  max-height: 720px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.1);
  overflow: hidden;
}

.chat-header {
  background: #0d1b4b;
  color: #fff;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #80b1d5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #0d1b4b;
  flex-shrink: 0;
}

.chat-title    { font-weight: 600; font-size: 15px; }
.chat-subtitle { font-size: 11px; opacity: 0.65; }

.chat-history-bar {
  background: #1a2d6e;
  padding: 7px 14px;
  display: flex;
  gap: 7px;
  overflow-x: auto;
  flex-shrink: 0;
}
.chat-history-bar::-webkit-scrollbar { height: 3px; }
.chat-history-bar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }

.hist-btn {
  background: rgba(128,177,213,0.25);
  border: none;
  color: #b8d4e8;
  border-radius: 18px;
  padding: 4px 13px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 0.15s;
}
.hist-btn:hover { background: rgba(128,177,213,0.45); }

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f7f9fc;
}

.msg {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  max-width: 80%;
}
.msg.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}
.msg.assistant { align-self: flex-start; }

.msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}
.msg.assistant .msg-avatar { background: #80b1d5; color: #0d1b4b; }
.msg.user      .msg-avatar { background: #0d1b4b; color: #fff; border: 2px solid #80b1d5; }

.msg-bubble {
  padding: 11px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}
.msg.assistant .msg-bubble {
  background: #fff;
  color: #0e084c;
  border: 1.5px solid #e0e7ef;
  border-bottom-left-radius: 4px;
}
.msg.user .msg-bubble {
  background: #0d1b4b;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.typing-bubble {
  display: flex;
  gap: 4px;
  align-items: center;
  min-height: 20px;
}
.typing-bubble span {
  width: 7px; height: 7px;
  background: #80b1d5;
  border-radius: 50%;
  animation: bop 1.2s infinite;
  display: block;
}
.typing-bubble span:nth-child(2) { animation-delay: 0.2s; }
.typing-bubble span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bop { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }

.chat-input-row {
  padding: 13px 16px;
  background: #fff;
  border-top: 1.5px solid #e8ecf4;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  border: 1.5px solid #dde3ed;
  border-radius: 22px;
  padding: 10px 17px;
  font-size: 14px;
  outline: none;
  color: #0e084c;
  font-family: inherit;
}
.chat-input:focus { border-color: #80b1d5; }
.chat-input:disabled { background: #f5f5f5; }

.send-btn {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: #0d1b4b;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}
.send-btn:hover:not(:disabled) { background: #1a2d6e; }
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
