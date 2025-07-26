// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
        padding: '1rem',
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <h1 className="display-5 fw-bold mb-3">📨 Welcome to Onebox for Emails</h1>
        <p className="lead text-dark mb-4">
          View, search, and categorize your synced emails across multiple accounts. Powered by AI and Elasticsearch.
        </p>
        <button
          onClick={() => navigate('/emails')}
          className="btn btn-primary btn-lg px-4"
          style={{ backgroundColor: '#007BFF', border: 'none' }}
        >
          Go to Email Dashboard
        </button>
      </div>

      
          </div>
        
    
    
  );
}

export default HomePage;
