'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // TODO: Call API /auth/login
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Welcome Back
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-zinc-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-zinc-800 text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-600 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors dark:text-white"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.64 0 3.1.56 4.26 1.67l3.18-3.18C17.51 1.7 14.97 1 12 1 7.42 1 3.53 3.6 1.63 7.38l3.75 2.91C6.27 7.03 8.92 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.8-.07-1.56-.19-2.3H12v4.35h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.72 2.88c2.18-2.01 3.44-4.96 3.44-8.51z"
            />
            <path
              fill="#FBBC05"
              d="M5.38 14.71c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.63 7.38C.59 9.47 0 11.67 0 14s.59 4.53 1.63 6.62l3.75-2.91z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.95-1.07 7.94-2.91l-3.72-2.88c-1.09.73-2.48 1.16-4.22 1.16-3.08 0-5.73-1.99-6.62-4.67l-3.75 2.91C3.53 20.4 7.42 23 12 23z"
            />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}
