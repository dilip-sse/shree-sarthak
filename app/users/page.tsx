import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function DebugUsersPage() {
    await dbConnect();
    const users = await User.find({}).sort({ registeredAt: -1 });

    return (
        <div className="p-4 md:p-8 font-sans bg-slate-50 min-h-screen">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Debug: All Registered Users</h1>
                        <p className="text-slate-500 mt-1">Found {users.length} user(s) in MongoDB Atlas</p>
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
                            Total: {users.length}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1400px]">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">User ID</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Sponsor ID</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Mobile</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">DOB</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Gender</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">City/State</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">PIN</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Registered At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="px-6 py-12 text-center text-slate-400 italic font-medium">
                                            No users found in database. Please click "Seed Dummy Data" to populate.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user: any) => (
                                        <tr key={user._id.toString()} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-4 py-4">
                                                <div className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md inline-block">
                                                    {user.userId}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="font-bold text-slate-900">{user.applicantName}</div>
                                                <div className="text-xs text-slate-400">{user.enterpriseName || 'No Enterprise'}</div>
                                            </td>
                                            <td className="px-4 py-4 font-medium text-amber-700">
                                                {user.sponsorId || 'N/A'}
                                            </td>
                                            <td className="px-4 py-4 text-slate-600 font-medium">
                                                {user.mobileNumber}
                                            </td>
                                            <td className="px-4 py-4 text-slate-600">
                                                {user.dateOfBirth || 'N/A'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`text-xs px-2 py-0.5 rounded ${user.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                                                    {user.gender || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500 truncate max-w-[150px]" title={user.email}>
                                                {user.email || 'N/A'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-slate-800 font-medium">{user.city || 'N/A'}</div>
                                                <div className="text-xs text-slate-400">{user.state || 'N/A'}</div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-500">
                                                {user.pinCode || 'N/A'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                                    user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-slate-800">{new Date(user.registeredAt || user.createdAt).toLocaleDateString()}</div>
                                                <div className="text-[10px] text-slate-400 font-mono italic">{new Date(user.registeredAt || user.createdAt).toLocaleTimeString()}</div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-slate-300 font-mono text-sm shadow-2xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                        <span className="font-bold tracking-tight">SYSTEM STATUS: CONNECTED TO MONGODB ATLAS</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
                        <div className="space-y-1">
                            <span className="text-slate-500 text-xs">// Connection Endpoint</span>
                            <div className="text-indigo-400 truncate text-[12px]">mongodb+srv://dilipsse_db_user:***@cluster0...</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-slate-500 text-xs">// Instance Type</span>
                            <div className="text-amber-400 text-[12px]">Production Shared Cluster (AWS / Region: Mumbai)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
