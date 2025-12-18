'use client';

import { useState, useEffect } from 'react';
import { getUsersFromLocalStorage } from '@/lib/registration';

export default function DebugUsersPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const registeredUsers = getUsersFromLocalStorage();
        setUsers(registeredUsers);
    }, []);

    return (
        <div className="min-h-screen bg-amber-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-amber-950 mb-6">Debug: All Registered Users</h1>

                {users.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-amber-900 mb-4">No users registered yet!</p>
                        <p className="text-sm text-amber-600">Please register first at /registration/SSE-12091976</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-amber-950 mb-4">
                            Found {users.length} user(s):
                        </h2>
                        <div className="space-y-4">
                            {users.map((user, index) => (
                                <div key={index} className="border-2 border-amber-200 rounded-lg p-4 bg-amber-50">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-semibold text-amber-900">User ID:</span>
                                            <p className="text-2xl font-bold text-amber-950">{user.userId}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-amber-900">Name:</span>
                                            <p className="text-amber-950">{user.applicantName}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-amber-900">Mobile:</span>
                                            <p className="text-amber-950">{user.mobileNumber}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-amber-900">Date of Birth:</span>
                                            <p className="text-amber-950">{user.dateOfBirth}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-amber-900">Sponsor ID:</span>
                                            <p className="text-amber-950">{user.sponsorId}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-amber-900">Registered:</span>
                                            <p className="text-amber-950 text-sm">{new Date(user.registeredAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
                                        <p className="text-sm font-semibold text-green-800">
                                            ✓ Use this User ID to login: <span className="text-lg">{user.userId}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex gap-4">
                    <a
                        href="/registration/SSE-12091976"
                        className="bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                    >
                        Register New User
                    </a>
                    <a
                        href="/login"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        Go to Login
                    </a>
                </div>

                <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="font-bold text-blue-900 mb-2">ℹ️ Important:</h3>
                    <ul className="text-sm text-blue-800 space-y-2">
                        <li>• <strong>Your User ID</strong> = Generated from YOUR date of birth (e.g., SSE-12031997)</li>
                        <li>• <strong>Sponsor ID</strong> = The ID of person who invited you (e.g., SSE-12091976)</li>
                        <li>• Use YOUR User ID (not sponsor ID) to login!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
