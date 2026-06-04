<div align="center">

# 🧠 EchoBrain X

### AI-Powered Code Understanding Platform

Upload repositories, analyze architecture, chat with your codebase, generate summaries, and understand projects instantly using AI.

![GitHub stars](https://img.shields.io/github/stars/Akshay001-A/EchoBrain?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Akshay001-A/EchoBrain?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Akshay001-A/EchoBrain?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 🚀 Overview

EchoBrain X is an AI-powered repository intelligence platform designed to help developers understand unfamiliar projects faster.

Instead of manually exploring hundreds of files, users can upload a repository and instantly:

✅ Generate project summaries

✅ Chat with code using AI

✅ Analyze architecture and execution flow

✅ Perform semantic code search

✅ Browse source files visually

✅ Understand APIs and modules

---

# ✨ Core Features

## 📂 Repository Upload & Processing

Upload any project repository as a ZIP file.

EchoBrain automatically:

- Extracts source code
- Parses project structure
- Generates vector embeddings
- Stores searchable code snippets
- Builds AI-ready project context

---

## 🤖 AI Code Chat

Ask questions in plain English:

```text
How does authentication work?

Which file handles products?

Explain the user registration flow.

Where is JWT implemented?
```

The platform:

1. Retrieves relevant code snippets
2. Performs semantic similarity search
3. Sends contextual information to Gemini AI
4. Returns detailed explanations

---

## 📄 AI Project Summary

Generate comprehensive summaries including:

- Project Purpose
- Architecture Overview
- Tech Stack
- Main Features
- APIs
- Database Models
- Folder Structure

Perfect for:

- Learning new projects
- Team onboarding
- Interview preparation

---

## 🔄 Architecture & Flow Analysis

Understand complete application workflows.

```text
User
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

Useful for:

- Legacy codebases
- Enterprise projects
- System design understanding

---

## 🔍 Semantic Code Search

Search code using natural language.

Example:

```text
Find payment logic

Show JWT implementation

Where are products created?
```

Instead of keyword matching, EchoBrain understands code meaning.

---

## 📑 Source Code Viewer

Built-in repository explorer featuring:

- Project Navigator
- Folder Explorer
- File Search
- Syntax Highlighting
- Quick Navigation

No need to open external IDEs.

---

# 🏗️ System Architecture

```text
                ┌──────────────┐
                │    User      │
                └──────┬───────┘
                       │
                       ▼
            ┌─────────────────────┐
            │   Next.js Frontend  │
            └─────────┬───────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │ Express.js Backend  │
            └─────────┬───────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼

    MongoDB Storage       Embedding Engine
                                  │
                                  ▼

                          Gemini AI Model
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React.js
- Tailwind CSS
- Axios
- Framer Motion

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Artificial Intelligence

- Google Gemini
- Xenova Transformers
- Vector Embeddings
- Semantic Search
- Cosine Similarity

## Authentication

- JWT Authentication

---

# 📸 Screenshots

> Ensure a `screenshots` folder exists in the root repository.

## 📸 Dashboard

<p align="center">
  <img src="frontend/public/screenshots/dashboard.png" width="900">
</p>

---

## 📸 Repository Upload

<p align="center">
  <img src="frontend/public/screenshots/upload.png" width="900">
</p>

---

## 📸 AI Chat

<p align="center">
  <img src="frontend/public/screenshots/chat.png" width="900">
</p>

---

## 📸 Project Summary

<p align="center">
  <img src="frontend/public/screenshots/summary.png" width="900">
</p>

---

## 📸 Source Code Viewer

<p align="center">
  <img src="frontend/public/screenshots/viewer.png" width="900">
</p>

---

# 📂 Project Structure

```text
EchoBrain
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   ├── hooks
│   └── public
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── utils
│   ├── services
│   └── uploads
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Akshay001-A/EchoBrain.git

cd EchoBrain
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🔑 Environment Variables

Create:

```env
backend/.env
```

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# 🎯 Use Cases

## 👨‍🎓 Students

Learn and understand large projects quickly.

## 👨‍💻 Developers

Analyze unfamiliar repositories efficiently.

## 🎤 Interview Preparation

Explain project architecture confidently.

## 🏢 Teams

Accelerate onboarding for new developers.

---

# 🚀 Future Roadmap

- AI Documentation Generator
- Dependency Graph Visualization
- API Explorer
- Architecture Diagram Generator
- AI Bug Detection
- Code Quality Insights
- Multi-Language Support
- Team Collaboration Features

---

# 👨‍💻 Author

## Akshay R

Full Stack Developer | AI & ML Enthusiast

### Skills

- Java
- Python
- JavaScript
- React.js
- Next.js
- Node.js
- Express.js
- MongoDB
- MySQL
- Machine Learning
- Deep Learning

### Connect

- GitHub: https://github.com/Akshay001-A
- LinkedIn: https://www.linkedin.com/in/akshayofficial0207

---

# ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the repository

🛠 Contribute to the project

---

# 📄 License

Licensed under the MIT License.

Made with ❤️ by Akshay R