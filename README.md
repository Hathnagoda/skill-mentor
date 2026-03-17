# 🚀 SkillMentor – Online Mentoring Platform

SkillMentor is a **full-stack web application** that connects students with expert mentors for personalized learning sessions.

It allows users to browse mentors, book sessions, manage schedules, and track learning progress — all in one platform.

---

## 🌟 Features

### 👨‍🎓 Student
- Browse available mentors
- Book one-on-one sessions
- View personal session history
- Join meetings via generated links

### 👨‍🏫 Admin
- Manage all sessions
- Confirm payments
- Approve or cancel sessions
- Mark sessions as completed
- Update meeting links

---

## 🧠 Tech Stack

### Frontend
- React.js (Vite)
- TypeScript
- Tailwind CSS

### Backend
- Spring Boot (Java)
- REST API (JAX-RS style)
- Hibernate / JPA

### Database
- PostgreSQL (Supabase)

### DevOps
- Docker (containerized setup)
- GitHub (version control)

---

## 📁 Project Structure
skill-mentor/
│
├── backend/                          # Spring Boot backend (Java)
│   └── backend/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/skillmentor/backend/
│       │       │       ├── controller/     # REST Controllers (API endpoints)
│       │       │       ├── service/        # Business logic layer
│       │       │       ├── repository/     # JPA repositories
│       │       │       ├── model/          # Entity classes
│       │       │       └── config/         # Configuration (CORS, etc.)
│       │       │
│       │       └── resources/
│       │           └── application.properties   # App configuration
│       │
│       ├── Dockerfile                 # Backend container setup
│       └── pom.xml                    # Maven dependencies
│
├── frontend/                         # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Application pages (routes)
│   │   ├── services/                 # API service functions
│   │   ├── lib/                      # Utility functions (auth, fetch, etc.)
│   │   ├── types/                    # TypeScript types
│   │   └── App.tsx                   # Main app entry
│   │
│   ├── public/                       # Static assets
│   ├── index.html
│   ├── package.json
│   └── Dockerfile                    # Frontend container setup
│
├── docker-compose.yml                # Multi-container orchestration
├── .gitignore                        # Ignored files
└── README.md                         # Project documentation


## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Hathangoda/skill-mentor.git
cd skill-mentor
docker compose up --build

Frontend:
http://localhost:5173

Backend API:
http://localhost:8080/api/v1

Gayantha Hathnagoda
BSc (Hons) Computer Science
Aspiring Full-Stack Developer



