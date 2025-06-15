import React, { useState } from 'react';
import { users } from '../store/users';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const matchedUser = users.find(
      user =>
        user.email === email &&
        user.password === password &&
        user.role === role
    );

    if (matchedUser) {
      if (role === "Developer") {
        navigate('/developer-dashboard');
      } else if (role === "Manager") {
        navigate('/manager-dashboard');
      }
    } else {
      alert('Invalid credentials or role. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              required
              className="w-full border rounded-lg px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
