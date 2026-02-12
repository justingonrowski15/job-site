const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = process.env.PORT || 3001;
const dbPath = path.join(__dirname, 'database.sqlite');

let db;

async function initDb() {
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'developer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.run(`
      CREATE TABLE companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT
      )
    `);
    db.run(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company_id INTEGER,
        employment_type TEXT,
        experience TEXT,
        image TEXT,
        location TEXT,
        work_location TEXT,
        shift TEXT,
        career_level TEXT,
        positions TEXT,
        degree TEXT,
        apply_before TEXT,
        date_posted TEXT,
        description TEXT,
        skills TEXT,
        benefits TEXT,
        FOREIGN KEY (company_id) REFERENCES companies(id)
      )
    `);
    saveDb();
  }
}

function saveDb() {
  if (db) {
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  }
}

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const stmt = db.prepare('SELECT id, email, first_name, last_name, role, password FROM users WHERE email = ?');
  stmt.bind([email]);
  if (!stmt.step()) {
    stmt.free();
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const user = stmt.getAsObject();
  stmt.free();
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'First name, last name, email and password required' });
  }
  let stmt = db.prepare('SELECT id FROM users WHERE email = ?');
  stmt.bind([email]);
  if (stmt.step()) {
    stmt.free();
    return res.status(400).json({ error: 'Email already registered' });
  }
  stmt.free();
  const userRole = role || 'developer';
  stmt = db.prepare('INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run([firstName, lastName, email, phone || null, password, userRole]);
  stmt.free();
  saveDb();
  stmt = db.prepare('SELECT id, email, first_name, last_name, role FROM users WHERE email = ?');
  stmt.bind([email]);
  stmt.step();
  const user = stmt.getAsObject();
  stmt.free();
  res.status(201).json({ user });
});

app.get('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid job ID' });
  try {
    let row;
    try {
      const stmt = db.prepare(`
        SELECT j.id, j.title, j.employment_type, j.experience, j.image,
               j.location, j.work_location, j.shift, j.career_level, j.positions, j.degree,
               j.apply_before, j.date_posted, j.description, j.skills, j.benefits,
               c.name as company_name, c.id as company_id
        FROM jobs j
        LEFT JOIN companies c ON j.company_id = c.id
        WHERE j.id = ?
      `);
      stmt.bind([id]);
      if (!stmt.step()) {
        stmt.free();
        return res.status(404).json({ error: 'Job not found' });
      }
      row = stmt.getAsObject();
      stmt.free();
    } catch (schemaErr) {
      const stmt = db.prepare(`
        SELECT j.id, j.title, j.employment_type, j.experience, j.image,
               c.name as company_name, j.company_id
        FROM jobs j
        LEFT JOIN companies c ON j.company_id = c.id
        WHERE j.id = ?
      `);
      stmt.bind([id]);
      if (!stmt.step()) {
        stmt.free();
        return res.status(404).json({ error: 'Job not found' });
      }
      const base = stmt.getAsObject();
      stmt.free();
      row = { ...base, location: null, work_location: null, shift: null, career_level: null, positions: null, degree: null, apply_before: null, date_posted: null, description: null, skills: null, benefits: null };
    }
    res.json(row);
  } catch (err) {
    console.error('GET /api/jobs/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

app.get('/api/jobs', (req, res) => {
  const result = db.exec(`
    SELECT j.id, j.title, j.employment_type, j.experience, j.image, c.name as company_name, j.company_id
    FROM jobs j
    LEFT JOIN companies c ON j.company_id = c.id
    ORDER BY j.id
  `);
  const jobs = result[0] ? result[0].values.map((row) => ({
    id: row[0],
    title: row[1],
    employment_type: row[2],
    experience: row[3],
    image: row[4],
    company_name: row[5],
    company_id: row[6],
  })) : [];
  res.json(jobs);
});

app.get('/api/companies/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid company ID' });
  try {
    const companyStmt = db.prepare('SELECT id, name, description, image FROM companies WHERE id = ?');
    companyStmt.bind([id]);
    if (!companyStmt.step()) {
      companyStmt.free();
      return res.status(404).json({ error: 'Company not found' });
    }
    const cRow = companyStmt.getAsObject();
    companyStmt.free();
    const company = { id: cRow.id, name: cRow.name, description: cRow.description, image: cRow.image };

    const jobsStmt = db.prepare(`
      SELECT j.id, j.title, j.employment_type, j.experience, j.image, j.location, j.description
      FROM jobs j
      WHERE j.company_id = ?
      ORDER BY j.id
    `);
    jobsStmt.bind([id]);
    const jobs = [];
    while (jobsStmt.step()) {
      const row = jobsStmt.getAsObject();
      jobs.push({ id: row.id, title: row.title, employment_type: row.employment_type, experience: row.experience, image: row.image, location: row.location, description: row.description });
    }
    jobsStmt.free();

    res.json({ ...company, jobs, member_since: 'October 2025', email_verified: false, established_in: '2025' });
  } catch (err) {
    console.error('GET /api/companies/:id error:', err);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

app.get('/api/companies', (req, res) => {
  const result = db.exec('SELECT id, name, description, image FROM companies ORDER BY name');
  const companies = result[0] ? result[0].values.map((row) => ({
    id: row[0],
    name: row[1],
    description: row[2],
    image: row[3],
  })) : [];
  res.json(companies);
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
  });
