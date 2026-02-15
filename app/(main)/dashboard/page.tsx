'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isLoggedIn } from '@/lib/auth';
import {
    LayoutDashboard,
    Users,
    Wallet,
    Copy,
    TrendingUp
} from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeDashboard = async () => {
            if (!isLoggedIn()) {
                router.push('/login');
                return;
            }

            const currentUser = getCurrentUser();
            if (currentUser) {
                try {
                    const response = await fetch(`/api/users/${currentUser.userId}`);
                    const data = await response.json();
                    if (data.success) {
                        setUserData(data.user);
                    }
                } catch (error) {
                    console.error('Failed to fetch dashboard user data:', error);
                }
            }
            setLoading(false);
        };

        initializeDashboard();
    }, [router]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    // If loading, let the layout handle the spinner overlay or show a local one.
    if (loading) return null;
    if (!userData) return null;

    return (
        <div className="p-4 lg:p-8 space-y-8 overflow-y-auto h-full">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-orange-800 to-amber-950 p-8 md:p-10 text-white shadow-xl shadow-orange-900/10">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, {userData.applicantName?.split(' ')[0]}! 👋</h2>
                    <p className="text-amber-100/80 mb-8 max-w-xl text-lg leading-relaxed">
                        Here is what's happening with your network today. You have new earnings to claim.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/20 shadow-sm flex items-center gap-2 group">
                            <TrendingUp className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            View Reports
                        </button>
                        <button
                            onClick={() => copyToClipboard(`${window.location.origin}/registration/${userData.userId}`)}
                            className="bg-white text-amber-900 px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/10 hover:shadow-xl hover:bg-amber-50 transition-all flex items-center gap-2 transform active:scale-95"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Referral Link
                        </button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl mix-blend-overlay"></div>
                <div className="absolute bottom-0 right-20 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl mix-blend-overlay"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Earnings"
                    value="₹ 0.00"
                    trend="+0% this month"
                    icon={Wallet}
                    color="bg-emerald-500"
                    trendColor="text-emerald-600"
                />
                <StatCard
                    title="Active Members"
                    value="0"
                    trend="+0 new joiners"
                    icon={Users}
                    color="bg-blue-500"
                    trendColor="text-blue-600"
                />
                <StatCard
                    title="Left Volume"
                    value="0.00"
                    trend="Business Volume"
                    icon={LayoutDashboard}
                    color="bg-amber-500"
                    trendColor="text-amber-600"
                />
                <StatCard
                    title="Right Volume"
                    value="0.00"
                    trend="Business Volume"
                    icon={LayoutDashboard}
                    color="bg-purple-500"
                    trendColor="text-purple-600"
                />
            </div>

            {/* Recent Activity / Content Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart/Table Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#E6DCCF] shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-amber-950">Network Growth</h3>
                            <select className="text-xs bg-amber-50 border border-amber-100 rounded-lg px-2 py-1 text-amber-800 outline-none">
                                <option>This Week</option>
                                <option>This Month</option>
                            </select>
                        </div>
                        <div className="h-72 flex items-center justify-center bg-[#FDF8F3] rounded-xl border border-amber-100 border-dashed animate-in fade-in duration-700">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <p className="text-amber-900/40 font-medium text-sm">Growth metrics will appear here</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel Details */}
                <div className="space-y-6">
                    <div className="bg-[#FFFBF7] p-6 rounded-2xl border border-[#E6DCCF] shadow-sm">
                        <h3 className="text-lg font-bold text-amber-950 mb-4">Profile Details</h3>
                        <div className="space-y-3">
                            <DetailRow label="Status" value="Active" isStatus />
                            <DetailRow label="Joined" value={userData.registeredAt ? new Date(userData.registeredAt).toLocaleDateString() : 'N/A'} />
                            <DetailRow label="Sponsor ID" value={userData.sponsorId || 'N/A'} />
                            <DetailRow label="User ID" value={userData.userId || 'N/A'} isMono />
                        </div>

                        <div className="mt-6 pt-6 border-t border-amber-50">
                            <div className="bg-gradient-to-br from-amber-50 to-[#FDF8F3] p-4 rounded-xl border border-amber-100">
                                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Current Rank</p>
                                <p className="text-lg font-bold text-amber-950">Distributor</p>
                                <div className="w-full bg-amber-200/50 h-1.5 rounded-full mt-3 overflow-hidden">
                                    <div className="bg-amber-500 h-full w-[10%] rounded-full"></div>
                                </div>
                                <p className="text-[10px] text-amber-500 mt-2 text-right">10% to Silver</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon: Icon, color, trendColor }: any) {
    return (
        <div className="bg-gradient-to-br from-white to-[#FFFBF5] p-6 rounded-2xl border border-[#E6DCCF] shadow-[0_2px_8px_-2px_rgba(45,27,14,0.06)] hover:shadow-[0_8px_20px_-4px_rgba(45,27,14,0.08)] transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-amber-900/60">{title}</h3>
                    <p className="text-2xl font-bold text-[#2D1B0E] mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${color} text-white shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <p className={`text-xs font-semibold ${trendColor || 'text-amber-600'} flex items-center gap-1 bg-[#F5EFE6] w-fit px-2 py-1 rounded-lg`}>
                {trend}
            </p>
        </div>
    );
}

function DetailRow({ label, value, isStatus, isMono }: any) {
    return (
        <div className="flex items-center justify-between p-3.5 bg-[#FDF8F3] rounded-xl border border-amber-100/50 hover:border-amber-200 transition-colors">
            <span className="text-sm font-medium text-amber-800/70">{label}</span>
            {isStatus ? (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-emerald-200">
                    {value}
                </span>
            ) : (
                <span className={`text-sm font-semibold text-[#2D1B0E] ${isMono ? 'font-mono tracking-tight' : ''}`}>
                    {value}
                </span>
            )}
        </div>
    );
}
