-- use that command in the terminal to update schema
-- psql -d bmttools -a -f schema.sql

DROP TABLE IF EXISTS "companies" CASCADE;

CREATE TABLE companies (
  id SERIAL NOT NULL PRIMARY KEY,
  company_name VARCHAR(30) NOT NULL,
  street_1 VARCHAR(25),
  street_2 VARCHAR(25),
  city VARCHAR(25),
  zip_code VARCHAR(15),
  state VARCHAR(15),
  website VARCHAR(25)
);

DROP TABLE IF EXISTS "departments" CASCADE;

CREATE TABLE departments (
  id SERIAL NOT NULL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  division VARCHAR(255),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

DROP TABLE IF EXISTS "employees" CASCADE;

CREATE TABLE employees (
  id SERIAL NOT NULL PRIMARY KEY,
  company_id INTEGER NOT NULL,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  preferred_name VARCHAR(15),
  dob VARCHAR(25),
  ssn VARCHAR(11),
  gender VARCHAR(6),
  street_1 VARCHAR(25),
  street_2 VARCHAR(25),
  city VARCHAR(255),
  zip_code VARCHAR(15),
  state VARCHAR(15),
  email VARCHAR(25) NOT NULL,
  phone_number VARCHAR(15),
  linkedin_url VARCHAR(25),
  position VARCHAR(50),
  employee_status VARCHAR(10),
  start_date VARCHAR(25),
  department VARCHAR(25),
  division VARCHAR(25),
  reports_to INTEGER,
  wage MONEY,
  pay_per VARCHAR(20),
  pay_type VARCHAR(10),
  is_manager boolean,
  pw VARCHAR(50) NOT NULL,
  profilepicid VARCHAR(250),
  personal_email VARCHAR(25) NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (reports_to) REFERENCES employees(id)
);

DROP TABLE IF EXISTS "contracts" CASCADE;

CREATE TABLE contracts (
  id SERIAL NOT NULL PRIMARY KEY,
  awarded_to INTEGER NOT NULL,
  company_id INTEGER NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  contract_name VARCHAR(255) NOT NULL,
  contract_amount MONEY NOT NULL,
  contract_start_date VARCHAR(30) NOT NULL,
  contract_end_date VARCHAR(30) NOT NULL,
  contract_desc VARCHAR(255),
  FOREIGN KEY (awarded_to) REFERENCES employees(id),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

DROP TABLE IF EXISTS "schedules" CASCADE;

CREATE TABLE schedules (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  start VARCHAR(100),
  finish VARCHAR(100),
  month VARCHAR(10),
  year INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES employees(id)
);

INSERT INTO companies (company_name, street_1, street_2, city, zip_code, state, website) VALUES ('Hack Reactor', '369 Lexington Ave', 'Floor 11', 'New York', '10017', 'NY', 'www.hackreactor.com');

INSERT INTO departments (company_id, name, division) VALUES (1, 'Marketing', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Sales', 'West Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Marketing', 'East Coast');
INSERT INTO departments (company_id, name, division) VALUES (1, 'Sales', 'East Coast');

INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Christopher', 'Rigoli', 'Chris', '11/4/85', '111-11-1111', 'male', '2268 31st Street', '', 'Astoria', '11105', 'NY', 'chris@hr.com', '123-123-1234', 'www.linkedin.com', 'CEO', 'Employed',
  'today', 'Sales', 'East Coast', 1, '$100,000', 'Week', 'Salary', true, 'password', 'bzebfxzakmy6mm3kmquo', 'chris123@fakemail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Artem', 'Ipatev', 'Arty', '01/12/93', '111-11-1111', 'male', '217 W 18th Street', '', 'New York', '10011', 'NY', 'artem@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 1, '$100,000', 'Week', 'Salary', true, 'password', 'bzebfxzakmy6mm3kmquo', 'artem123@fakemail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Janelle', 'De la Cruz', 'Jay', '11/4/91', '111-11-1111', 'female', '406 6th Ave', 'Apt 23', 'New York', '10011', 'NY', 'janelle@hr.com', '123-123-1234', 'www.linkedin.com', 'Office Manager', 'Employed',
  'today', 'Sales', 'East Coast', 2, '$60,000', 'Every other week', 'Salary', false, 'password', 'drsvmtxrfuqitwybzlnf', 'janelle@fakemail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Brent', 'Hagen', 'Brenty', '06/15/84', '111-11-1111', 'male', '875 Tree St', '', 'Astoria', '11105', 'NY', 'Brent@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 2, '$100,000', 'Week', 'Salary', true, 'password', 'bzebfxzakmy6mm3kmquo', 'brent@fakemail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Aloralyn', 'Ayran', 'Lyn', '11/16/88', '111-11-1111', 'female', '123 Troutman Street', '', 'Brooklyn',  '11221', 'NY','Aloralyn@hr.com', '123-123-1234', 'www.linkedin.com', 'Developer', 'Employed',
  'today', 'Sales', 'East Coast', 3, '$100,000', 'Week', 'Salary', true, 'password', 'drsvmtxrfuqitwybzlnf', 'aloralyn@fakemail.com');

INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Sheryll', 'Mercia', 'Shery','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','sherry@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','2','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','sherry@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Laci', 'Allen', 'Lacya','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','lacya@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','2','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','lacya@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Irene','Chanel','Irene','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','irene@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','2','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','irene@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Bernard','Dawn','Bernard','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','berny@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','2','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','berny@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Frona','Joella','Frona','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','frona@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','4','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','frona@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Codie','Clancy','Codie','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','codie@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','4','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','codie@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Jeremiah','Sophy','Jeremiah','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','jeremiah@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','4','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','jeremiah@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Sloan','Starla','Sloan','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','sloan@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','4','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','sloan@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Fallon','Acacia','Fallon','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','fallon@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','4','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','fallon@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Gayla','Bridget','Gayla','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','gayla@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','5','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','gayla@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Quinlan','Kerrie','Quinlan','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','quinlan@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','5','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','quinlan@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Teddy','Jonathan','Teddy','January 1, 1990','12345678','Male','1st Street 6540','4st Street 6540','New York City','10101','NY','teddy@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','5','45000','year','Salary',false,1,'bzebfxzakmy6mm3kmquo','teddy@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Wanda','Delia','Wanda','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','wanda@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','5','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','wanda@gmail.com');
INSERT INTO employees
(company_id, first_name, last_name, preferred_name, dob, ssn, gender, street_1, street_2, city, zip_code, state, email, phone_number,
  linkedin_url, position, employee_status, start_date, department, division, reports_to, wage, pay_per, pay_type, is_manager, pw, profilePicId, personal_email)
  VALUES (1, 'Jeffry','Britannia','Jeffry','January 1, 1990','12345678','Female','1st Street 6540','4st Street 6540','New York City','10101','NY','jeff@gmail.com','646-1232-5590','www.linkedin.com','Developer','Employed','January 5, 2018','Sales','East Coast','5','45000','year','Salary',false,1,'drsvmtxrfuqitwybzlnf','jeff@gmail.com');


INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (1, 1, 'Jerry', 'JS Immersive_Jerry', '$17,000', '2018-01-15', '2018-04-13', 'sample contract description');
INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (2, 1, 'Eric', 'JS Immersive_Eric', '$15,000', '2018-01-19', '2018-04-27', 'another sample contract description');
INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (3, 1, 'Xixi', 'JS Immersive_Xixi', '$19,000', '2018-01-15', '2018-05-01', 'another sample contract description again');
INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (4, 1, 'Adam', 'JS Immersive_Adam', '$21,000', '2018-01-19', '2018-06-15', 'another sample contract description and once more for good luck');
INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (4, 1, 'Markus', 'JS Immersive_Markus', '$41,000', '2018-01-29', '2018-06-15', 'another sample contract description and once more for good luck');
INSERT INTO contracts (awarded_to, company_id, client_name, contract_name, contract_amount, contract_start_date, contract_end_date, contract_desc) VALUES (4, 1, 'Rory', 'JS Immersive_Rory', '$11,000', '2018-01-12', '2018-06-15', 'another sample contract description and once more for good luck');

insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (1, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (2, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (3, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (4, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (5, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (6, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (7, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (8, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (9, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (10, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (11, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (12, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (13, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (14, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (15, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (16, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (17, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (18, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);

insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-19T09:00:00-04:00', '2018-03-19T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-20T09:00:00-04:00', '2018-03-20T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-21T09:00:00-04:00', '2018-03-21T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-22T09:00:00-04:00', '2018-03-22T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-23T09:00:00-04:00', '2018-03-23T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-26T09:00:00-04:00', '2018-03-26T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-27T09:00:00-04:00', '2018-03-27T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-28T09:00:00-04:00', '2018-03-28T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-29T09:00:00-04:00', '2018-03-29T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-03-30T09:00:00-04:00', '2018-03-30T17:00:00-04:00', 'Mar', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-02T09:00:00-04:00', '2018-04-02T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-03T09:00:00-04:00', '2018-04-03T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-04T09:00:00-04:00', '2018-04-04T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-05T09:00:00-04:00', '2018-04-05T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-06T09:00:00-04:00', '2018-04-06T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-09T09:00:00-04:00', '2018-04-09T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-10T09:00:00-04:00', '2018-04-10T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-11T09:00:00-04:00', '2018-04-11T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-12T09:00:00-04:00', '2018-04-12T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-13T09:00:00-04:00', '2018-04-13T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-16T09:00:00-04:00', '2018-04-16T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-17T09:00:00-04:00', '2018-04-17T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-18T09:00:00-04:00', '2018-04-18T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-19T09:00:00-04:00', '2018-04-19T17:00:00-04:00', 'Apr', 2018);
insert into schedules (user_id, start, finish, month, year) values (19, '2018-04-20T09:00:00-04:00', '2018-04-20T17:00:00-04:00', 'Apr', 2018);
