import { useState, useEffect } from 'react';

export default function Modal({ title, description, placeholder, onConfirm, onClose }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const confirm = () => {
    if (!value.trim()) return;
    onConfirm(value.trim());
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="field">
          <input
            autoFocus
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            onKeyDown={e => e.key === 'Enter' && confirm()}
          />
        </div>
        <div className="modal-btns">
          <button className="btn" style={{ background: '#eee', color: '#444' }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={confirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
