import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Projections from './pages/Projections';
import Chatbot from './pages/Chatbot';
import Data from './pages/Data';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Toast from './components/Toast';
import './App.css';

export const ToastContext = React.createContext(null);

const DEFAULT_PROJS = [
  { id: 1, name: 'Profitability of New Truck', date: '3/4/26',  inv: 120000, rev: 18000, cost: 12000, grow: 2,   mo: 36, disc: 8 },
  { id: 2, name: 'Ad Campaign Returns',         date: '2/24/26', inv: 15000,  rev: 6000,  cost: 3500,  grow: 5,   mo: 12, disc: 10 },
  { id: 3, name: 'Supply Costs: 2026',          date: '2/13/26', inv: 25000,  rev: 9500,  cost: 7000,  grow: 1.5, mo: 12, disc: 6 },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [toast, setToast] = useState(null);
  const [chatInitTitle, setChatInitTitle] = useState(null);

  // Shared projections state — lifted up so Data page can add to it
  const [projections, setProjections] = useState(DEFAULT_PROJS);
  const [pendingProjId, setPendingProjId] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const openChat = (title) => {
    setChatInitTitle(title);
    setPage('chat');
  };

  const navigate = (p) => {
    setChatInitTitle(null);
    setPage(p);
  };

  // Called from Data page when user imports a file as a new projection
  const addProjectionFromData = (projData) => {
    const id = Date.now();
    const d = new Date();
    const newProj = {
      id,
      name: projData.name || 'Imported Projection',
      date: `${d.getMonth()+1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`,
      inv:  projData.inv  || 0,
      rev:  projData.rev  || 0,
      cost: projData.cost || 0,
      grow: projData.grow || 0,
      mo:   projData.mo   || 12,
      disc: projData.disc || 8,
    };
    setProjections(prev => [newProj, ...prev]);
    setPendingProjId(id);
    showToast(`"${newProj.name}" added to Projections!`);
    navigate('projections');
  };

  return (
    <ToastContext.Provider value={showToast}>
      <div className="app">
        <Sidebar current={page} onNavigate={navigate} />
        <main className="main">
          {page === 'home'        && <Home onNavigate={navigate} openChat={openChat} />}
          {page === 'projections' && (
            <Projections
              projections={projections}
              setProjections={setProjections}
              pendingProjId={pendingProjId}
              clearPending={() => setPendingProjId(null)}
            />
          )}
          {page === 'chat'        && <Chatbot initTitle={chatInitTitle} />}
          {page === 'data'        && <Data openChat={openChat} addProjection={addProjectionFromData} />}
          {page === 'profile'     && <Profile />}
          {page === 'settings'    && <Settings />}
        </main>
        {toast && <Toast message={toast} />}
      </div>
    </ToastContext.Provider>
  );
}
