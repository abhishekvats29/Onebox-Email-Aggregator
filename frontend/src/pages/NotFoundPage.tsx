import { useLocation, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(to right, #f0f2f5, #e9ecef)",
        padding: "1rem",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <div
        className="text-center p-5 rounded-4 shadow-lg"
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          border: "2px solid red", 
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
          maxWidth: "520px",
          width: "100%",
        }}
      >
        <div className="mb-3" style={{ fontSize: "3.5rem", color: "#dc3545" }}>
          <FaExclamationTriangle />
        </div>
        <h1 className="display-5 fw-bold text-danger mb-2">404 - Not Found</h1>
        <p className="text-dark mb-1">
          The page <code className="text-danger">{location.pathname}</code> doesn't exist.
        </p>
        <p className="text-muted mb-4">Please click below to return home.</p>
        <button
            className="btn btn-outline-primary me-2"
            style={{ color: 'rgba(252, 27, 11, 1)', border: '2px solid #007bff', fontWeight: 600 }}
            onClick={() => navigate('/')}
          >
            Go to home
          </button>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;
