// src/components/EmailCard.tsx
import { useState } from "react";

interface EmailProps {
  email: {
    id: string;
    subject: string;
    body: string;
    from: string;
    to: string;
    date: string;
    folder: string;
    category: string;
  };
}

const getBadgeColor = (category: string): string => {
  switch (category) {
    case "Interested":
      return "#22c55e"; // green-500
    case "Meeting Booked":
      return "#0ea5e9"; // blue-500
    case "Not Interested":
      return "#ef4444"; // red-500
    case "Spam":
      return "#a855f7"; // purple-500
    case "Out of Office":
      return "#f97316"; // orange-500
    default:
      return "#6b7280"; // gray-500 for Uncategorized
  }
};

const EmailCard = ({ email }: EmailProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="container my-4" style={{ maxWidth: "720px" }}>
      <div
        className="p-4"
        style={{
          borderRadius: "1.5rem",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          border: `1px solid ${getBadgeColor(email.category)}`,
          color: "#000",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Subject and Date */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-bold text-dark mb-0">{email.subject}</h5>
          <small className="text-muted">
            {new Date(email.date).toLocaleString()}
          </small>
        </div>

        {/* Body Preview / Expanded */}
        <p className="text-dark small mb-3">
          {expanded
            ? email.body
            : email.body.length > 200
            ? email.body.slice(0, 200) + "..."
            : email.body}
        </p>

        {/* From and To */}
        <div className="row text-secondary small mb-3">
          <div className="col-md-6 mb-1">
            <strong>From:</strong>{" "}
            <span className="text-dark">{email.from}</span>
          </div>
          <div className="col-md-6 mb-1">
            <strong>To:</strong>{" "}
            <span className="text-dark">{email.to}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="d-flex justify-content-start">
          <span
            className="badge text-white"
            style={{
              backgroundColor: getBadgeColor(email.category),
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "0.75rem",
            }}
          >
            {email.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
