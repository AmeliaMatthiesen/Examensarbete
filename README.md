# 📌 Thesis Project: Fullstack Application

## 🚀 Description

This project is a fullstack application built with **React (Vite) + TypeScript** on the frontend and **Node.js (Express) + MongoDB** on the backend. The goal of this project is to create a modern, responsive, and dynamic web application with a secure backend and data storage in a NoSQL database.

---

## 🏗️ Tech Stack

**Frontend:**

- React + TypeScript + Vite
- React Router
- Zustand (state management)
- TailwindCSS (styling)

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- dotenv (for environment variables)
- cors (to allow API requests from the frontend)
- Nodemon (for development server)

---

## 📁 Project Structure

```
ThesisProject/
│── client/            # Frontend React app
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│── server/            # Backend with Express & MongoDB
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── index.js       # Server entry point
│   ├── .env           # Environment variables (DO NOT COMMIT)
│   ├── package.json   # Backend dependencies
│── .gitignore         # Ignored files
│── README.md          # Documentation
```

---

## 🛠️ Installation & Running

### 🔹 Clone the project

```bash
git clone https://github.com/your-repo/thesis-project.git
cd thesis-project
```

### 🔹 Install dependencies

#### 📦 Frontend

```bash
cd client
npm install
```

#### 📦 Backend

```bash
cd ../server
npm install
```

### 🔹 Create a `.env` file in `server/`

Create a new `.env` file inside the `server/` directory and add the following:

```
MONGO_URI=your-mongodb-connection-string-here
PORT=5000
```

> ⚠️ **Important:** Never commit your `.env` file. Make sure it is included in `.gitignore` to keep your credentials safe.

### 🔹 Start the project

#### 🚀 Backend:

```bash
npm run dev
```

#### 🚀 Frontend:

```bash
cd ../client
npm run dev
```

---

## 📡 API Endpoints

| Method   | Endpoint     | Description                |
| -------- | ------------ | -------------------------- |
| **GET**  | `/api/test`  | Tests if the API is working |
| **POST** | `/api/users` | Creates a new user         |

Example `POST` request body:

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

### ✨ Final Notes

This project is a basic fullstack application where both **frontend and backend are set up and running**. From here, more features and security implementations can be added.

💡 **Have any questions?** Create an issue or reach out! 🚀

