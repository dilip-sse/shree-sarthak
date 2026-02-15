import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { Table, Server, Database, Users as UserIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DebugUsersPage() {
    await dbConnect();
    const users = await User.find({}).sort({ registeredAt: -1 });

    return (
        <div className="p-4 md:p-8 font-sans bg-slate-50 min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <UserIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Users</h1>
                            <p className="text-slate-500 text-sm mt-1">Live database records from MongoDB Atlas</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <span>Total Users:</span>
                            <span className="bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">{users.length}</span>
                        </div>
                        <a
                            href="/api/seed"
                            target="_blank"
                            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2 text-sm"
                        >
                            <Database className="w-4 h-4" />
                            Seed Data
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1400px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Identity</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sponsor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Security</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-slate-400 italic">
                                            <div className="flex flex-col items-center gap-2">
                                                <Table className="w-8 h-8 opacity-20" />
                                                <span>No users found in database. Seed data to get started.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user: any) => (
                                        <tr key={user._id.toString()} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded text-xs inline-block border border-indigo-100">
                                                    {user.userId}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{user.applicantName}</div>
                                                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}></span>
                                                    {user.gender || 'N/A'} • {user.dateOfBirth || 'No DOB'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-600 font-medium">{user.sponsorId || 'N/A'}</div>
                                                <div className="text-xs text-slate-400">{user.enterpriseName || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-700">{user.mobileNumber}</div>
                                                <div className="text-xs text-slate-400 truncate max-w-[150px]" title={user.email}>{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-700">{user.city || 'N/A'}, {user.state}</div>
                                                <div className="text-xs text-slate-400">{user.pinCode}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <code className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 w-fit">{user.password || 'N/A'}</code>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                        user.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                            'bg-slate-100 text-slate-600 border border-slate-200'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-600">{new Date(user.registeredAt || user.createdAt).toLocaleDateString()}</div>
                                                <div className="text-xs text-slate-400">{new Date(user.registeredAt || user.createdAt).toLocaleTimeString()}</div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-slate-400 px-2">
                    <div className="flex items-center gap-2">
                        <Server className="w-3 h-3" />
                        <span>MongoDB Atlas Cluster (Connected)</span>
                    </div>
                    <div>
                        System ID: {process.env.NODE_ENV === 'production' ? 'PROD-AWS-MUM' : 'DEV-LOCAL'}
                    </div>
                </div>
            </div>
        </div>
    );
}
