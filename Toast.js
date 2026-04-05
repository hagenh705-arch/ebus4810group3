.sidebar {
  width: 62px;
  background: #0d1b4b;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 6px;
  flex-shrink: 0;
}

.sidebar-btn {
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #e9e9e9;
  opacity: 0.55;
  transition: opacity 0.2s, background 0.2s;
  padding: 0;
}

.sidebar-btn svg {
  width: 22px;
  height: 22px;
}

.sidebar-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-btn.active {
  opacity: 1;
  background: rgba(128, 177, 213, 0.35);
}

.help-btn {
  margin-top: auto;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Segoe UI', sans-serif;
}
