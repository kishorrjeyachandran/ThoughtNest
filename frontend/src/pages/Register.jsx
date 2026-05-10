import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
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
      title="Create account"
      subtitle="Start writing and sharing your ideas."
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full h-12 bg-[#202020] border border-[#2B2B2B] rounded-xl px-4 outline-none focus:border-[#3A3A3A] text-sm"
        />

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
          {loading ? "Creating..." : "Create Account"}
        </button>

      </form>

      <p className="text-sm text-[#9B9B9B] mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-white"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}

export default Register;