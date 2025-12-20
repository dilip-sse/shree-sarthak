'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login } from '@/lib/auth';
import { COMPANY_NAME, TAGLINE } from '@/constants';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                // Store user session in localStorage for front-end access
                localStorage.setItem('current_user', JSON.stringify(result.user));
                // Redirect to dashboard
                router.push('/dashboard');
            } else {
                setError(result.error || 'Login failed');
                setLoading(false);
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('An error occurred during login. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/images/logo.png"
                            alt="Company Logo"
                            width={120}
                            height={120}
                            className="drop-shadow-lg"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-amber-950 mb-2">{COMPANY_NAME}</h1>
                    <p className="text-amber-800">{TAGLINE}</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-amber-950 mb-6 text-center">Login to Your Account</h2>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                            <p className="text-sm font-semibold">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label className="block text-amber-950 font-semibold mb-2">
                                Username (User ID)<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toUpperCase().trim())}
                                placeholder="Enter your User ID (e.g., SSE-12091976)"
                                required
                                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            />
                            <p className="text-xs text-amber-600 mt-2">Use the User ID you received during registration</p>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-amber-950 font-semibold mb-2">
                                Password<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl ${loading
                                ? 'bg-amber-400 cursor-not-allowed'
                                : 'bg-amber-900 hover:bg-amber-800'
                                } text-white`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-amber-200"></div>
                        <span className="text-amber-600 text-sm">OR</span>
                        <div className="flex-1 h-px bg-amber-200"></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-amber-800 mb-3">Don't have an account?</p>
                        <button
                            onClick={() => router.push('/')}
                            className="text-amber-900 font-semibold hover:text-amber-700 transition-colors underline"
                        >
                            Contact your sponsor for registration link
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-amber-700 mt-6">
                    © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
                </p>
            </div>
        </div>
    );
}
