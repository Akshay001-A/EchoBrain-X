# 🧠 EchoBrain X

AI-Powered Code Understanding Platform that allows developers to upload repositories and instantly explore, analyze, summarize, and chat with their codebase using AI.

---

## 🚀 Overview

EchoBrain X helps developers understand unfamiliar projects faster by automatically extracting source code snippets, generating embeddings, and using AI to provide:

- Project Summaries
- Code Flow Analysis
- AI Code Chat
- Source Code Viewing
- Semantic Code Search

Instead of manually reading hundreds of files, developers can ask questions in plain English and receive intelligent explanations.

---

## ✨ Features

### 📂 Repository Upload

Upload any ZIP repository and automatically:

- Extract source files
- Parse code
- Generate embeddings
- Store snippets in MongoDB

---

### 🤖 AI Code Chat

Ask questions like:

```text
How does login work?
Which file handles products?
Explain authentication flow.
```

EchoBrain X:

- Finds relevant snippets
- Uses vector similarity search
- Sends context to Gemini AI
- Returns human-friendly explanations

---

### 📄 Project Summary

Generate complete project summaries including:

- Purpose
- Architecture
- Tech Stack
- Main Modules
- API Endpoints
- Database Models
- Features

---

### 🔄 Flow Analysis

Understand execution flow:

```text
User Action
      ↓
Frontend
      ↓
API Route
      ↓
Controller
      ↓
Database
      ↓
Response
```

Perfect for:

- Interviews
- Learning projects
- Understanding legacy code

---

### 📑 Source Code Viewer

Browse uploaded repositories directly inside EchoBrain X.

Features:

- Project selector
- File explorer
- Search files
- Code viewer
- Fast navigation

---

## 🏗 System Architecture

```text
User
 ↓
Frontend (Next.js)
 ↓
Backend API (Node.js + Express)
 ↓
MongoDB
 ↓
Embeddings
 ↓
Gemini AI
```

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React.js
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### AI & ML

- Google Gemini
- Xenova Transformers
- Vector Embeddings
- Cosine Similarity Search

### Authentication

- JWT Authentication

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Upload Repository

![Upload](screenshots/upload.png)

---

### AI Chat

![Chat](screenshots/chat.png)

---

### Project Summary

![Summary](screenshots/summary.png)

---

### Source Code Viewer

![Viewer](screenshots/viewer.png)

---

## 📁 Project Structure

```text
EchoBrain-X
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── public
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── utils
│   └── uploads
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/echobrain-x.git
cd echobrain-x
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create:

```env
backend/.env
```

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Future Enhancements

- API Endpoint Explorer
- Dependency Graph Visualization
- Architecture Diagram Generator
- AI Bug Detection
- AI Documentation Generator
- Multi-Language Support
- Team Collaboration

---

## Use Cases

### Students

Understand large projects faster.

### Developers

Analyze unfamiliar repositories.

### Interview Preparation

Explain project architecture confidently.

### Teams

Onboard new developers quickly.

---

## Author

### Akshay R

Full Stack Developer

Tech Stack:

- Java
- Python
- JavaScript
- React
- Node.js
- Express.js
- MongoDB
- MySQL
- AI & Machine Learning

---

## License

MIT License

---

⭐ If you like this project, give it a star on GitHub.