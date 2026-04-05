import './Home.css';

const projections = [
  { name: 'Profitability of New Truck', date: '3/4/26' },
  { name: 'Ad Campaign Returns',        date: '2/24/26' },
  { name: 'Supply Costs: 2026',         date: '2/13/26' },
];

const chats = [
  { name: 'Discounting Explanation',    date: '3/6/26' },
  { name: 'Price-per-Lead Chat',        date: '2/27/26' },
  { name: 'Alternative Supply Options', date: '2/14/26' },
];

export default function Home({ onNavigate, openChat }) {
  return (
    <div>
      <h1 className="welcome">Welcome back, John</h1>
      <div className="tiles-grid">
        <div className="tile">
          <div className="tile-title">Projections</div>
          {projections.map(p => (
            <div key={p.name} className="tile-item" onClick={() => onNavigate('projections')}>
              <span>{p.name}</span>
              <span className="tile-date">{p.date}</span>
            </div>
          ))}
          <button className="btn btn-primary tile-btn" onClick={() => onNavigate('projections')}>
            Open Projections
          </button>
        </div>

        <div className="tile">
          <div className="tile-title">Chats</div>
          {chats.map(c => (
            <div key={c.name} className="tile-item" onClick={() => openChat(c.name)}>
              <span>{c.name}</span>
              <span className="tile-date">{c.date}</span>
            </div>
          ))}
          <button className="btn btn-primary tile-btn" onClick={() => onNavigate('chat')}>
            Open Chatbot
          </button>
        </div>
      </div>
    </div>
  );
}
