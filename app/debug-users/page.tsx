import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function DebugUsersPage() {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });

    return (
        <div className="p-8 font-sans max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Database Debug</h1>
                    <p className="text-slate-500 mt-1">Live data from MongoDB Atlas Cluster</p>
                </div>
                <div className="flex gap-4">
                    <a
                        href="/api/seed"
                        target="_blank"
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                    >
                        Seed Dummy Data
                    </a>
                    <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700">
                        Total Users: {users.length}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Applicant Name</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Mobile</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                                        No users found in database. Please click "Seed Dummy Data" to populate.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user: any) => (
                                    <tr key={user._id.toString()} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-bold group-hover:scale-[1.02] transition-transform origin-left">
                                            {user.userId}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">
                                            {user.applicantName}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {user.email || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {user.mobileNumber}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                    user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-600'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {new Date(user.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-slate-300 font-mono text-sm shadow-2xl">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    Database Connection Status: Connected
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-slate-500">// Connection String</span>
                        <div className="text-indigo-400 truncate">mongodb+srv://dilipsse_db_user:***@cluster0...</div>
                    </div>
                    <div>
                        <span className="text-slate-500">// Environment</span>
                        <div className="text-amber-400">Production Mode (Simulated)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
