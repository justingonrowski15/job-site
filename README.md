# Zenith Staff Source - Job Site

A job staffing website built with Next.js (frontend), Node.js (backend), and SQLite (database).

## Prerequisites

- Node.js 18+
- npm

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Seed the database** (creates database with pre-populated users and data):
   ```bash
   cd backend && npm run seed
   ```

## Running the Application

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately in two terminals:

**Terminal 1 - Backend (port 3001):**
```bash
cd backend && npm run dev
```

**Terminal 2 - Frontend (port 3000):**
```bash
cd frontend && npm run dev
```

Then open http://localhost:3000 in your browser.

## Pre-seeded Users

| Role     | Email                     | Password |
|----------|---------------------------|----------|
| developer | xmrimode@gmail.com       | 123456   |
| Employee | Dt.donthompson@gmail.com | 123456   |

## Pages

- **Home** - Hero, Employee Flow, Admin Flow, Features, Testimonials, FAQs
- **Jobs** - Job search and listings
- **Companies** - Partner companies directory
- **About Us** - Company information
- **Login** - Employee/Employer login
- **Register** - New user registration

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Node.js, Express
- **Database:** SQL.js (SQLite compiled to JavaScript - no native dependencies)
