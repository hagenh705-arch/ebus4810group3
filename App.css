* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f0f2f5;
  color: #0e084c;
}

.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

/* ── BUTTONS ── */
.btn { padding: 9px 18px; border-radius: 10px; border: none; font-size: 14px; cursor: pointer; font-weight: 500; transition: all 0.15s; font-family: inherit; }
.btn-primary   { background: #0d1b4b; color: #fff; }
.btn-primary:hover { background: #1a2d6e; }
.btn-secondary { background: #80b1d5; color: #0e084c; }
.btn-secondary:hover { background: #6aa0c8; }
.btn-danger    { background: #e05252; color: #fff; }
.btn-danger:hover { background: #c43c3c; }
.btn:disabled  { opacity: 0.45; cursor: not-allowed; }

/* ── PAGE HEADER ── */
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
.page-title  { font-size: 36px; font-weight: 700; color: #0e084c; }
.btn-row     { display: flex; gap: 10px; flex-wrap: wrap; }

/* ── CARDS ── */
.card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.09); }

/* ── FORM INPUTS ── */
.field { margin-bottom: 16px; }
.field label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
.field input, .field textarea, .field select {
  width: 100%; padding: 10px 13px; border: 1.5px solid #dde3ed;
  border-radius: 10px; font-size: 14px; color: #0e084c;
  outline: none; font-family: inherit; background: #fff;
}
.field input:focus, .field textarea:focus { border-color: #80b1d5; }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: #0d1b4b; color: #fff; padding: 11px 22px;
  border-radius: 10px; font-size: 14px; z-index: 1000;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2); white-space: nowrap;
  animation: fadeInUp 0.25s ease;
}
@keyframes fadeInUp { from { opacity:0; transform: translateX(-50%) translateY(8px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

/* ── MODAL ── */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,0.45);
  z-index: 500; display: flex; align-items: center; justify-content: center;
}
.modal {
  background: #fff; border-radius: 16px; padding: 28px;
  width: 400px; max-width: 92vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.modal h3 { font-size: 20px; font-weight: 700; color: #0e084c; margin-bottom: 6px; }
.modal p  { font-size: 13px; color: #888; margin-bottom: 16px; }
.modal-btns { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
