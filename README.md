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