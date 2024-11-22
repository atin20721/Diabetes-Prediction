import Database from 'better-sqlite3';

const db = new Database('diabetes.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    mobile TEXT NOT NULL,
    age INTEGER NOT NULL,
    glucose REAL NOT NULL,
    blood_pressure REAL NOT NULL,
    insulin REAL NOT NULL,
    bmi REAL NOT NULL,
    diabetes_pedigree REAL NOT NULL,
    pregnancies INTEGER NOT NULL,
    skin_thickness REAL NOT NULL,
    risk_level TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const insertPatient = db.prepare(`
  INSERT INTO patients (
    name, address, mobile, age, glucose, blood_pressure, insulin, 
    bmi, diabetes_pedigree, pregnancies, skin_thickness, risk_level
  ) VALUES (
    @name, @address, @mobile, @age, @glucose, @bloodPressure, @insulin,
    @bmi, @diabetesPedigree, @pregnancies, @skinThickness, @riskLevel
  )
`);

export const getPatientsByMobile = db.prepare(`
  SELECT * FROM patients WHERE mobile = ?
`);

export default db;