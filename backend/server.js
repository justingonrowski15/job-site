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

app.get('/api/jobs', (req, res) => {
  const result = db.exec(`
    SELECT j.id, j.title, j.employment_type, j.experience, j.image, c.name as company_name
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
  })) : [];
  res.json(jobs);
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
