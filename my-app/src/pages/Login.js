import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 


function Login() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: data.message || 'Invalid credentials.',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button type="submit" className="w-full bg-sky-600 hover:bg-sky-800 py-3 rounded font-semibold">
          Log In
        </button>
        <p className="text-sm text-center mt-3">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
