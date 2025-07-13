import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back 👋</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Don’t have an account? <span className="text-blue-600 cursor-pointer hover:underline">Contact Admin</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
