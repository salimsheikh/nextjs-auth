// components/VerifyEmailForm.tsx
'use client'
import { useState } from 'react';

export default function VerifyEmailForm() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '') {
      setMessage('Please enter a valid email.');
      return;
    }
    // Simulate sending the verification code to the user's email
    setMessage(`A verification code has been sent to ${email}.`);

    // Simulate the process of email verification
    setIsVerified(false);  // Reset verification state
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification logic with a hardcoded verification code.
    const correctVerificationCode = '123456';
    if (verificationCode === correctVerificationCode) {
      setIsVerified(true);
      setMessage('Email successfully verified!');
    } else {
      setMessage('Invalid verification code.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Verify Email</h2>
        <p className="text-center text-gray-500 text-sm mt-2">Enter your email to receive a verification code</p>

        {/* Email Form */}
        {!isVerified ? (
          <form onSubmit={handleEmailVerification} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            >
              Verify Email
            </button>
          </form>
        ) : (
          // Verification Code Form
          <form onSubmit={handleVerifyCode} className="mt-6 space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-600">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={handleCodeChange}
                required
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter verification code"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            >
              Verify Code
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}
