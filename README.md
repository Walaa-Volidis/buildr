# Buildr

**Monorepo**

A simple project management app to track projects, tasks, and team workload.

## What's Inside

This is a monorepo with two main parts:

**Frontend** - Next.js app with TypeScript and Tailwind CSS  
**Backend** - Express API with Prisma and PostgreSQL (neon)

## Running with Docker (Easiest Way)

If you have Docker installed, just run this:

```bash
docker-compose up -d
```

That's it! Docker will start:

- PostgreSQL database on port 5432
- Backend API on port 4000
- Frontend app on port 3000

Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop everything:

```bash
docker-compose down
```

## Running Locally (Without Docker)

You'll need Node.js 18+ and a PostgreSQL database.

**1. Clone the repo**

```bash
git clone https://github.com/Walaa-Volidis/vznx-challenge.git
cd vznx-challenge
```

**2. Setup Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your DATABASE_URL
npm run prisma:migrate
npm run dev
```

Backend runs on http://localhost:4000

**3. Setup Frontend** (in a new terminal)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env and add NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

Frontend runs on http://localhost:3000

## Frontend Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - For type safety
- **Tailwind CSS** - For styling
- **shadcn/ui** - UI components
- **Zod** - Validation

## Backend Stack

- **Express** - Node.js web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Request validation
- **ES Modules** - Modern JavaScript

## Features

- Create and manage projects
- Add tasks to projects
- Assign tasks to team members
- Track project progress automatically
- View team workload

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

Live at: [https://www.vznx.walaavolidis.com](https://www.vznx.walaavolidis.com)

## Author

Walaa Volidis
