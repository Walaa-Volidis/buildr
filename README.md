# VZNX Challenge - Project Management Platform

A minimal, functional prototype for architecture studios to manage projects and teams.

## 🎯 Project Overview

This application provides three core features:

1. **Project Dashboard** - Manage projects with progress tracking
2. **Task Management** - Create and track tasks within projects
3. **Team Overview** - Monitor team workload and capacity

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui (built on Radix UI)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose

## 📋 Features Implemented

### ✅ Project Dashboard

- View all projects in a card-based layout
- **Add new projects** with automatic "In Progress" status
- **Edit project progress** manually (0-100%)
- **Delete projects** with confirmation
- Display project status, progress bar, and task counts
- **Bonus**: Auto-update project progress when all tasks are complete

### ✅ Task List (Inside Each Project)

- Click on any project to view its tasks
- **Add tasks** with optional team member assignment
- **Toggle task completion** with visual feedback (checkbox + strikethrough)
- Task completion automatically updates parent project progress
- Delete tasks with automatic progress recalculation
- Clean UI with completed tasks visually distinguished

### ✅ Team Overview

- Display all team members with their assigned tasks
- Show **task count** for each member
- **Capacity bar** visualization (5 tasks = 100% capacity)
- **Color-coded workload levels**:
  - 🟢 Green (0-2 tasks): Light Load
  - 🟠 Orange (3-4 tasks): Moderate Load
  - 🔴 Red (5+ tasks): At Capacity
- Add new team members
- View active tasks per team member

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** (Recommended) OR
- **Node.js 18+** and **PostgreSQL** (Manual setup)

---

## 🐳 Quick Start with Docker (Recommended)

The easiest way to run the entire application with a database:

### 1. **Start the Application**

```bash
docker-compose up --build
```

This will:

- ✅ Start PostgreSQL database (port 5432)
- ✅ Build your Next.js application
- ✅ Run database migrations automatically
- ✅ Start the server on http://localhost:3000

### 2. **Stop the Application**

```bash
# Stop containers
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

### 3. **View Logs**

```bash
# All logs
docker-compose logs -f

# App logs only
docker-compose logs -f app
```

That's it! Your app is running at **http://localhost:3000** 🎉

---

## 💻 Manual Setup (Without Docker)

If you prefer to run without Docker:

### Prerequisites

- Node.js 18+ installed
- A Neon database account (or local PostgreSQL)

### Step-by-Step Setup

#### 1. **Database Configuration**

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Update `.env` with your database URL:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
NODE_ENV="development"
```

For Neon Database:

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy your connection string

#### 2. **Install Dependencies**

```bash
npm install
```

#### 3. **Initialize Database**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### 4. **Run the Development Server**

```bash
npm run dev
```

The app will be available at:

- Primary: http://localhost:3000
- Alternative: http://localhost:3001 (if 3000 is in use)

## 🗄️ Database Schema

### Models

**Project**

- `id`: Unique identifier
- `name`: Project name
- `status`: "In Progress" or "Completed"
- `progress`: 0-100 percentage
- `tasks`: Related tasks

**Task**

- `id`: Unique identifier
- `name`: Task name
- `isComplete`: Boolean status
- `projectId`: Foreign key to Project
- `teamMemberId`: Optional foreign key to TeamMember

**TeamMember**

- `id`: Unique identifier
- `name`: Member name
- `tasks`: Related tasks

## 🎨 Key Features Explained

### Auto-Progress Calculation

When you toggle a task's completion status, the system:

1. Counts total tasks in the project
2. Counts completed tasks
3. Calculates percentage: `(completed / total) × 100`
4. Updates the project's progress automatically
5. Sets status to "Completed" if progress reaches 100%

### Capacity Visualization

The team page shows workload using a simple formula:

- **Capacity**: `(task_count / 5) × 100%`
- **Color Logic**:
  - Green: 0-2 tasks (healthy workload)
  - Orange: 3-4 tasks (moderate workload)
  - Red: 5+ tasks (at or over capacity)

## 🔧 API Endpoints

### Projects

- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get single project
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Tasks

- `GET /api/projects/[id]/tasks` - List project tasks
- `POST /api/projects/[id]/tasks` - Create task
- `PATCH /api/tasks/[taskId]` - Update task (toggle, assign)
- `DELETE /api/tasks/[taskId]` - Delete task

### Team

- `GET /api/team` - List all team members
- `POST /api/team` - Create team member

## 🎯 Usage Guide

### Creating Your First Project

1. Click "New Project" on the dashboard
2. Enter a project name
3. The project is created with 0% progress

### Adding Tasks

1. Click "View Tasks" on any project card
2. Click "Add Task" button
3. Enter task name
4. Optionally assign to a team member
5. Task appears in the list

### Completing Tasks

1. Click the checkbox next to any task
2. Task gets strikethrough styling
3. Project progress updates automatically
4. Status changes to "Completed" when all tasks are done

### Managing Team

1. Navigate to "Team" page
2. Click "Add Team Member"
3. View workload distribution
4. Assign tasks when creating them in projects

## 🎨 Design Choices

- **Minimal UI**: Clean, card-based design for clarity
- **Visual Feedback**: Color-coded status, progress bars, checkboxes
- **Auto-Updates**: Progress calculated automatically from task completion
- **Responsive**: Works on desktop and mobile devices
- **Type-Safe**: Full TypeScript for reliability

## 🚧 Future Enhancements

Potential improvements:

- Drag-and-drop task reordering
- Due dates and deadlines
- Task priorities
- Team member capacity limits
- Project filtering and search
- Dark mode toggle
- Real-time updates with WebSockets
- Analytics dashboard

## 📝 Development Notes

- Uses Next.js App Router for modern React patterns
- Server components for data fetching
- Client components for interactivity
- Prisma for type-safe database access
- shadcn/ui for consistent, accessible components

## 🐛 Troubleshooting

### Docker Issues

**Port Already in Use**

```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

**Database Connection Issues**

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs db

# Restart services
docker-compose restart
```

**Fresh Start**

```bash
# Remove all data and rebuild
docker-compose down -v
docker-compose up --build
```

**Build Cache Issues**

```bash
docker-compose build --no-cache
```

### Manual Setup Issues

**Database Connection Issues**

- Verify your `.env` DATABASE_URL is correct
- Ensure Neon database is active
- Run `npx prisma db push` to sync schema

**Port Already in Use**

- The app automatically uses port 3001 if 3000 is busy
- Or manually specify: `npm run dev -- -p 3002`

**Prisma Generate Errors**

- Run `npx prisma generate` after schema changes
- Delete `node_modules/.prisma` and regenerate

---

## 🐳 Docker Commands Reference

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Fresh start (removes data)
docker-compose down -v && docker-compose up --build

# Run Prisma commands
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma migrate deploy

# Access PostgreSQL CLI
docker-compose exec db psql -U postgres -d vznx_challenge
```

---

## 📦 Deployment

### Docker Production

```bash
# Build the image
docker build -t vznx-challenge:latest .

# Run with external database
docker run -p 3000:3000 \
  -e DATABASE_URL="your-production-database-url" \
  vznx-challenge:latest
```

### Vercel/Railway/Render

For platform deployment, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

**Environment Variables Required:**

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`

---

## 📁 Project Structure

```
vznx-challenge/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── projects/          # Project pages
│   └── team/              # Team page
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   ├── utils.ts          # Helper functions
│   └── validations.ts    # Zod schemas
├── prisma/               # Database
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration history
├── docker-compose.yml    # Docker orchestration
├── Dockerfile           # Production image
└── .env.example        # Environment template
```

#
