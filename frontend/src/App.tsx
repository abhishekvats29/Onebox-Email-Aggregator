// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmailList from "./pages/EmailList";
import NotFoundPage from "./pages/NotFoundPage";
import ReplyBot from "./components/ReplyBot";

function App() {
  return (
    <Router>
      {/* Only one instance of the bot */}
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emails" element={<EmailList />} />
          <Route path="/NotFound" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Routes>

        {/* Global chatbot container */}
        <div className="replybot-global">
          <ReplyBot />
        </div>
      </div>
    </Router>
  );
}

export default App;
