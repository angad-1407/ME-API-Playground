# Candidate Profile Playground

A full-stack playground functionality that serves a candidate profile, projects, and skills through a RESTful API and displays them in a modern, premium React frontend.

## 🚀 Features

- **Store & Serve Profile**: JSON-based profile data stored in SQLite.
- **Search & Filter**: Filter projects by skill tags or full-text search.
- **Premium UI**: Dark-themed, responsive design with glassmorphism effects and animations.
- **API**: Exposes endpoints for CRUD and querying.

## 🏗 Architecture

- **Backend**: Node.js, Express, Prisma (ORM), SQLite
- **Frontend**: React (Vite), TailwindCSS, Framer Motion
- **Database**: SQLite (local file `dev.db`)

### Directory Structure
```
/
├── backend/    # API Server & Database
└── frontend/   # React Application
```

## 🛠 Setup & Local Development

### Prerequisites
- Node.js (v18+)

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init # Setup DB
npx tsx src/seed.ts                # Seed data
npm run dev                        # Start server on :3000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev                        # Start client on :5173
```

## 📚 API Documentation

### Base URL
`http://localhost:3000`

### Endpoints

| Method | Endpoint | Description |
|os|---|---|
| GET | `/health` | Check API status |
| GET | `/profile` | Get full profile details |
| GET | `/projects?skill=...` | Get projects (optional filter by skill) |
| GET | `/skills/top` | Get top skills |
| GET | `/search?q=...` | Search projects, skills, and experience |

### Sample cURL
```bash
# Health Check
curl http://localhost:3000/health

# Search for Python projects
curl "http://localhost:3000/projects?skill=Python"
```

## 🗄 Database Schema

Defined in `backend/prisma/schema.prisma`.
- **Profile**: Main entity (1 row).
- **Skill**: Related skills.
- **Project**: Portfolio projects with `techStack` string.
- **WorkExperience**: Professional history.
- **Education**: Academic history.
- **Link**: Social/Portfolio links.

## 📄 Resume

[Resume Link] (See `links` in database or UI for active links)

## ⚠️ Known Limitations
- Search is naive (case-insensitive substring match).
- No authentication implemented for write operations (playground mode).
