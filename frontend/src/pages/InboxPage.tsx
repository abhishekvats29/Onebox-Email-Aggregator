// src/pages/InboxPage.tsx

import React, { useEffect, useState } from "react";
import { getEmails } from "../services/emailService";
import type { Email } from "../types/email";
import EmailCard from "../components/EmailCard";


const InboxPage: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [selectedFolder, setSelectedFolder] = useState<string>("All");
  const [selectedAccount, setSelectedAccount] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const data = await getEmails();
        setEmails(data);
        setFilteredEmails(data);
      } catch (err: any) {
        setError("Failed to fetch emails.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    let result = [...emails];

    if (selectedFolder !== "All") {
      result = result.filter((email) => email.folder === selectedFolder);
    }

    if (selectedAccount !== "All") {
      result = result.filter((email) => email.account === selectedAccount);
    }

    if (selectedCategory !== "All") {
      result = result.filter((email) => email.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (email) =>
          email.subject.toLowerCase().includes(term) ||
          email.from.toLowerCase().includes(term) ||
          email.body.toLowerCase().includes(term)
      );
    }

    setFilteredEmails(result);
  }, [selectedFolder, selectedAccount, selectedCategory, searchTerm, emails]);

  const uniqueFolders = ["All", ...Array.from(new Set(emails.map((e) => e.folder)))];
  const uniqueAccounts = ["All", ...Array.from(new Set(emails.map((e) => e.account)))];
  const uniqueCategories = ["All", ...Array.from(new Set(emails.map((e) => e.category || "Uncategorized")))];
  
  return (
    <div className="container-fluid bg-white bg-opacity-75 min-vh-100 py-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6 fw-bold text-dark">📥 Your Emails</h1>
        <input
          type="text"
          className="form-control w-50 shadow-sm rounded-pill px-4 py-2"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="form-select shadow-sm"
          >
            {uniqueFolders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="form-select shadow-sm"
          >
            {uniqueAccounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select shadow-sm"
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* States */}
      {loading && <p className="text-center text-muted">Loading emails...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {!loading && filteredEmails.length === 0 && (
        <p className="text-center text-muted">No emails found for current filters.</p>
      )}

      {/* Email List */}
      <div className="row g-4">
        {filteredEmails.map((email) => (
          <div className="col-md-6 col-lg-4" key={email.id}>
            <EmailCard email={email} />
          </div>
        ))}
      </div>

      
      </div>
    
  );
};

export default InboxPage;
