import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Signup() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});

    const data = await res.json();

    if (res.ok) {
      Swal.fire({
        title: 'Signup Successful!',
        text: 'You can now log in.',
        icon: 'success',
        confirmButtonColor: '#10B981', 
      }).then(() => navigate('/login'));
    } else {
      Swal.fire({
        title: 'Signup Failed',
        text: data.error || 'An error occurred.',
        icon: 'error',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Network Error',
      text: 'Something went wrong while connecting to server.',
      icon: 'error',
    });
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
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
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-semibold">
          Sign Up
        </button>
        <p className="text-sm text-center mt-3">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
