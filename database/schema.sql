-- When you run this file, use this command in your terminal: psql -d bmttools -a -f schema.sql

DROP DATABASE IF EXISTS bmttools;

CREATE DATABASE bmttools;

\c bmttools;

CREATE TABLE companies (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE departments (
  id SERIAL NOT NULL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  division VARCHAR(255) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE employees (
  id SERIAL NOT NULL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  preferred_name VARCHAR(255) NOT NULL,
  dob VARCHAR(255) NOT NULL,
  ssn VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  street_1 VARCHAR(255) NOT NULL,
  street_2 VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  zip_code VARCHAR(15) NOT NULL,
  state VARCHAR(25) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  linkedin_url VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  employee_status VARCHAR(25) NOT NULL,
  start_date VARCHAR(25) NOT NULL,
  department VARCHAR(255) NOT NULL,
  division VARCHAR(255) NOT NULL,
  reports_to VARCHAR(255) NOT NULL,
  wage MONEY NOT NULL,
  pay_per VARCHAR(255) NOT NULL,
  pay_type VARCHAR(255) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
