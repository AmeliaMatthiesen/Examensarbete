import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import axios from "./api/axios";
import { Toaster } from "sonner";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import TaskListPage from "./pages/TaskListPage";

function App() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);

    const verifyToken = async () => {
      try {
        await axios.get("/api/auth/verify");
        console.log("✅ Token verified");
      } catch {
        console.warn("❌ Invalid token, logging out");
        logout();
      }
    };

    if (token) verifyToken();
  }, [token, logout]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
