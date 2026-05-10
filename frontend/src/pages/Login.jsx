import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      login(data);

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue writing and exploring ideas."
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-12 bg-[#202020] border border-[#2B2B2B] rounded-xl px-4 outline-none focus:border-[#3A3A3A] text-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-12 bg-[#202020] border border-[#2B2B2B] rounded-xl px-4 outline-none focus:border-[#3A3A3A] text-sm"
        />

        <button
          disabled={loading}
          className="w-full h-12 bg-white text-black rounded-xl font-medium hover:opacity-90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="text-sm text-[#9B9B9B] mt-6">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-white"
        >
          Register
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Login;