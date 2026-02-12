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
  db.run('DROP TABLE IF EXISTS jobs');
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

  const designerDesc = `A Designer plays a vital role in shaping the visual identity of a brand or product. They create user-focused designs for digital and print materials, ensuring consistency and appeal across all touchpoints. Designers collaborate closely with marketing, product, and development teams to deliver high-quality visuals for campaigns, websites, and user interfaces.`;
  const designerSkills = JSON.stringify([
    'Proficiency in tools like Adobe Photoshop, Illustrator, Figma, or Canva.',
    'Strong sense of aesthetics, layout, and color balance.',
    'Understanding of UX/UI principles is a plus.',
    'Ability to work under tight deadlines and handle multiple projects.',
    'Excellent communication and teamwork skills.',
    "Bachelor's degree in Graphic Design, Visual Arts, or a related field (preferred).",
  ]);
  const designerBenefits = JSON.stringify([
    { title: 'Competitive salary', desc: 'with performance-based incentives.', icon: 'salary' },
    { title: 'Flexible working hours', desc: 'and hybrid work options.', icon: 'flexible' },
    { title: 'Creative freedom', desc: 'to bring your ideas to life.', icon: 'creative' },
    { title: 'Continuous learning', desc: 'through workshops and design tools access.', icon: 'learning' },
    { title: 'Paid time off', desc: 'and annual leaves.', icon: 'pto' },
    { title: 'Collaborative environment', desc: 'with exposure to diverse projects and clients.', icon: 'collab' },
    { title: 'Career growth opportunities', desc: 'within a supportive creative team.', icon: 'career' },
  ]);

  const jobs = [
    ['Designers', companyMap['Weblinx Solution'] || 1, 'Full Time/Permanent', '3 Year', '/images/designer-job.jpg',
      '4 STAR HOTEL - beside DIP - Green Community Village - Dubai - United Arab Emirates',
      'Farm House', 'morning', 'Experienced', '6', 'Intermediate', 'October 29, 2025', 'October 25, 2025',
      designerDesc, designerSkills, designerBenefits],
    ['Weight Loss', companyMap['Demo Ten'] || 2, 'Contract', '4 months', '/images/weight-job.jpg', null, null, null, null, null, null, null, null, null, null, null],
    ['Plumber', companyMap['Weblinx Solution'] || 1, 'Full-time', '3 Year', '/images/plumber-job.jpg', null, null, null, null, null, null, null, null, null, null, null],
    ['Web Development', companyMap['VPN Alex Connor'] || 8, 'Full-time', '5 Years', '/images/web development-job.jpeg', null, null, null, null, null, null, null, null, null, null, null],
    ['Full Stack Developer', companyMap['Eagan Dalton'] || 5, 'Full-time', '3 Year', '/images/fullstack developer-job.webp', null, null, null, null, null, null, null, null, null, null, null],
    ['Frontend developer', companyMap['Eagan Dalton'] || 5, 'Full-time', '3 Year', '/images/frontend-developer-job.webp', null, null, null, null, null, null, null, null, null, null, null],
    ['Devops Engineer', companyMap['Mohsin Employer'] || 6, 'Full-time', '3 Year', '/images/devops-engineer-job.png', null, null, null, null, null, null, null, null, null, null, null],
    ['MRI Technician', companyMap['DONALD THOMPSON'] || 7, 'Full-time', 'Entry', '/images/Mri-job.png', null, null, null, null, null, null, null, null, null, null, null],
  ];

  const jobStmt = db.prepare(`INSERT INTO jobs (title, company_id, employment_type, experience, image,
    location, work_location, shift, career_level, positions, degree, apply_before, date_posted, description, skills, benefits)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  jobs.forEach((j) => jobStmt.run(j));
  jobStmt.free();

  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
  db.close();

  console.log('Database seeded successfully!');
  console.log('Users: xmrimode@gmail.com (developer), Dt.donthompson@gmail.com (Employee)');
}

seed().catch(console.error);
