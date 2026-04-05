import { useState, useContext } from 'react';
import { ToastContext } from '../App';
import Modal from '../components/Modal';

export default function Profile() {
  const toast = useContext(ToastContext);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    name: 'John Doe',
    business: 'Doe Logistics LLC',
    email: 'john@doelogistics.com',
    phone: '+1 (555) 234-5678',
    industry: 'Transportation & Logistics',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="card" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: '#e9e9e9', border: '3px solid #0d1b4b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 700, color: '#0d1b4b', flexShrink: 0,
          }}>JD</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#0e084c' }}>{form.name}</div>
            <div style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{form.business}</div>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 3 }}>{form.email}</div>
          </div>
        </div>

        {[
          { label: 'Full Name',      key: 'name' },
          { label: 'Business Name',  key: 'business' },
          { label: 'Email',          key: 'email' },
          { label: 'Phone',          key: 'phone' },
          { label: 'Industry',       key: 'industry' },
        ].map(({ label, key }) => (
          <div className="field" key={key}>
            <label>{label}</label>
            <input value={form[key]} onChange={e => set(key, e.target.value)} />
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn btn-primary" onClick={() => toast('Profile saved!')}>Save Changes</button>
          <button className="btn btn-secondary" onClick={() => setModal(true)}>Change Password</button>
        </div>
      </div>

      {modal && (
        <Modal
          title="Change Password"
          description="Enter your new password"
          placeholder="New password"
          onConfirm={() => toast('Password updated!')}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}
