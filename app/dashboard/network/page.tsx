'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/landing/Header';
import { getUsersFromLocalStorage } from '@/lib/registration';
import type { RegisteredUser } from '@/types/registration';

export default function NetworkPage() {
    const [users, setUsers] = useState<RegisteredUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                if (data.success) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error('Failed to fetch network users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-amber-50 flex flex-col">
            {/* Fixed Header */}
            <Header />

            {/* Main Content - Full height with flex */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0">
                <Sidebar />

                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
                            My Network
                        </h1>
                        <p className="text-amber-800 text-base md:text-lg">
                            View all registered users in your network
                        </p>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center text-amber-900">
                                Loading network data...
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-10 text-center">
                                <div className="text-6xl mb-4">👥</div>
                                <h3 className="text-xl font-bold text-amber-950 mb-2">No Users Yet</h3>
                                <p className="text-amber-800">
                                    No users have registered yet. Start inviting people to join your network!
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-amber-900 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">User ID</th>
                                            <th className="px-6 py-4 text-left font-semibold">Name</th>
                                            <th className="px-6 py-4 text-left font-semibold">Mobile</th>
                                            <th className="px-6 py-4 text-left font-semibold">Email</th>
                                            <th className="px-6 py-4 text-left font-semibold">State</th>
                                            <th className="px-6 py-4 text-left font-semibold">Sponsor ID</th>
                                            <th className="px-6 py-4 text-left font-semibold">Date Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-100">
                                        {users.map((user, index) => (
                                            <tr
                                                key={user.userId}
                                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-amber-50'
                                                    } hover:bg-amber-100 transition-colors`}
                                            >
                                                <td className="px-6 py-4 font-semibold text-amber-950">
                                                    {user.userId}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900">
                                                    {user.applicantName}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900">
                                                    {user.mobileNumber}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900">
                                                    {user.email || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900">
                                                    {user.state}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900">
                                                    {user.sponsorId}
                                                </td>
                                                <td className="px-6 py-4 text-amber-900 text-sm">
                                                    {new Date(user.registeredAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Summary Card */}
                    {users.length > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-amber-200 text-sm mb-2">Total Users</div>
                                    <div className="text-3xl font-bold">{users.length}</div>
                                </div>
                                <div>
                                    <div className="text-amber-200 text-sm mb-2">Latest Registration</div>
                                    <div className="text-lg font-semibold">
                                        {users[users.length - 1]?.applicantName || '-'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-amber-200 text-sm mb-2">Network Growth</div>
                                    <div className="text-2xl font-bold">📈 Active</div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
