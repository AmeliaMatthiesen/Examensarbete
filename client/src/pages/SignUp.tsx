import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom"; // ✅

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("/api/auth/register", { name, email, password });
      setSuccess(true); // ✅
      setTimeout(() => {
        navigate("/login"); // ⏳ efter 2 sekunder
      }, 2000);
    } catch (err) {
      setError("Failed to create account.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Account created! Redirecting...</p>} {/* ✅ */}

          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
