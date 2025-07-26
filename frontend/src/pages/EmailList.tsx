import { useEffect, useState } from 'react';
import axios from 'axios';
import EmailCard from '../components/EmailCard';
import { useNavigate } from 'react-router-dom';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate = useNavigate();

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/emails');
      setEmails(res.data);
    } catch (err) {
      console.error('Error fetching emails:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return fetchEmails();
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/emails/search?q=${encodeURIComponent(search)}`
      );
      setEmails(res.data);
    } catch (err) {
      console.error('Error searching emails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div className="container-fluid">
          {/* Left: Home Button */}
          <button
            className="btn btn-outline-primary me-2"
            style={{ color: '#f9fbfeff', border: '2px solid #007bff', fontWeight: 600 }}
            onClick={() => navigate('/')}
          >
            Home
          </button>

          {/* Toggle for small screens */}
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center: Search + Right: Title */}
{/* Center: Search + Right: Title */}
<div className="collapse navbar-collapse justify-content-between" id="navbarContent">
  {/* Centered search form */}
  <form
    className="d-flex form-inline mx-auto my-2 my-lg-0 align-items-center"
    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
    style={{ maxWidth: '600px', width: '100%' }}
  >
    <input
      className="form-control me-2 rounded-pill px-3 w-100"
      type="search"
      placeholder="Search emails..."
      aria-label="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button className="btn btn-primary rounded-pill px-3" type="submit">
      Search
    </button>
  </form>
  
  {/* Right-aligned title */}
  <div className="ms-auto text-end pe-3 d-none d-lg-block">
    <h4 className="fw-bold m-0 text-white">Onebox for Emails</h4>
  </div>
</div>

        </div>
      </nav>

      {/* Filters */}
      <div className="container mt-5">
        <div className="row g-3 justify-content-center">
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="">📁 Filter by Folder</option>
              <option value="inbox">Inbox</option>
              <option value="sent">Sent</option>
              <option value="drafts">Drafts</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="">📨 Filter by Account</option>
              <option value="work@example.com">work@example.com</option>
              <option value="personal@example.com">personal@example.com</option>
            </select>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-center my-4 fw-bold">📬 Your Emails</h2>

        {/* Email Cards */}
        {loading ? (
          <p className="text-center">Loading emails...</p>
        ) : emails.length === 0 ? (
          <p className="text-center">No emails found.</p>
        ) : (
          <div className="row justify-content-center">
            {emails.map((email: any) => (
              <div key={email.id} className="col-md-8 mb-3">
                <EmailCard email={email} />
              </div>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default EmailList;
