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
## 📁 Project Structure

```text
skill-mentor/
│
├── backend/                          # Spring Boot backend (Java)
│   └── backend/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/skillmentor/backend/
│       │       │       ├── controller/     # REST Controllers
│       │       │       ├── service/        # Business logic
│       │       │       ├── repository/     # JPA repositories
│       │       │       ├── model/          # Entities
│       │       │       └── config/         # Config (CORS)
│       │       │
│       │       └── resources/
│       │           └── application.properties
│       │
│       ├── Dockerfile
│       └── pom.xml
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── lib/
│   │   ├── types/
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
> This structure follows a modular full-stack architecture separating frontend, backend, and infrastructure.

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



