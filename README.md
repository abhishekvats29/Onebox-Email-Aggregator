# Onebox Email Aggregator

## Overview

Onebox Email Aggregator is a full-stack web application designed to aggregate and manage emails from multiple accounts. It includes a backend service that fetches and processes emails, and a React frontend for displaying and interacting with emails. The project also features an AI-powered chatbot that suggests replies based on email content.

---
## Snapshot

Below is the main email list view of the application:

![Email List View] <img width="1920" height="866" alt="Image" src="https://github.com/user-attachments/assets/fab59945-91c1-4cdb-8b37-8184253722fe" />

---
## Features

- **Real-Time Email Synchronization**: - Sync multiple IMAP accounts in real-time - minimum 2.
- **Searchable Storage using Elasticsearch**: Search emails by keywords and filter by folders/accounts.
- **AI-Based Email Categorization**: Implement an AI model to categorize emails.
- **Slack & Webhook Integration**: Send Slack notifications for every new Interested email.
- **Chatbot interface**: Interactive chatbot UI embedded in the frontend for quick replies.
- **Responsive UI**: Built with React and Bootstrap for a clean and responsive design.
- **Dockerized backend**: Easily deploy backend using Docker.
- **AI-Powered Suggested Replies**: Chatbot suggests relevant replies based on email content using a simulated vector index.

---

## Architecture

- **Language**: TypeScript language has been used for both frontned and backend.
- **Backend**: Node.js/Express server managing IMAP connections, email fetching, and reply suggestion logic.
- **Frontend**: React application using React Router for navigation and Bootstrap for styling.
- **Chatbot**: Frontend component with local reply logic simulating AI suggested replies.
- **Database**: SQLite and Prisma For storing user preferences or email metadata.
- **Deployment**: Backend can be containerized using Docker for easy deployment.

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Git
- Docker (optional, for backend containerization)


### Backend Setup
Navigate to the backend folder
cd backend
Install dependencies:
npm install
Configure environment variables:

Create a .env file in the backend root.
Add necessary environment variables such as email credentials, API keys, ports, etc.

Run the backend server locally:

npm run dev
Or build and run with Docker:

docker build -t onebox-backend .
docker run -p 3000:3000 onebox-backend

### Frontend Setup
Navigate to the frontend folder:

cd frontend
Install dependencies:

npm install
Run the React development server:

npm run dev
Access the app in your browser at http://localhost:5173 (default Vite port).

---
### Usage

- Navigate to the email list page to view aggregated emails.
- Use the search bar to filter emails.
- Open the chatbot from the icon to get AI-simulated reply suggestions.
- Type "clear chat" in the chatbot to reset the conversation.

---
## License

This repository contains code developed as part of an assignment.  
The code is intended solely for the purpose of the assignment and Gaining Practical knowledge.  
Unauthorized use, distribution, or commercial use is prohibited without explicit permission.

© 2025 Abhishek Vats. All rights reserved.


