import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useAuthStore } from "../stores/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const token = res.data.token;
      login(token);
      console.log("✅ Logged in");
    } catch (err) {
      console.error("❌ Login failed", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">Welcome</div>
          <div className="flex justify-center mb-2">
            <div className="bg-black text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl"></div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">          Don’t have an account?{" "}
          <Link to="/SignUp" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
