import { useState, useContext } from 'react';
import { ToastContext } from '../App';
import './Data.css';

export default function Data({ openChat, addProjection }) {
  const toast = useContext(ToastContext);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [importModal, setImportModal] = useState(null); // holds file being configured for import

  const uploadFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      toast('Only CSV and Excel (.xlsx) files are supported');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      const entry = { id: Date.now(), ...data };
      setFiles(prev => [entry, ...prev]);
      setPreview(entry);
      toast(`"${data.name}" loaded — ${data.rowCount} rows`);
    } catch (err) {
      toast('Error: ' + err.message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = (fileList) => Array.from(fileList).forEach(uploadFile);

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (preview?.id === id) setPreview(null);
    toast('File removed');
  };

  const analyzeWithAI = (file) => {
    const sample = file.rows.slice(0, 15);
    const dataStr = `File: ${file.name}\nColumns: ${file.headers.join(', ')}\nSample data:\n` +
      sample.map(r => file.headers.map((h, i) => `${h}: ${r[i] ?? ''}`).join(' | ')).join('\n');
    const prompt = `Please analyze this financial data and give me key insights, trends, and recommendations:\n\n${dataStr}`;
    // Store for chatbot to pick up
    window.__pendingChatPrompt = prompt;
    openChat('__data_analysis__');
  };

  // Open the import configuration modal
  const openImportModal = (file) => {
    const nc = file.numericCols || {};
    const headers = file.headers;
    // Try to auto-detect common column names
    const guess = (keywords) => {
      const h = headers.find(h => keywords.some(k => h.toLowerCase().includes(k)));
      return h || '';
    };
    setImportModal({
      file,
      name: file.name.replace(/\.(csv|xlsx|xls)$/i, ''),
      revCol:  guess(['revenue', 'sales', 'income', 'gross']),
      costCol: guess(['cost', 'expense', 'spend', 'cogs']),
      invCol:  guess(['invest', 'capital', 'startup', 'initial']),
      mo: '12',
      grow: '0',
      disc: '8',
    });
  };

  const confirmImport = () => {
    if (!importModal) return;
    const { file, name, revCol, costCol, invCol, mo, grow, disc } = importModal;
    const nc = file.numericCols || {};

    const getAvg = (colName) => {
      if (!colName) return 0;
      const idx = file.headers.indexOf(colName);
      if (idx === -1) return 0;
      const vals = file.rows
        .map(r => parseFloat(String(r[idx] || '').replace(/[$,%\s]/g, '')))
        .filter(v => !isNaN(v) && isFinite(v));
      if (!vals.length) return 0;
      return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    };

    addProjection({
      name: name || file.name,
      rev:  getAvg(revCol),
      cost: getAvg(costCol),
      inv:  getAvg(invCol),
      mo:   parseInt(mo) || 12,
      grow: parseFloat(grow) || 0,
      disc: parseFloat(disc) || 8,
    });
    setImportModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data</h1>
      </div>

      {/* Upload Zone */}
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onClick={() => !uploading && document.getElementById('file-input').click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); if (!uploading) handleFiles(e.dataTransfer.files); }}
      >
        <div className="upload-icon">{uploading ? '⏳' : '📂'}</div>
        <div className="upload-title">{uploading ? 'Uploading & parsing file...' : 'Upload Financial Data'}</div>
        <div className="upload-sub">Drag & drop or click to select — supports CSV and Excel (.xlsx, .xls)</div>
        <button
          className="btn btn-primary"
          onClick={e => { e.stopPropagation(); if (!uploading) document.getElementById('file-input').click(); }}
          disabled={uploading}
        >
          {uploading ? 'Processing...' : 'Select Files'}
        </button>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          accept=".csv,.xlsx,.xls"
          multiple
          onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="file-list">
          {files.map(f => (
            <div key={f.id} className={`file-card ${preview?.id === f.id ? 'active' : ''}`}>
              <div className="file-card-info" onClick={() => setPreview(f)}>
                <div className="file-card-name">📄 {f.name}</div>
                <div className="file-card-meta">{f.rowCount} rows · {f.headers.length} columns · Click to preview</div>
              </div>
              <div className="file-card-actions">
                <button className="btn btn-secondary sm-btn" onClick={() => setPreview(f)}>Preview</button>
                <button className="btn btn-danger sm-btn"    onClick={() => removeFile(f.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Table */}
      {preview && (
        <div className="card file-preview">
          <div className="preview-header">
            <div>
              <div className="preview-title">{preview.name}</div>
              <div className="preview-meta">{preview.rowCount} total rows · showing first 50</div>
            </div>
            <div className="preview-actions">
              <button className="btn btn-primary"   onClick={() => analyzeWithAI(preview)}>Analyze with AI ✦</button>
              <button className="btn btn-secondary" onClick={() => openImportModal(preview)}>Open as Projection</button>
            </div>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>{preview.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {preview.rows.slice(0, 50).map((row, ri) => (
                  <tr key={ri}>
                    {preview.headers.map((_, ci) => <td key={ci}>{row[ci] ?? ''}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {importModal && (
        <div className="modal-backdrop" onClick={() => setImportModal(null)}>
          <div className="modal import-modal" onClick={e => e.stopPropagation()}>
            <h3>Open as Projection</h3>
            <p>Map your file's columns to projection inputs. Leave blank if not applicable.</p>

            <div className="field">
              <label>Projection Name</label>
              <input
                value={importModal.name}
                onChange={e => setImportModal(m => ({ ...m, name: e.target.value }))}
                placeholder="e.g. Q3 Revenue Forecast"
              />
            </div>

            <div className="import-grid">
              <div className="field">
                <label>Revenue Column</label>
                <select value={importModal.revCol} onChange={e => setImportModal(m => ({ ...m, revCol: e.target.value }))}>
                  <option value="">-- none --</option>
                  {importModal.file.headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Cost / Expense Column</label>
                <select value={importModal.costCol} onChange={e => setImportModal(m => ({ ...m, costCol: e.target.value }))}>
                  <option value="">-- none --</option>
                  {importModal.file.headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Investment Column</label>
                <select value={importModal.invCol} onChange={e => setImportModal(m => ({ ...m, invCol: e.target.value }))}>
                  <option value="">-- none --</option>
                  {importModal.file.headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Projection Period (months)</label>
                <input type="number" value={importModal.mo} min="1" max="60"
                  onChange={e => setImportModal(m => ({ ...m, mo: e.target.value }))} />
              </div>
              <div className="field">
                <label>Growth Rate (%/mo)</label>
                <input type="number" value={importModal.grow} step="0.1"
                  onChange={e => setImportModal(m => ({ ...m, grow: e.target.value }))} />
              </div>
              <div className="field">
                <label>Discount Rate (%/yr)</label>
                <input type="number" value={importModal.disc} step="0.1"
                  onChange={e => setImportModal(m => ({ ...m, disc: e.target.value }))} />
              </div>
            </div>

            <div style={{ background: '#f0f4f8', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#555' }}>
              ℹ️ Column values will be averaged across all rows to produce monthly figures.
            </div>

            <div className="modal-btns">
              <button className="btn" style={{ background: '#eee', color: '#444' }} onClick={() => setImportModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmImport}>Create Projection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
