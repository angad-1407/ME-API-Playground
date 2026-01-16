# Deployment Guide

This guide outlines how to deploy the **Candidate Profile Playground** application. Since the app is split into a **frontend** (Vite + React) and a **backend** (Node + Express + Prisma), we will deploy them as two separate services.

## Prerequisites

1.  **GitHub Repo**: Ensure your code is pushed to GitHub (you have already done this).
2.  **Accounts**:
    *   [Vercel](https://vercel.com/) (for Frontend)
    *   [Render](https://render.com/) (for Backend)

---

## Part 1: Backend Deployment (Render)

We will deploy the Node.js backend to Render.

1.  **Log in to Render** and go to your Dashboard.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository (`ME-API-Playground`).
4.  Configure the service:
    *   **Name**: `predusk-backend` (or similar)
    *   **Region**: Choose one close to you.
    *   **Branch**: `main`
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
        *   (This installs dependencies and compiles TypeScript to JavaScript)
    *   **Start Command**: `npm start`
        *   (This runs `node dist/server.js`)
5.  **Environment Variables**:
    *   Scroll down to permissions/env vars.
    *   If you simply want to run with SQLite (Note: Data will reset on every deployment/restart because Render disks are ephemeral in the free tier), you don't need extra env vars for the DB yet.
    *   *Recommendation*: For production persistence, create a PostgreSQL database on Render and set `DATABASE_URL` here, then update your `schema.prisma` to use `postgresql` provider.
6.  Click **Create Web Service**.
7.  Wait for the build to finish. Once live, copy the **onrender.com URL** (e.g., `https://predusk-backend.onrender.com`). You will need this for the frontend.

---

## Part 2: Frontend Deployment (Vercel)

We will deploy the Vite frontend to Vercel.

1.  **Log in to Vercel** and click **Add New ...** -> **Project**.
2.  Import your GitHub repository (`ME-API-Playground`).
3.  Configure the project:
    *   **Framework Preset**: `Vite` (should detect automatically).
    *   **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    *   Expand the Environment Variables section.
    *   Key: `VITE_API_URL`
    *   Value: Your Backend URL from Part 1 (e.g., `https://predusk-backend.onrender.com`).
        *   *Note: Do not add a trailing slash `/`.*
5.  Click **Deploy**.
6.  Vercel will build and deploy your site. Once done, you will get a live URL (e.g., `https://me-api-playground.vercel.app`).

---

## Important Notes

*   **Database Persistence**: The current setup uses SQLite (`dev.db`). On platforms like Render (free tier) or Heroku, the filesystem is **ephemeral**. This means every time you deploy or the server restarts, your database will be wiped/reset.
    *   **Fix**: Switch to a PostgreSQL database (Neon.tech or Render Postgres) for persistent data.
*   **CORS**: The backend is currently configured to accept requests from any origin (`app.use(cors())`). This is fine for a playground, but for production, you might want to restrict this to your specific frontend domain.
