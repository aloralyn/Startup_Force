DROP TABLE IF EXISTS "companies";

CREATE TABLE companies (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS "departments";

CREATE TABLE departments (
  id SERIAL NOT NULL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  division VARCHAR(255) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

DROP TABLE IF EXISTS "employees";

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
  is_manager boolean,
  pw VARCHAR(255) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

INSERT INTO companies (name, address) VALUES ('Hack Reactor', '369 Lexington');
INSERT INTO companies (name, address) VALUES ('CodingCo', '1001 6th Avenue');

INSERT INTO departments (company_id, name, division) VALUES (1, 'Marketing', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Sales', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Marketing', 'East Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Sales', 'East Coast');

INSERT INTO departments (company_id, name, division) VALUES (2, 'Marketing', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (2, 'Sales', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (2, 'Marketing', 'East Coast');
INSERT INTO departments (company_id, name, division) VALUES (2, 'Sales', 'East Coast');

INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, pw)
  VALUES (1, 'Christopher', 'Rigoli', 'Chris', '11/4', '111-11-1111', 'male', '875 Tree St', '', 'Somewhere', 'NY', '10001', 'chris@hr.com', '123-123-1234', 'www.linkedin.com', 'CEO', 'Employed',
  'today', 'Sales', 'East Coast', 'No One', '$100,000', 'Week', 'Salary', 'password');

INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, pw)
  VALUES (1, 'Artem', 'Ipatev', 'Arty', '11/4', '111-11-1111', 'male', '875 Tree St', '', 'Somewhere', 'NY', '10001', 'artem@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 'No One', '$100,000', 'Week', 'Salary', 'password');

INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, pw)
  VALUES (1, 'Brent', 'Hagen', 'Brenty', '11/4', '111-11-1111', 'male', '875 Tree St', '', 'Somewhere', 'NY', '10001', 'Brent@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 'No One', '$100,000', 'Week', 'Salary', 'password');

  INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, pw)
  VALUES (1, 'Aloralyn', 'Ayran', 'Lyn', '11/4', '111-11-1111', 'female', '875 Tree St', '', 'Somewhere', 'NY', '10001', 'Aloralyn@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 'No One', '$100,000', 'Week', 'Salary', 'password');

