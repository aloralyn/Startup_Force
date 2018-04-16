# StartupForce

<img src="https://drive.google.com/uc?export=view&id=1JdKCI7_mXIgxuyNgxBvlXpEtO2HRwqUp" width="800" height="450">

StartupForce is a fullstack Javascript web application that provides tools to assist small businesses in the management of day-to-day operations.

StartupForce uses React/Redux, NodeJS, and PostgreSQL and Firebase databases.

When employees log in, they see their schedule for the week.  Managers can adjust the schedules of employees they manage.

<img src="https://drive.google.com/uc?export=view&id=1UD9lMDKqyoDwbYf_z962nUXsfdq9V2zn" width="800" height="450">

Employees can send direct messages to each other, and receive notifications when they have unread messages.

<img src="https://drive.google.com/uc?export=view&id=1GiQj5p0k4vTc9XVXgG9Hm4xZpXPDZxHN" width="800" height="450">

Managers can onboard new employees to the company, and track contracts and revenue with data analytics.


## To work with the StartupForce codebase:
This application requires a Postgres database, a Firebase real-time database, and a Cloudinary account for photo upload.

### Step 1
Fork and clone down the repo.

### Step 2
Run npm install to get the node modules required to run the application.

```sh
$ npm install
```

### Step 3
Create a Postgres database 'bmt', from the Postgres CLI:

```sh
\c bmt
```

For a handy Postgres command cheat sheet, see:
https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

### Step 4
Run the repo schema file to create tables and populate with dummy data:

```sh
$ psql -d bmttools -a -f schema.sql
```
### Step 5

Create a file 'config.js' within the 'server' folder and include the following:

```js
module.exports = {
  cloudName: '/* your Cloudinary account name */',
  uploadPreset: '/* your Cloudinary upload preset */',
  pgUser: '/* your local username */',
  pgHost: 'localhost',
  pgPassword: '',
  pgDatabase: 'bmt',
  pgPort: 5432
}
```
### Step 6

Within client/src/firebase.js, change the config settings to reflect your firebase real-time database account information:

```js
const config = {
  apiKey: "/* your API key */",
  authDomain: /* your firebase project id */ + ".firebaseapp.com",
  databaseURL: "https://" + /* your firebase project id */ + ".firebaseio.com",
  projectId: "" + /* your firebase project id */+ "",
  storageBucket: ""
};
```

### Step 7
Run the following to start the server and build the webpack:

```sh
$ npm run server-dev
$ npm run react-dev
```
### Enjoy!
