# 🍔 Foodly

Foodly is a modern Full Stack Food Ordering Web Application built using the MERN Stack. It provides secure user authentication, Google Sign-In, password recovery, and a responsive user interface for an enhanced food ordering experience.

> 🚧 This project is currently under active development.

---

## 📸 Preview

<!-- Add screenshots here -->

<p align="center">
  <img src="Zomato2.0/Frontend/src/assets/all_imgs/logo.png" width="800" alt="Foodly Home">
</p>

---

# ✨ Features

### Authentication

- User Registration
- User Login
- Secure Password Hashing using bcrypt
- JWT Authentication
- Forgot Password
- Password Reset via Email
- Google Authentication (Firebase)
- Secure Authentication Cookies
- Logout

### Security

- JWT Authentication
- Password Encryption
- Protected Routes
- Environment Variables
- Secure Token Generation

### User Experience

- Responsive UI
- Loading Indicators
- Animated Logo
- Clean Authentication Flow
- Error Handling
- Toast Notifications

---

# 🚀 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Firebase Authentication
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

---

# 📁 Project Structure

```
Foodly
│
├── Backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   └── auth.controller.js
│   │
│   ├── middleware
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   ├── routes
│   │   └── auth.routes.js
│   │
│   ├── utils
│   │   ├── mail.js
│   │   └── token.js
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend
│   ├── public
│   ├── src
│   │
│   ├── assets
│   │
│   ├── components
│   │   ├── FoodlyLogoAnimated.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── HomePage.jsx
│   │
│   ├── firebase.js
│   ├── App.jsx
│   └── index.css
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Foodly.git

cd Foodly
```

---

## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

EMAIL=your_email

EMAIL_PASSWORD=your_email_password

CLIENT_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install
```

Create `.env`

```env
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
```

Run Frontend

```bash
npm run dev
```

---

# 🔐 Authentication Flow

### Email Authentication

```
Signup

↓

Email Verification (Optional)

↓

Login

↓

JWT Generated

↓

Authenticated User
```

### Forgot Password

```
Forgot Password

↓

Email Sent

↓

Reset Password Link

↓

Create New Password
```

### Google Authentication

```
Google Sign In

↓

Firebase Authentication

↓

Backend Verification

↓

JWT Authentication

↓

Logged In
```

---

# 📌 Completed Features

- [x] User Authentication
- [x] JWT Authentication
- [x] Password Hashing
- [x] Forgot Password
- [x] Password Reset
- [x] Google Authentication
- [x] Firebase Integration
- [x] Secure Cookies
- [x] Responsive Authentication UI

---

# 🚧 Upcoming Features

- [ ] User Profile
- [ ] Restaurant Listing
- [ ] Restaurant Details
- [ ] Search Functionality
- [ ] Food Categories
- [ ] Cart Management
- [ ] Checkout
- [ ] Payment Gateway
- [ ] Order History
- [ ] Favorites
- [ ] User Dashboard
- [ ] Admin Dashboard
- [ ] Restaurant Dashboard
- [ ] Image Uploads
- [ ] Reviews & Ratings
- [ ] Notifications

---

# 🛠 Environment Variables

## Backend

```
PORT
MONGODB_URI
JWT_SECRET
EMAIL
EMAIL_PASSWORD
CLIENT_URL
```

## Frontend

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Mohit Yadav**

- GitHub: https://github.com/Mohityadav-bit
- LinkedIn: *(Add your LinkedIn URL)*

---

## ⭐ Support

If you found this project useful, consider giving it a **Star** on GitHub.