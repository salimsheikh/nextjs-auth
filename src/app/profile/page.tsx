// components/ProfilePage.tsx
'use client'
import { useState } from 'react';


export default function ProfilePage() {
  // Initial user data (can be fetched from an API or from context)
  const [user, setUser] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    password: '',
  });

  // Form fields
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setNewUsername(value);
    } else if (name === 'email') {
      setNewEmail(value);
    } else if (name === 'password') {
      setNewPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setMessage('Your profile has been updated successfully!');

    // Here, you would typically send the updated profile to your backend API
    setUser({
      username: newUsername,
      email: newEmail,
      password: newPassword,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Profile</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Update your account details below</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={newUsername}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your username"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="New password (optional)"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          >
            Update Profile
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}
