// src/components/EmailModal.tsx
import { Modal, Button } from "react-bootstrap";

interface Email {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  date: string;
  folder: string;
  category: string;
}

interface EmailModalProps {
  show: boolean;
  handleClose: () => void;
  email: Email | null;
}

const EmailModal = ({ show, handleClose, email }: EmailModalProps) => {
  if (!email) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white border-0">
        <Modal.Title>{email.subject}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark">
        <p><strong>From:</strong> {email.from}</p>
        <p><strong>To:</strong> {email.to}</p>
        <p><strong>Date:</strong> {new Date(email.date).toLocaleString()}</p>
        <hr />
        <p>{email.body}</p>
        <div className="mt-3">
          <span className="badge bg-primary">{email.category}</span>
          <span className="badge bg-secondary ms-2">{email.folder}</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0">
        <Button variant="outline-light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
