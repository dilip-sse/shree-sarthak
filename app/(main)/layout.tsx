'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser, isLoggedIn, logout } from '@/lib/auth';
import {
    LayoutDashboard,
    Users,
    Wallet,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronRight,
    Search,
    Copy,
    UserPlus
} from 'lucide-react';
import { COMPANY_NAME } from '@/constants';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [userData, setUserData] = useState<any>({ applicantName: 'User', userId: '...' }); // Default state provides partial layout immediately
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const sidebarItems = [
        { icon: Settings, label: 'My Account', href: '/my-account' },
        // { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
        { icon: Users, label: 'My Network', href: '/network' },
        { icon: UserPlus, label: 'Register New', href: '/register-member' },
    ];

    if (loading) {
        // Optional: Show a loading skeleton for the layout, or just the spinner
    }

    return (
        <div className="min-h-screen bg-[#F2EBE3] flex font-sans text-amber-950">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#1E1108] border-r border-[#342012] text-amber-50
                transform transition-transform duration-300 ease-in-out lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                shadow-2xl lg:shadow-none
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-6 border-b border-[#342012] flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-amber-600/20 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="relative rounded-lg"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-amber-50 group-hover:text-amber-100 transition-colors">{COMPANY_NAME}</span>
                        </Link>
                        <button
                            className="ml-auto lg:hidden text-amber-400 hover:text-amber-200"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                        <div className="px-4 py-2 text-xs font-bold text-amber-500/50 uppercase tracking-widest">
                            Main Menu
                        </div>
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-lg shadow-black/20 border border-amber-600/50'
                                            : 'text-amber-200/60 hover:bg-white/5 hover:text-amber-100'
                                        }
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-amber-100' : 'text-amber-500/70 group-hover:text-amber-300'}`} />
                                    {item.label}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-amber-300/50" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-[#342012] bg-black/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold border border-amber-700/50 shadow-inner">
                                {userData.applicantName?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate text-amber-100">{userData.applicantName}</p>
                                <p className="text-xs text-amber-500/60 truncate">{userData.userId}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                router.push('/login');
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#342012] text-amber-400 text-sm font-medium hover:bg-white/5 hover:text-amber-200 transition-colors bg-white/5 shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-[#F2EBE3]/90 backdrop-blur-md border-b border-amber-900/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-amber-800 hover:bg-amber-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-amber-950 hidden md:block">
                                Dashboard
                            </h1>
                            <p className="text-xs text-amber-700/60 hidden md:block">Welcome to your control center</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 group-focus-within:text-amber-700 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-amber-200/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300 w-64 transition-all placeholder:text-amber-300/70 shadow-sm"
                            />
                        </div>
                        <button className="relative p-2.5 text-amber-700 hover:bg-amber-100/50 rounded-xl transition-colors border border-transparent hover:border-amber-100">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
                            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : null}
                    {children}
                </div>
            </main>
        </div>
    );
}
