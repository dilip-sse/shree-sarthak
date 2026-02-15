'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { COMPANY_NAME, TAGLINE } from '@/constants';
import { Loader2, ArrowLeft, LogIn } from 'lucide-react';

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('current_user', JSON.stringify(result.user));
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
        <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-md animate-in slide-in-from-bottom-4 fade-in duration-700">
                {/* Header Section */}
                <div className="text-center mb-8 relative">
                    <button
                        onClick={() => router.push('/')}
                        className="absolute left-0 top-1 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back
                    </button>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
                            <Image
                                src="/images/logo.png"
                                alt="Company Logo"
                                width={80}
                                height={80}
                                className="relative drop-shadow-md"
                            />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">{COMPANY_NAME}</h1>
                    <p className="text-slate-500 text-sm">{TAGLINE}</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/50 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <LogIn className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-900">Sign in to your account</h2>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-medium flex items-center gap-2 animate-in fadeIn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value.toUpperCase().trim())}
                                    placeholder="SSE-12345678"
                                    required
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700 leading-none">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2 w-full mt-2 shadow-md hover:shadow-lg"
                            >
                                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account? <button onClick={() => router.push('/')} className="text-indigo-600 hover:underline font-medium hover:text-indigo-700">Get invited</button>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <p className="text-xs text-slate-400">
                        Protected by enterprise-grade security.
                    </p>
                </div>
            </div>
        </div>
    );
}
