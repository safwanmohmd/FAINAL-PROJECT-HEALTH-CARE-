
# Personal Task Manager (MERN Stack)

This is a full-stack **Personal Task Manager** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It allows users to register, log in securely, and manage their daily tasks with full **CRUD operations**.

---

## 🚀 Features
- User Registration & Login (JWT Authentication)
- Create, Read, Update, and Delete (CRUD) tasks
- Each user can only see their own tasks
- Protected routes (only authenticated users can access tasks)
- Clean project structure with backend & frontend separation

---

## 📂 Project Structure
```
mern-task-manager/
│
├── client/              # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── server/              # Node.js/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └──  server.js
│   
│
├── .env                 # Environment variables
├── package.json         # Project metadata and scripts
└── README.md            # Documentation

```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js & npm installed
- MongoDB (local or MongoDB Atlas)
- Git & VS Code

### 2. Clone Repository
```bash
git clone https://github.com/your-username/mern-task-manager.git
cd mern-task-manager
```

### 3. Install Dependencies
Backend:
```bash
cd server
npm install
```
Frontend:
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables
Create a `.env` file inside the `server` folder:
```
mongoUri=your_mongo_connection_string
secret=your_jwt_secret
PORT=3000
```

### 5. Run Application
Backend:
```bash
cd server
npm run dev
```
Frontend:
```bash
cd client
npm start
```

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login & get JWT token

### Tasks (Protected with JWT)
- `GET /api/tasks` → Get all tasks for logged-in user
- `POST /api/tasks` → Create a new task
- `PUT /api/tasks/:id` → Update a task
- `DELETE /api/tasks/:id` → Delete a task

---

## 🖼️ Frontend Pages
- Register / Login Page
- Dashboard (Task list)
- Add / Edit Task Form

---

## 🚀 Deployment
You can deploy on platforms like:
- **Heroku**
- **Render**
- **Vercel**
- **AWS**

Make sure to set environment variables (`mongoUri`, `secret` ,`PORT`) in the deployment platform.

---



## 📚 Conclusion
This project is a practical implementation of the **MERN stack**, giving hands-on experience in:
- Backend API development with Express.js
- Frontend SPA with React.js
- Secure authentication using JWT
- MongoDB database management

It demonstrates the process of building and deploying a scalable web application using **industry-standard tools**.

---
