# 🚀 Phase 1: Backend Setup & Authentication Guide

This README documents the complete setup process for creating a Node.js backend with Express.js, MongoDB, and JWT Authentication.

---

# 📌 Project Structure

Create the main project folder and inside it create two folders:

```text
Project/
│
├── Backend/
└── Frontend/
```

The backend will contain the server-side code, while the frontend will contain the client-side application.

---

# 📦 Step 1: Initialize the Backend

Navigate to the Backend folder.

```bash
cd Backend
```

Initialize the Node.js project.

```bash
npm init -y
```

This command creates a `package.json` file that stores all project information and dependencies.

---

# 📦 Step 2: Install Required Packages

Install the required dependencies.

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser
```

Install Nodemon as a development dependency.

```bash
npm install --save-dev nodemon
```

### Packages Used

| Package | Purpose |
|----------|----------|
| Express | Backend Framework |
| Mongoose | MongoDB ODM |
| dotenv | Manage Environment Variables |
| bcryptjs | Password Hashing |
| jsonwebtoken | JWT Authentication |
| cookie-parser | Read Cookies |
| Nodemon | Auto Restart Server |

---

# ⚙️ Step 3: Configure package.json

Open the `package.json` file.

Replace the default script

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

with

```json
"scripts": {
    "dev": "nodemon index.js"
}
```

Now the backend can be started using

```bash
npm run dev
```

---

# 📁 Step 4: Create Project Structure

Create the following folders inside Backend.

```text
Backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

### Folder Purpose

| Folder | Description |
|----------|-------------|
| config | Database configuration |
| controllers | Business Logic |
| middleware | Authentication Middleware |
| models | Database Models |
| routes | API Routes |
| utils | Utility Functions |

---

# 🌍 Step 5: Create Environment Variables

Create a file named

```
.env
```

Store all sensitive information inside this file.

Example

```env
PORT=5000

MONGODB_URI=Your_MongoDB_Atlas_Connection_String

JWT_SECRET=YourSecretKey
```

### Why use .env?

- Keeps sensitive information secure.
- Makes changing configuration easier.
- Prevents exposing passwords in GitHub.

---

# 🗄️ Step 6: Setup MongoDB

You can use either

- MongoDB Atlas (Cloud)
- MongoDB Compass (Local)

## MongoDB Atlas Setup

1. Login to MongoDB Atlas.
2. Create a new Cluster.
3. Create a Database User.
4. Add your current IP Address under Network Access.
5. Click **Connect**.
6. Choose **Drivers**.
7. Select **Node.js**.
8. Copy the generated connection string.

It will look similar to:

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase
```

Replace

```
<password>
```

with your database password.

Paste the final connection string inside your `.env` file.

Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase
```

> **Important:** Avoid using a dot (`.`) in the database name.

---

# 🔌 Step 7: Configure Database Connection

Create a folder named

```
config
```

Inside it create

```
db.js
```

This file is responsible for connecting your application to MongoDB.

Whenever you need an environment variable, use

```javascript
process.env.VARIABLE_NAME
```

Example

```javascript
process.env.PORT

process.env.MONGODB_URI

process.env.JWT_SECRET
```

---

# 🚀 Step 8: Setup Express Server

Create

```
index.js
```

Import the required packages.

```javascript
express
dotenv
```

In this file you will

- Initialize Express
- Configure dotenv
- Connect Database
- Register Middleware
- Register Routes
- Start the Server

---

# 👤 Step 9: Create User Model

Navigate to

```
models/
```

Create

```
user.model.js
```

Inside this file create the User Schema.

Example fields

- Name
- Email
- Password
- Profile Picture (Optional)
- Created At
- Updated At

Finally export the model.

---

# 🔐 Step 10: Authentication Controller

Navigate to

```
controllers/
```

Create

```
auth.controller.js
```

This controller will contain the authentication logic.

Functions to create

- User Signup
- User Login
- User Logout

Required Packages

```javascript
bcryptjs

jsonwebtoken
```

Also import the JWT helper function from

```
utils/token.js
```

### Password Flow

```
User Password
      │
      ▼
Hash Password (bcrypt)
      │
      ▼
Store in MongoDB
```

### Login Flow

```
User Login
      │
      ▼
Compare Password
      │
      ▼
Generate JWT
      │
      ▼
Store JWT inside Cookie
```

---

# 🔑 Step 11: JWT Utility

Navigate to

```
utils/
```

Create

```
token.js
```

This file is responsible for

- Generating JWT Tokens
- Setting Cookies
- Using JWT Secret from `.env`

Example

```
process.env.JWT_SECRET
```

---

# 🌐 Step 12: Authentication Routes

Navigate to

```
routes/
```

Create

```
auth.route.js
```

Create the following routes.

| Method | Endpoint | Purpose |
|----------|----------|----------|
| POST | /signup | Register User |
| POST | /login | Login User |
| POST | /logout | Logout User |

Connect these routes with the controller functions.

---

# 📂 Final Backend Structure

```text
Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── auth.controller.js
│
├── middleware/
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── auth.route.js
│
├── utils/
│   └── token.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

---

# 📚 Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Compass
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cookie-parser
- Nodemon
- Visual Studio Code

---

# ✅ Phase 1 Checklist

- [x] Create Backend & Frontend folders
- [x] Initialize Node.js project
- [x] Install dependencies
- [x] Configure package.json
- [x] Create project folder structure
- [x] Create `.env`
- [x] Setup MongoDB Atlas
- [x] Connect MongoDB
- [x] Configure Express server
- [x] Create User Model
- [x] Create Authentication Controller
- [x] Create JWT Utility
- [x] Create Authentication Routes

---

# 🎯 Next Phase

In Phase 2, you can continue with:

- JWT Authentication Middleware
- Protected Routes
- Authorization
- User Profile API
- File Upload (Multer + Cloudinary)
- Frontend Authentication
- Complete Authentication Flow