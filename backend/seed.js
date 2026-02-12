const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

async function seed() {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, 'database.sqlite');

  let db;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
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
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company_id INTEGER,
      employment_type TEXT,
      experience TEXT,
      image TEXT,
      FOREIGN KEY (company_id) REFERENCES companies(id)
    )
  `);

  db.run('DELETE FROM jobs');
  db.run('DELETE FROM companies');
  db.run('DELETE FROM users');

  db.run(
    'INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
    ['User', 'One', 'xmrimode@gmail.com', null, '123456', 'developer']
  );
  db.run(
    'INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
    ['Don', 'Thompson', 'Dt.donthompson@gmail.com', null, '123456', 'Employee']
  );

  const companies = [
    ['Weblinx Solution', 'Leading provider of high-quality glass solutions for homes and businesses.', '/images/Weblinx Solution-company.png'],
    ['Demo Ten', 'We are a technology-driven company providing innovative IT solutions that empower business.', '/images/Demo Ten-company.jpg'],
    ['John Doe', 'I am an employer and I hire talented individuals', '/images/John Doe-company.jpg'],
    ['Alex Connor', 'Innovative solutions for modern businesses', '/images/Alex Connor-company.webp'],
    ['Eagan Dalton', 'Technology and innovation company', '/images/Eagan Dalton-company.webp'],
    ['Mohsin Employer', 'Growing tech company seeking talent', '/images/Mohsin Employer-company.png'],
    ['DONALD THOMPSON', 'Professional staffing solutions', '/images/DONALD THOMPSON-company.jpg'],
    ['VPN Alex Connor', 'Web development and consulting', '/images/Weblinx Solution-company.png'],
  ];

  const companyStmt = db.prepare('INSERT INTO companies (name, description, image) VALUES (?, ?, ?)');
  companies.forEach((c) => {
    companyStmt.run(c);
  });
  companyStmt.free();

  const result = db.exec('SELECT id, name FROM companies');
  const companyMap = {};
  if (result[0]) {
    result[0].values.forEach((row) => {
      companyMap[row[1]] = row[0];
    });
  }

  const jobs = [
    ['Designers', companyMap['Weblinx Solution'] || 1, 'Full Time/Permanent', '3 Year', '/images/designer-job.jpg'],
    ['Weight Loss', companyMap['Demo Ten'] || 2, 'Contract', '4 months', '/images/weight-job.jpg'],
    ['Plumber', companyMap['Weblinx Solution'] || 1, 'Full-time', '3 Year', '/images/plumber-job.jpg'],
    ['Web Development', companyMap['VPN Alex Connor'] || 8, 'Full-time', '5 Years', '/images/web development-job.jpeg'],
    ['Full Stack Developer', companyMap['Eagan Dalton'] || 5, 'Full-time', '3 Year', '/images/fullstack developer-job.webp'],
    ['Frontend developer', companyMap['Eagan Dalton'] || 5, 'Full-time', '3 Year', '/images/frontend-developer-job.webp'],
    ['Devops Engineer', companyMap['Mohsin Employer'] || 6, 'Full-time', '3 Year', '/images/devops-engineer-job.png'],
    ['MRI Technician', companyMap['DONALD THOMPSON'] || 7, 'Full-time', 'Entry', '/images/Mri-job.png'],
  ];

  const jobStmt = db.prepare('INSERT INTO jobs (title, company_id, employment_type, experience, image) VALUES (?, ?, ?, ?, ?)');
  jobs.forEach((j) => jobStmt.run(j));
  jobStmt.free();

  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
  db.close();

  console.log('Database seeded successfully!');
  console.log('Users: xmrimode@gmail.com (developer), Dt.donthompson@gmail.com (Employee)');
}

seed().catch(console.error);
